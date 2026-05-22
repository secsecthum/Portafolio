# SOC Lab — Security Operations Center Academy

Entorno de laboratorio para prácticas de ciberseguridad ofensiva y defensiva, desplegado con Docker Compose.

## Arquitectura

| Servicio | Rol | Tecnología |
|---|---|---|
| `lab-dashboard` | Panel de control SOC | Nginx Alpine |
| `vulnerable-target` | Objetivo de prácticas | OWASP Juice Shop |
| `local-scanner` | Herramientas de escaneo | Alpine |

## Inicio Rápido

```bash
docker compose up -d
```

- **Dashboard**: http://localhost:80
- **Juice Shop**: http://localhost:3000

## Roadmap

- [x] Dashboard de monitoreo estilo SOC
- [x] Despliegue con Docker Compose
- [ ] Contenedor Suricata IDS
- [ ] Firewall UFW automatizado
- [ ] Scripts de hardening

---

**Tecnologías:** Docker, Nginx, OWASP Juice Shop, Bash
