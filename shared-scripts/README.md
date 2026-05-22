# Scripts de Automatización y Monitoreo

Colección de scripts Bash para detección de anomalías, auditoría de seguridad y monitoreo de sistemas Linux.

## Scripts Disponibles

### 🔍 Análisis y Detección

| Script | Líneas | Función |
|---|---|---|
| `anomaly-detection.sh` | 145 | Detecta UID 0, grupos peligrosos, procesos sospechosos, cambios en cron, binarios modificados, SUID anómalos, claves SSH y conexiones de red |
| `blue-team-eye.sh` | 84 | Visibilidad situacional: kernel, usuarios, sudo, servicios, puertos, procesos, persistencia, SUID |
| `defencive-auth.sh` | 91 | Auditoría forense de autenticación: últimos logins, fallos SSH, sudo, bash_history, LD_PRELOAD |

### 🏗️ Integridad del Sistema

| Script | Líneas | Función |
|---|---|---|
| `baseline-linux-create.sh` | 46 | Crea snapshot de línea base: usuarios, grupos, servicios, puertos, cron, SUID, hashes SHA256 de binarios críticos |
| `baseline-comparer.sh` | 152 | Compara estado actual contra línea base con clasificación de riesgo (LOW/MEDIUM/HIGH) |

### 🔐 Escalada de Privilegios

| Script | Líneas | Función |
|---|---|---|
| `privesc-linux-audit.sh` | 77 | Reconoce vectores de escalada: SUID/SGID, capabilities, cron jobs, archivos writables, PATH hijacking |

## Uso

```bash
# Dar permisos de ejecución
chmod +x *.sh

# Ejecutar (algunos requieren root)
sudo bash anomaly-detection.sh
bash privesc-linux-audit.sh
```

## Requisitos

- Linux (Ubuntu, Debian, CentOS)
- Bash >= 4.0
- Permisos de root para scripts de sistema

---

**Tecnologías:** Bash, Linux Security, Forensics
