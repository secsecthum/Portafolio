# Gold Terminal — Crypto Market Intelligence

Dashboard institucional para análisis de mercado de criptomonedas con predicción de precios, índice de Miedo y Codicia (Fear & Greed), y sistema de notificaciones inteligentes.

## Arquitectura

| Capa | Tecnología |
|---|---|
| Backend | Node.js, Express 5 |
| Frontend | HTML5, Tailwind CSS, Chart.js |
| APIs externas | CoinGecko, Alternative.me (F&G) |

## Endpoints

| Ruta | Descripción |
|---|---|
| `GET /api/v1/analytics` | Fear & Greed Index + predicciones 24h |
| `GET /api/v1/bolsa` | Precios en tiempo real desde CoinGecko |

## Seguridad

- Helmet.js para cabeceras HTTP seguras
- Rate limiting: 100 peticiones / 15 min por IP
- CORS configurado

## Inicio Rápido

```bash
npm install
npm start
```

Visitar: http://localhost:3000

---

**Activos monitoreados:** Bitcoin, Ethereum, Solana, Optimism, GPS, Tether
