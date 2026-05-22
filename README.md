# Full-Stack Security & DevOps Portfolio

![License](https://img.shields.io/badge/license-MIT-green)
![Security](https://img.shields.io/badge/Cybersecurity-Blue%20%7C%20Red-red)
![DevOps](https://img.shields.io/badge/DevOps-Docker%20%7C%20Monitoring-blue)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)

Repositorio profesional que integra **arquitecturas de despliegue seguro**, **herramientas de ciberseguridad** y **dashboards de inteligencia** en tiempo real.

---

## Proyectos en Vivo

| Proyecto | Stack | Descripción |
|---|---|---|
| Zero-Trust Portfolio | HTML/Tailwind/Netlify | Portfolio cyberpunk con terminal en vivo |
| Compliance Checker | JS/Chart.js/Netlify | Auditor de cumplimiento GDPR/LGPD |

---

## Estructura del Ecosistema

```
├── deployments/              # Infraestructura y orquestación Docker
│   └── stack-crm-opensource/ # CRM Enterprise + Observabilidad (Traefik/Prometheus/Grafana)
├── labs/                     # Laboratorios de prácticas
│   └── soc-lab/              # SOC Academy con OWASP Juice Shop
├── landings/                 # Landing pages desplegadas en Netlify
│   ├── zero-trust/           # Portfolio profesional interactivo
│   └── compliance-checker/   # Herramienta de auditoría de cumplimiento
├── services/                 # APIs full-stack con Express.js
│   ├── Bitcoins/             # Gold Terminal — Crypto Market Intelligence
│   ├── LGPD/                 # LexTech Elite — Legal Intelligence Platform
│   └── Security-Scan-Report/ # ShieldScan — Domain Security Auditor
├── security/                 # Operaciones de ciberseguridad
│   ├── BlueTEAM/             # Scripts de hardening y defensa
│   ├── RedTEAM/              # Cheat sheets de pentesting
│   └── writeups/             # CTF write-ups (DockerLabs, VulnHub)
├── shared-scripts/           # Scripts Bash de automatización y monitoreo
└── .github/workflows/        # CI/CD con Snyk (SAST + SCA + IaC)
```

---

## 1. DevOps & Cloud Infrastructure

### Stack CRM Enterprise (`/deployments/stack-crm-opensource/`)
Despliegue completo de EspoCRM con observabilidad full-stack:
- **Proxy Inverso**: Traefik v2.11 con TLS automático (Let's Encrypt)
- **Base de Datos**: MariaDB 11 en red interna aislada
- **Monitoreo**: Prometheus + Loki + Promtail + Grafana
- **Despliegue**: Script automatizado para VPS con UFW

```bash
cd deployments/stack-crm-opensource
cp .env.example .env
docker compose up -d
```

---

## 2. Ciberseguridad

### Blue Team (`/security/BlueTEAM/`)
Scripts de auditoría y defensa para Linux:
- Detección de anomalías en el sistema
- Auditoría de privilegios y escalada
- Monitoreo de integridad de archivos
- Hardening de autenticación

### Red Team (`/security/RedTEAM/`)
Cheat sheets de herramientas ofensivas: Nmap, SQLMap, Nikto, Amass, FFUF, Katana, WhatWeb.

### CTF Write-ups (`/security/writeups/`)

| Máquina | Plataforma | Dificultad | Estado |
|---|---|---|---|
| Aidor | DockerLabs | Fácil | ✅ |
| Injection | DockerLabs | Media | ✅ |
| Psycho | VulnHub | Hard | ⏳ |

---

## 3. Servicios Full-Stack

### Gold Terminal — Crypto Dashboard
Análisis de mercado con Fear & Greed Index, predicciones 24h y 6 criptomonedas en tiempo real.
`/services/Bitcoins/`

### LexTech Elite — Legal Intelligence
Consultas legislativas multi-país (AR, BR, US, PT) con CSP por jurisdicción.
`/services/LGPD/`

### ShieldScan — Domain Auditor
OSINT scanner que detecta subdominios, rutas críticas y evalúa cabeceras de seguridad.
`/services/Security-Scan-Report/`

---

## 4. Laboratorios

### SOC Lab (`/labs/soc-lab/`)
Entorno de prácticas con OWASP Juice Shop, panel de control SOC y contenedor de escaneo.

```bash
cd labs/soc-lab
docker compose up -d
```

---

## Tecnologías Principales

| Área | Tecnologías |
|---|---|
| **DevOps** | Docker, Docker Compose, Traefik, Prometheus, Grafana, Loki |
| **Backend** | Node.js, Express 5, Axios, Helmet |
| **Frontend** | HTML5, Tailwind CSS, Chart.js, Lucide Icons |
| **Seguridad** | Bash, Python, UFW, Nmap, SQLMap, Nikto, Amass, FFUF |
| **CI/CD** | GitHub Actions, Snyk (SAST + SCA + IaC), Netlify |

---

## Seguridad y Privacidad

- Zero credentials en el repositorio — todas las claves vía `.env`
- CSP restrictivos en todas las landing pages
- Rate limiting y Helmet en todas las APIs
- Escaneo de vulnerabilidades automatizado con Snyk

---

Desarrollado por **Angel Catriel / secsecthum** — DevOps Engineer & Cybersecurity Specialist
