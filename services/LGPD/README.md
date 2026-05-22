# LexTech Elite — Legal Intelligence Platform

Agregador de legislación multiplaís con interfaz tipo bóveda de datos. Consulta en tiempo real leyes de protección de datos y normativas de Argentina, Brasil, EE.UU. y Portugal.

## Arquitectura

| Capa | Tecnología |
|---|---|
| Backend | Node.js, Express 5, Axios |
| Frontend | HTML5, CSS3, Google Fonts (Cinzel) |
| Seguridad | Helmet CSP, rate limiting |

## Endpoints

| Ruta | Descripción |
|---|---|
| `GET /api/laws/argentina` | Portal de datos abiertos de Argentina |
| `GET /api/laws/brazil` | Cámara de Diputados de Brasil |
| `GET /api/laws/usa` | Congress.gov API |
| `GET /api/laws/portugal` | *(en desarrollo)* |

## Características

- CSP restrictivo por país
- Rate limiting: 100 peticiones / 15 min
- Diseño gold/black modo bóveda
- Português como idioma principal (LGPD)

## Inicio Rápido

```bash
cp .env.example .env
npm install
npm start
```

Visitar: http://localhost:3000

---

**Jurisdicciones:** AR, BR, US, PT
