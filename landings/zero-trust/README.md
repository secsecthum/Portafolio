# Zero-Trust Security Portfolio Terminal

Portfolio profesional interactivo con estética cyberpunk, que simula un sistema operativo de ciberseguridad en tiempo real. Diseñado bajo el principio de confianza cero.

## Características

- **Terminal Live Feed**: Logs de auditoría simulados en tiempo real (Snyk, IDS, Netlify)
- **Core Skills Matrix**: Visualización de habilidades técnicas en Pentesting, Hardening y Escaneo
- **Reloj UTC**: Sincronizado en tiempo real
- **Diseño responsivo**: Efectos scanline, tipografía Fira Code, paleta verde sobre negro
- **Hardening A+**: CSP restrictivo, HSTS, cabeceras de seguridad en netlify.toml

## Inicio Rápido

```bash
python3 -m http.server 8080
# o
npx serve .
```

Visitar: http://localhost:8080

## Despliegue

Configurado para Netlify con `netlify.toml` para cabeceras de seguridad.

---

**Stack:** HTML5, Tailwind CSS, Lucide Icons, Netlify
