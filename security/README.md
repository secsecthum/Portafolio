# Cybersecurity Hub

Colección de herramientas, documentación y write-ups de ciberseguridad ofensiva y defensiva.

## Estructura

### Blue Team (`/security/BlueTEAM/`)
Scripts de hardening, auditoría y defensa activa para sistemas Linux.
- `hostAudit.py` — Auditoría automatizada con AIDE, RKHunter, Auditd, Logwatch
- `ufw-admin` — Guía de configuración de firewall UFW
- `service-linux-admin` — Gestión de servicios en antiX/sysvinit

### Red Team (`/security/RedTEAM/`)
Cheat sheets de herramientas de pentesting y reconocimiento.
- Nmap, SQLMap, Nikto, Amass, FFUF, Katana, WhatWeb

### Write-ups CTF (`/security/writeups/`)
Documentación de máquinas vulnerables resueltas en DockerLabs y VulnHub.

| Máquina | Dificultad | Estado |
|---|---|---|
| Aidor | Fácil | ✅ Completado |
| Injection | Media | ✅ Completado |
| Psycho | Hard | ⏳ En progreso |

## Scripts Compartidos

Los scripts de automatización y monitoreo se encuentran en [/shared-scripts/](../shared-scripts/).

---

**Tecnologías:** Bash, Python, Nmap, SQLMap, Nikto, Amass, FFUF, AIDE, RKHunter
