# Compliance Center — Global Security Auditor

Herramienta de autoevaluación de cumplimiento normativo para oficiales de seguridad (CISO) y desarrolladores. Evalúa la postura de seguridad contra estándares internacionales (GDPR/LGPD).

## Funcionalidades

- **Radar Chart Analysis**: Visualización dinámica con Chart.js (Identidad, Datos, Red)
- **Algoritmo de Riesgo**: Scoring basado en pesos críticos de seguridad
- **Auditoría ID**: IDs únicos para trazabilidad de simulaciones
- **Privacy-First**: Toda la lógica se ejecuta en el cliente — cero fuga de datos

## Controles Evaluados

| Categoría | Control | Peso |
|---|---|---|
| Identidad | Multi-Factor Auth (MFA) | Crítico |
| Identidad | IAM Roles (RBAC) | Alto |
| Datos | Cifrado AES-256 | Crítico |
| Datos | Backups Inmutables | Medio |
| Red | WAF | Alto |
| Red | Centralización de Logs (SIEM) | Bajo |

## Inicio Rápido

```bash
cd components
python3 -m http.server 8000
```

Visitar: http://localhost:8000

## Seguridad

- CSP restrictivo en `netlify.toml`
- Modo de análisis local (sin envío de datos)
- Calificación A+ en Mozilla Observatory

---

**Stack:** HTML5, Tailwind CSS, Chart.js, Lucide Icons, Netlify
