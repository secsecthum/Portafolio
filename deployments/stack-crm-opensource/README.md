# Stack CRM OpenSource — Despliegue Docker Enterprise

Orquestación completa de un CRM empresarial (EspoCRM) con stack de monitoreo, proxy inverso con TLS automático y observabilidad full-stack.

## Arquitectura

```
                    ┌─────────────┐
                    │   Traefik   │ ← Let's Encrypt (TLS)
                    │  v2.11      │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ EspoCRM  │ │ Grafana  │ │Prometheus │
        │ (App)    │ │(Dashboards)││(Metrics)  │
        └────┬─────┘ └──────────┘ └────┬─────┘
             │                         │
             ▼                         ▼
        ┌──────────┐             ┌──────────┐
        │ MariaDB  │             │   Loki   │
        │ (Aislada)│             │  (Logs)  │
        └──────────┘             └──────────┘
```

## Servicios

| Servicio | Puerto Interno | Descripción |
|---|---|---|
| Traefik | 80/443 | Proxy inverso con TLS |
| MariaDB 11 | 3306 | Base de datos (red interna) |
| EspoCRM | 80 | Aplicación CRM |
| Prometheus | 9090 | Métricas |
| Loki | 3100 | Agregación de logs |
| Promtail | — | Shipping de logs Docker |
| Grafana | 3000 | Dashboards de monitoreo |

## Despliegue

```bash
cp .env.example .env
# Editar credenciales en .env
docker compose up -d
```

## Seguridad

- Base de datos aislada en red interna
- Healthchecks en todos los servicios
- TLS automático vía Let's Encrypt
- UFW firewall en VPS

## Despliegue en VPS

```bash
bash vps-deploy.sh
```

---

**Tecnologías:** Docker, Docker Compose, Traefik, MariaDB, EspoCRM, Prometheus, Loki, Grafana
