const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- CONFIGURACIÓN DE RUTAS ---
// Subimos un nivel para encontrar /public desde /src
const publicPath = path.join(__dirname, '..', 'public');

// --- SEGURIDAD DE NIVEL ELITE (CORREGIDA) ---
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"], // Permite bloques <script>
            scriptSrcAttr: ["'unsafe-inline'"],       // REQUERIDO: Permite atributos onclick
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"]                    // Permite fetch a /api
        },
    },
}));

app.use(cors());
app.use(express.json());

// 1. SERVIR ARCHIVOS ESTÁTICOS
app.use(express.static(publicPath));

// 2. LIMITADOR DE TRÁFICO
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Acceso denegado temporalmente por seguridad.' }
});
app.use('/api/', limiter);

const apiClient = axios.create({ timeout: 12000 });

// --- RUTA RAÍZ ---
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// --- ENDPOINTS DE LA API ---

// Argentina
app.get('/api/laws/argentina', async (req, res, next) => {
    try {
        const response = await apiClient.get('https://datos.gob.ar/api/3/action/package_show?id=justicia-leyes-argentinas');
        const leyes = response.data.result.resources.slice(0, 10).map(r => ({
            id: r.id.substring(0, 8),
            titulo: r.name || 'Normativa Argentina',
            descripcion: r.description || 'Documento legal sobre tecnología.',
            url: r.url
        }));
        res.json({ status: 'success', data: leyes });
    } catch (e) { next(e); }
});

// Brasil
app.get('/api/laws/brazil', async (req, res, next) => {
    try {
        const resp = await apiClient.get('https://dadosabertos.camara.leg.br/api/v2/proposicoes?keywords=tecnologia,software&ordenarPor=id');
        const leyes = resp.data.dados.map(l => ({
            id: l.id,
            titulo: l.ementa.substring(0, 100) + '...',
            descripcion: l.ementa,
            url: l.uri
        }));
        res.json({ status: 'success', data: leyes });
    } catch (e) { next(e); }
});

// USA
app.get('/api/laws/usa', async (req, res, next) => {
    if (!process.env.CONGRESS_API_KEY) {
        return res.json({ 
            status: 'success', 
            data: [{ id: 'USA-DEMO', titulo: 'Key Faltante', descripcion: 'Configura CONGRESS_API_KEY en el .env', url: '#' }] 
        });
    }
    try {
        const resp = await apiClient.get(`https://api.congress.gov/v3/bill?api_key=${process.env.CONGRESS_API_KEY}&format=json&limit=10`);
        const leyes = resp.data.bills.map(b => ({
            id: b.number,
            titulo: b.title,
            descripcion: `Estado: ${b.latestAction.text}`,
            url: b.url
        }));
        res.json({ status: 'success', data: leyes });
    } catch (e) { next(e); }
});

// Portugal
app.get('/api/laws/portugal', async (req, res, next) => {
    res.json({ 
        status: 'success', 
        data: [{ id: 'PT-1', titulo: 'Lei de Cibersegurança', descripcion: 'Regime jurídico da segurança del redes e informação.', url: 'https://dre.pt' }] 
    });
});

// --- MANEJO DE ERRORES ---
app.use((err, req, res, next) => {
    console.error(`[SYSTEM ERROR]: ${err.message}`);
    res.status(500).json({ status: 'error', message: 'Error de comunicación con la bóveda legal.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\x1b[33m%s\x1b[0m`, `⚜️  SISTEMA LEXTECH ELITE INICIADO`);
    console.log(`🌐 Acceso local: http://localhost:${PORT}`);
    console.log(`📂 Vinculado a: ${publicPath}`);
});