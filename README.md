# 🛡️ Full-Stack Security & DevOps Portfolio

![License](https://img.shields.io/badge/license-MIT-green)
![Security](https://img.shields.io/badge/Cybersecurity-Blue%20%7C%20Red-red)
![DevOps](https://img.shields.io/badge/DevOps-Docker%20%7C%20Monitoring-blue)

Repositorio profesional que integra arquitecturas de despliegue seguro, herramientas de auditoría de ciberseguridad y dashboards de inteligencia de mercado en tiempo real.

---

## 🏗️ Arquitectura del Ecosistema

Este portafolio se divide en tres pilares estratégicos que simulan un entorno de producción real y seguro.

### 1. ♾️ DevOps & Cloud Infrastructure (`/deployments`)
Despliegue de un **Stack CRM Empresarial** utilizando contenedores optimizados y orquestación avanzada.
* **Reverse Proxy:** Traefik con terminación TLS automática (Let's Encrypt).
* **Observabilidad:** Stack completo de monitoreo con **Prometheus**, **Loki** (logs) y **Grafana**.
* **Seguridad de Red:** Aislamiento de base de datos MariaDB en redes internas no expuestas.
* **Automatización:** Scripts de despliegue en VPS y auto-curación del stack.

### 2. 🛡️ Cybersecurity Hub (`/security`)
Herramientas y documentación de operaciones de seguridad.
* **Blue Team:** Scripts de detección de anomalías en Bash, auditoría de privilegios y hardening de sistemas Linux.
* **Red Team:** Automatización de escaneos ofensivos (Nmap, Sqlmap, Nikto) para reconocimiento de activos.
* **Writeups (CTF):** Documentación técnica detallada de resoluciones de máquinas en DockerLabs y entornos vulnerables.

### 3. 💻 Intelligence Services (`/services`)
Aplicaciones Full-Stack diseñadas con enfoque en visualización de datos y cumplimiento.
* **Golden Terminal v2.0:** Dashboard institucional para análisis de mercado (Bitcoin/Crypto) con estética Cyberpunk y predicciones IA.
* **Security Scan Report:** Microservicio para auditoría de dominios (VirusTotal/SafeBrowsing API).

---

## 📂 Estructura del Proyecto

```bash
.
├── 📂 deployments/           # Orquestación Docker y Configuración de Servidores
│   └── 📂 crm-stack/         # Stack CRM + Monitoring (Grafana/Loki)
├── 📂 security/              # Operaciones de Ciberseguridad
│   ├── 📂 blue-team/         # Hardening y Defensa activa
│   ├── 📂 red-team/          # Automatización de Pentesting
│   └── 📂 writeups/          # Guías técnicas de resolución de máquinas
├── 📂 services/              # Aplicaciones Web y APIs
│   ├── 📂 market-terminal/   # Dashboard "Golden Terminal"
│   └── 📂 compliance-api/    # Herramientas de reporte y LGPD
└── 📂 shared-scripts/        # Utilidades generales en Bash
🚀 Quick Start (Despliegue Rápido)
Para levantar el stack de monitoreo y CRM en un entorno local de pruebas:

Clonar y entrar:

Bash
git clone [https://github.com/tu-usuario/Portafolio.git](https://github.com/tu-usuario/Portafolio.git)
cd deployments/crm-stack
Configurar:

Bash
cp .env.example .env
# Edita las credenciales en el archivo .env
Lanzar:

Bash
docker compose up -d
🔐 Seguridad y Privacidad
Zero Credentials: Todas las claves sensibles se gestionan vía variables de entorno.

Hardening: Los Dockerfiles utilizan multi-stage builds para reducir la superficie de ataque.
![Snyk Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/secsecthum/Portafolio)

Compliance: Diseños orientados a la normativa LGPD y protección de datos.

🛠️ Tecnologías Core
DevOps: Docker, Docker Compose, Traefik, Prometheus, Grafana, Loki.
Cyber: Bash Scripting, UFW, Nmap, Metasploit, Análisis de Logs.
Dev: Node.js, JavaScript (ES6+), Tailwind CSS, Chart.js.

Desarrollado por [Angel Catriel/secsecthum]
Ingeniero DevOps & Especialista en Ciberseguridad
