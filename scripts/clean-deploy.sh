#!/usr/bin/env bash

# Script para limpiar builds antiguos del directorio deploy
# Uso: ./scripts/clean-deploy.sh [número_de_archivos_a_mantener]

# Por defecto mantiene los últimos 3 builds
KEEP=${1:-3}

echo "🧹 Limpiando builds antiguos..."
echo "📊 Manteniendo los últimos ${KEEP} builds"

DEPLOY_DIR="deploy"

if [ ! -d "${DEPLOY_DIR}" ]; then
  echo "✓ No hay directorio deploy/ para limpiar"
  exit 0
fi

# Contar archivos ZIP
TOTAL=$(ls -1 ${DEPLOY_DIR}/*.zip 2>/dev/null | wc -l)

if [ ${TOTAL} -eq 0 ]; then
  echo "✓ No hay archivos ZIP para limpiar"
  exit 0
fi

echo "📦 Total de builds encontrados: ${TOTAL}"

if [ ${TOTAL} -le ${KEEP} ]; then
  echo "✓ No es necesario limpiar (${TOTAL} <= ${KEEP})"
  exit 0
fi

# Eliminar builds antiguos, mantener los más recientes
ls -1t ${DEPLOY_DIR}/*.zip | tail -n +$((KEEP + 1)) | while read file; do
  echo "🗑️  Eliminando: $(basename "$file")"
  rm "$file"
done

echo "✅ Limpieza completada"
echo "📊 Builds mantenidos: $(ls -1 ${DEPLOY_DIR}/*.zip 2>/dev/null | wc -l)"
