let auditChart = null;

// Inicializar Radar Chart
function initChart(data = [0, 0, 0]) {
    const ctx = document.getElementById('auditChart').getContext('2d');
    if (auditChart) auditChart.destroy();

    auditChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['IDENTITY', 'DATA', 'NETWORK'],
            datasets: [{
                data: data,
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                borderColor: '#7c3aed',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#7c3aed',
                pointHoverRadius: 5,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false },
                    pointLabels: { color: '#64748b', font: { size: 11, family: 'Fira Code', weight: 'bold' } }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// Función de Auditoría (Simula el backend de Flask)
async function runAudit() {
    const btn = document.getElementById('audit-btn');
    const scoreDisp = document.getElementById('score-display');
    const container = document.getElementById('recommendations-container');
    const scanLine = document.getElementById('scan-effect');

    // Efectos de carga
    btn.disabled = true;
    btn.innerText = 'CALCULATING_RISK...';
    scanLine.style.display = 'block';
    scoreDisp.classList.add('animate-pulse');
    
    // Simulamos una pequeña latencia para realismo (800ms)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Captura de Inputs
    const checks = {
        mfa: document.getElementById('mfa').checked,
        iam: document.getElementById('iam').checked,
        encryption: document.getElementById('encryption').checked,
        backups: document.getElementById('backups').checked,
        waf: document.getElementById('waf').checked,
        logs: document.getElementById('logs').checked
    };

    // Lógica de Puntuación
    let identity = (checks.mfa ? 60 : 0) + (checks.iam ? 40 : 0);
    let data = (checks.encryption ? 70 : 0) + (checks.backups ? 30 : 0);
    let network = (checks.waf ? 60 : 0) + (checks.logs ? 40 : 0);
    
    let total = Math.floor((identity + data + network) / 3);

    // Recomendaciones Dinámicas
    let recs = [];
    if (!checks.mfa) recs.push("CRITICAL: MFA disabled. Identity spoofing risk high.");
    if (!checks.encryption) recs.push("HIGH: Data at rest is not encrypted (AES-256 missing).");
    if (!checks.waf) recs.push("HIGH: Network exposed. No WAF protection detected.");
    if (!checks.iam) recs.push("MEDIUM: Use RBAC to enforce 'Least Privilege' principle.");
    if (!checks.backups) recs.push("MEDIUM: No immutable backup strategy declared.");
    if (!checks.logs) recs.push("LOW: Centralized logging recommended for incident response.");

    // Actualizar UI
    scoreDisp.innerText = total + '%';
    scoreDisp.classList.remove('animate-pulse');
    document.getElementById('audit-id').innerText = `ID: SEC-${Date.now().toString(16).toUpperCase()}`;

    // Actualizar Label de Estado
    const label = document.getElementById('status-label');
    if (total < 40) {
        label.innerText = 'CRITICAL_RISK';
        label.className = 'mt-4 text-[10px] px-4 py-1.5 bg-red-900/30 text-red-500 rounded-full border border-red-500/50 uppercase font-bold';
    } else if (total < 80) {
        label.innerText = 'WARNING_EXPOSURE';
        label.className = 'mt-4 text-[10px] px-4 py-1.5 bg-yellow-900/30 text-yellow-500 rounded-full border border-yellow-500/50 uppercase font-bold';
    } else {
        label.innerText = 'SECURE_POSTURE';
        label.className = 'mt-4 text-[10px] px-4 py-1.5 bg-green-900/30 text-green-500 rounded-full border border-green-500/50 uppercase font-bold';
    }

    // Actualizar Gráfico
    initChart([identity, data, network]);

    // Renderizar Reporte
    container.innerHTML = '';
    if (recs.length === 0) {
        container.innerHTML = '<p class="text-xs text-green-400 font-bold animate-pulse">> STATUS: OPTIMAL. ALL SECURITY PROTOCOLS WITHIN RANGE.</p>';
    } else {
        recs.forEach(msg => {
            const p = document.createElement('p');
            p.className = 'text-[11px] border-l-2 border-violet-600 pl-4 py-1 bg-violet-900/10 text-zinc-300';
            p.innerText = '> ' + msg;
            container.appendChild(p);
        });
    }

    // Resetear botón
    btn.disabled = false;
    btn.innerText = 'Execute_Security_Scan';
    scanLine.style.display = 'none';
}

// Carga Inicial
document.addEventListener('DOMContentLoaded', () => {
    initChart([0, 0, 0]);
});
