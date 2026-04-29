# 🛡️ Zero-Trust Security Portfolio Terminal

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Zero--Trust-green?style=for-the-badge)
![UI](https://img.shields.io/badge/Interface-Cyberpunk-blueviolet?style=for-the-badge)

Este proyecto es una interfaz de portafolio de alto nivel diseñada bajo la filosofía **Zero-Trust**. No es solo un sitio estático, es un tablero de control que emula un sistema operativo de ciberseguridad activo, ideal para perfiles DevSecOps y Analistas de Seguridad.

## 🚀 Características Elite
- **📟 Terminal Live Feed**: Simulación de logs de auditoría en tiempo real (Snyk scans, Intrusion Detection, Netlify Headers).
- **🔋 Core Skills Matrix**: Visualización técnica de aptitudes en Pentesting, Hardening y Escaneo Automatizado.
- **⚡ Estética High-End**: Diseño responsivo con efectos de *Scanlines* y tipografía *Fira Code* para máxima inmersión.
- **🛡️ Hardening de Cabeceras**: Configuración de `netlify.toml` con políticas CSP restrictivas y HSTS.

## 🛠️ Instalación y Uso Local

Para correr este proyecto en tu máquina local y mantener la integridad de los scripts, sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone [https://github.com/tu-usuario/Portafolio.git](https://github.com/tu-usuario/Portafolio.git)
   cd zero-trust

Levantar el servidor local:
Debido a que el proyecto utiliza carga de iconos y scripts externos, se recomienda un servidor web en lugar de abrir el archivo directamente:

Opción A (Python 3):

Bash
python3 -m http.server 8080
Opción B (Node.js/npx):

Bash
npx serve .
Acceder: Abre tu navegador en http://localhost:8080

📦 Estructura del Proyecto
index.html: Arquitectura de la interfaz optimizada con Tailwind CSS.

script.js: Motor de la terminal y reloj UTC en tiempo real.

netlify.toml: Blindaje de seguridad para el despliegue en producción.


---

### 2. README para `compliance-checker/`

Crea este archivo en: `compliance-checker/README.md`

```markdown
# ⚖️ Compliance Center: Global Security Auditor

![Audit](https://img.shields.io/badge/Audit-Automated-blue?style=for-the-badge)
![Compliance](https://img.shields.io/badge/Compliance-GDPR%20%7C%20LGPD-8b5cf6?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-JS%20%7C%20Chart.js-informational?style=for-the-badge)

El **Compliance Center** es una herramienta SaaS de autoevaluación diseñada para oficiales de seguridad y desarrolladores que necesitan medir el nivel de cumplimiento de sus infraestructuras (GDPR/LGPD). Implementa una lógica de cálculo de riesgo basada en controles críticos de seguridad.

## 🧠 Funcionalidades Pro
- **📊 Radar Chart Analysis**: Visualización dinámica mediante *Chart.js* que desglosa la postura en Identidad, Datos y Red.
- **🔍 Algoritmo de Riesgo**: Lógica integrada que detecta la ausencia de controles (como MFA o WAF) y genera recomendaciones críticas.
- **🧾 Auditoría ID**: Generación aleatoria de IDs de auditoría para trazabilidad de simulaciones.
- **🕵️ Privacy-First**: Toda la lógica se ejecuta en el lado del cliente (Local Analysis Mode), garantizando que no haya fuga de datos sensibles.

## 💻 Ejecución en Local

Para probar la lógica de auditoría y las animaciones de escaneo:

1. **Navegar al directorio**:
   ```bash
   cd compliance-checker/components
Iniciar servidor de desarrollo:
Python es ideal para este proyecto ligero:

Bash
python3 -m http.server 5000
Ver resultados: Ve a http://localhost:5000 en tu navegador.

📑 Parámetros de Evaluación
El sistema evalúa 6 controles clave:

MFA: Protección de identidad contra phishing.

IAM/RBAC: Principio de menor privilegio.

Encryption: Cifrado AES-256 de datos en reposo.

Backups: Resiliencia ante ataques de Ransomware.

WAF: Defensa perimetral contra OWASP Top 10.

Logs/SIEM: Capacidad de respuesta ante incidentes.

🔒 Seguridad del Despliegue
Este proyecto incluye un archivo netlify.toml pre-configurado que saca una calificación de A+ en Mozilla Observatory, protegiendo la herramienta contra ataques de inyección y XSS.
