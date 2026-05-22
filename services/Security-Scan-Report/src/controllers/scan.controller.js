const dnsService = require('../services/dns.service');
const axios = require('axios');

// Lista de directorios/archivos sensibles a buscar
const CRITICAL_PATHS = [
    '/robots.txt', '/sitemap.xml', '/.env', '/.git/config', 
    '/wp-admin', '/admin', '/backup', '/config.php', '/.well-known/security.txt'
];

exports.scanWebsite = async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL requerida" });

    // Normalizar URL
    let targetUrl = url.trim().toLowerCase();
    targetUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
    
    try {
        const urlObj = new URL(targetUrl);
        const domain = urlObj.hostname;
        const startTime = Date.now();

        // Ejecución en paralelo para máxima velocidad
        // Nota: Si dnsService falla, asegúrate de tener un .catch o que el servicio maneje el error
        const [dns, subdomains, directoryCheck, response] = await Promise.all([
            dnsService.checkDNS(domain).catch(() => ({ status: 'Unknown', details: 'N/A' })),
            fetchSubdomains(domain),
            checkCriticalPaths(targetUrl),
            axios.get(targetUrl, { 
                timeout: 5000, 
                validateStatus: false,
                headers: { 'User-Agent': 'ShieldScan-Bot/1.0' } 
            }).catch(() => null)
        ]);

        const latency = Date.now() - startTime;
        const headers = response?.headers || {};

        // Análisis de Cabeceras de Seguridad
        const securityHeaders = {
            csp: !!(headers['content-security-policy'] || headers['x-webkit-csp']),
            hsts: !!headers['strict-transport-security'],
            xframe: !!headers['x-frame-options'],
            server: headers['server'] || 'Undisclosed'
        };

        // Cálculo de Riesgo Dinámico
        let riskScore = 10; // Base de riesgo por auditoría
        
        if (!securityHeaders.csp) riskScore += 15;
        if (!securityHeaders.hsts) riskScore += 10;
        if (!securityHeaders.xframe) riskScore += 5;
        
        if (directoryCheck.found.length > 0) {
            riskScore += (directoryCheck.found.length * 15);
        }

        // Si se encuentra un .env o .git el riesgo es máximo
        const hasCriticalExposure = directoryCheck.found.some(p => p.includes('.env') || p.includes('.git'));
        if (hasCriticalExposure) riskScore = 99;

        // Respuesta final estructurada para el frontend
        res.json({
            url: targetUrl,
            domain: domain,
            riskScore: Math.min(riskScore, 100),
            results: {
                dns: dns,
                subdomains: {
                    count: subdomains.length,
                    list: subdomains // Ya viene filtrado por la función helper
                },
                directories: directoryCheck,
                security: securityHeaders
            },
            latency: `${latency}ms`,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ error: "Error analizando el dominio" });
    }
};

// --- FUNCIONES HELPER ---

async function fetchSubdomains(domain) {
    try {
        // Consultamos crt.sh (Certificados SSL) para encontrar subdominios reales
        const resp = await axios.get(`https://crt.sh/?q=${domain}&output=json`, { timeout: 8000 });
        
        if (!resp.data || !Array.isArray(resp.data)) return [];

        const subSet = new Set();
        resp.data.forEach(entry => {
            const name = entry.common_name.toLowerCase();
            // Limpiamos nombres con wildcard (*.) y eliminamos el dominio principal de la lista
            if (name.includes(domain) && !name.includes('*') && name !== domain) {
                subSet.add(name);
            }
            // A veces los nombres vienen en name_value separados por saltos de línea
            if (entry.name_value) {
                entry.name_value.split('\n').forEach(sub => {
                    const cleanSub = sub.trim().toLowerCase();
                    if (cleanSub.includes(domain) && !cleanSub.includes('*') && cleanSub !== domain) {
                        subSet.add(cleanSub);
                    }
                });
            }
        });

        // Convertimos a array y limitamos a los 15 más relevantes para el frontend
        return Array.from(subSet).slice(0, 15);
    } catch (e) {
        console.error("Subdomain lookup failed (crt.sh is likely down/busy)");
        return [];
    }
}

async function checkCriticalPaths(baseUrl) {
    const found = [];
    const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    // Escaneamos archivos críticos en paralelo
    const promises = CRITICAL_PATHS.map(async (path) => {
        try {
            const res = await axios.get(`${base}${path}`, { 
                timeout: 3000, 
                validateStatus: false,
                headers: { 'User-Agent': 'ShieldScan-Bot/1.0' }
            });
            // Consideramos encontrado si es 200 (OK) o 403 (Forbidden, pero existe)
            if (res.status === 200 || res.status === 403) {
                found.push(path);
            }
        } catch (e) { /* silent fail */ }
    });

    await Promise.all(promises);
    return {
        scanned: CRITICAL_PATHS.length,
        found: found
    };
}
