#!/bin/bash

echo "--- 1. Deteniendo y eliminando contenedores, redes y huérfanos ---"
docker compose down --remove-orphans

echo "--- 2. Limpieza profunda de redes de Docker ---"
docker network prune -f

echo "--- 3. Asegurando permisos de archivos críticos ---"
mkdir -p traefik
touch traefik/acme.json
chmod 600 traefik/acme.json

echo "--- 4. (Opcional) Borrando volúmenes de datos ---"
# Descomenta la siguiente línea si quieres borrar la base de datos y empezar de CERO absoluto
# docker volume prune -f

echo "--- 5. Levantando el stack corregido ---"
docker compose up -d

echo "--- 6. Verificando estado ---"
docker ps