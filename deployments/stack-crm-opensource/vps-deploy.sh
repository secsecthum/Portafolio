#!/bin/bash

# --- CONFIGURACIÓN Y COLORES ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # Sin color

echo -e "${YELLOW}=== ASISTENTE DE DESPLIEGUE VPS (CRM + MONITOREO) ===${NC}"

# --- 1. CONFIRMACIÓN DE SEGURIDAD ---
read -p "⚠️ ¿Estás listo para iniciar el despliegue? Esto modificará el firewall y reiniciará contenedores. (s/n): " confirm
if [[ $confirm != [sS] ]]; then
    echo -e "${RED}Despliegue cancelado por el usuario.${NC}"
    exit 1
fi

# --- 2. CONFIGURACIÓN DEL FIREWALL (UFW) ---
echo -e "\n${YELLOW}[1/4] Configurando Firewall (UFW)...${NC}"
# Permitir SSH antes de activar para no quedar fuera de la VPS
sudo ufw allow ssh
# Puertos para Traefik (Web)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
# Activar firewall (si no lo está)
echo "y" | sudo ufw enable
sudo ufw status | grep -E "80|443|22"

# --- 3. PREPARACIÓN DE ARCHIVOS Y PERMISOS ---
echo -e "\n${YELLOW}[2/4] Preparando estructura de archivos...${NC}"
mkdir -p traefik prometheus loki grafana-data

# Permisos críticos para Traefik/SSL
if [ ! -f traefik/acme.json ]; then
    touch traefik/acme.json
fi
chmod 600 traefik/acme.json

# --- 4. VERIFICACIÓN DEL ARCHIVO .ENV ---
if [ ! -f .env ]; then
    echo -e "${RED}❌ ERROR: No existe el archivo .env. Por favor, créalo antes de continuar.${NC}"
    exit 1
fi

# --- 5. DESPLIEGUE CON DOCKER ---
echo -e "\n${YELLOW}[3/4] Lanzando contenedores con Docker Compose...${NC}"
# Usamos 'docker compose' (formato moderno de plugin)
sudo docker compose down --remove-orphans
sudo docker compose up -d

# --- 6. RESULTADO FINAL ---
echo -e "\n${GREEN}[4/4] ¡Despliegue completado con éxito!${NC}"
echo -e "----------------------------------------------------"
echo -e "Servicios activos:"
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo -e "----------------------------------------------------"
echo -e "Próximos pasos:"
echo -e "1. Revisa los certificados SSL: ${YELLOW}docker compose logs -f traefik${NC}"
echo -e "2. Accede a tu CRM en: ${GREEN}https://tu-dominio.com${NC}"