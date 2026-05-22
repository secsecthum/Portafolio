const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES DE SEGURIDAD ---
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Demasiadas peticiones. Control de seguridad activo." }
});
app.use('/api/', limiter);

// --- CONFIGURACIÓN DE ACTIVOS ---
const COINS = {
    bitcoin: 'bitcoin',
    ethereum: 'ethereum',
    solana: 'solana',
    optimism: 'optimism',
    'gps-ecosystem': 'gps-ecosystem',
    tether: 'tether'
};

// --- ALGORITMO DE PREDICCIÓN (PROBABILÍSTICO) ---
const calculatePrediction = (currentPrice, change24h) => {
    const volatility = Math.abs(change24h) / 100;
    const trend = change24h > 0 ? 1.015 : 0.985; 
    // Añadimos un factor de aleatoriedad basado en la volatilidad real
    const randomFactor = 1 + (Math.random() * volatility - (volatility / 2));
    return currentPrice * trend * randomFactor;
};

// --- RUTA: ANALYTICS + NOTIFICATIONS ---
app.get('/api/v1/analytics', async (req, res) => {
    try {
        // 1. Obtener Índice de Miedo y Codicia (Fear & Greed)
        const fgRes = await axios.get('https://api.alternative.me/fng/');
        const fgData = fgRes.data.data[0];

        // 2. Obtener Precios y Cambios para Predicciones
        const ids = Object.values(COINS).join(',');
        const priceRes = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: { ids: ids, vs_currencies: 'usd', include_24hr_change: 'true' }
        });

        const market = priceRes.data;
        const predictions = {};
        const notifications = [];

        // 3. Generar Predicciones y Alertas Inteligentes
        Object.entries(market).forEach(([coin, data]) => {
            const coinName = coin.toUpperCase();
            
            predictions[coin] = {
                current: data.usd,
                predicted_24h: calculatePrediction(data.usd, data.usd_24h_change),
                sentiment: data.usd_24h_change > 0 ? 'Bullish' : 'Bearish'
            };

            // Notificación DORADA (Evento Crítico: Cambio > 7%)
            if (Math.abs(data.usd_24h_change) > 7) {
                notifications.push({
                    id: `gold-${coin}`,
                    type: 'gold',
                    title: 'CRITICAL VOLATILITY',
                    msg: `${coinName} detectó un movimiento inusual del ${data.usd_24h_change.toFixed(2)}%. Posible ballena o noticia de impacto.`,
                    time: new Date().toLocaleTimeString()
                });
            }
        });

        // Notificación PLATA (Informativa: Sentimiento de Mercado)
        notifications.push({
            id: 'info-sentiment',
            type: 'silver',
            title: 'MARKET SENTIMENT',
            msg: `El índice global está en ${fgData.value} (${fgData.value_classification}). Estabilidad relativa detectada.`,
            time: new Date().toLocaleTimeString()
        });

        res.json({
            success: true,
            fear_greed: {
                value: fgData.value,
                classification: fgData.value_classification
            },
            predictions,
            notifications: notifications.reverse() // Mostrar las más recientes arriba
        });

    } catch (error) {
        console.error("Error en el motor de Analytics:", error.message);
        res.status(500).json({ success: false, message: "Analytics Engine Offline" });
    }
});

// --- RUTA: MERCADO SIMPLE ---
app.get('/api/v1/bolsa', async (req, res) => {
    try {
        const ids = Object.values(COINS).join(',');
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: { ids, vs_currencies: 'usd', include_24hr_change: 'true' }
        });
        res.json({ success: true, market: response.data });
    } catch (e) {
        res.status(500).json({ success: false });
    }
});

// FALLBACK AL FRONTEND
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`
    💎 GOLD TERMINAL BACKEND v2.0
    -------------------------------------------
    🛰️  Estado: Operativo
    📍  Puerto: ${PORT}
    🧠  Motor de Alertas: Activo
    -------------------------------------------
    `);
});