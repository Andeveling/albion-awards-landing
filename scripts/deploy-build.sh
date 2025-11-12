#!/usr/bin/env bash

# Script para crear build de producción y empaquetarlo para Hostinger
# Uso: ./scripts/deploy-build.sh

set -e  # Detener en caso de error

echo "🚀 Iniciando proceso de build para Hostinger..."

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables
DIST_DIR="dist"
DEPLOY_DIR="deploy"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ZIP_NAME="albion-awards_${TIMESTAMP}.zip"

# Paso 1: Limpiar directorios previos
echo -e "${BLUE}📦 Limpiando directorios...${NC}"
rm -rf ${DIST_DIR}
rm -rf ${DEPLOY_DIR}
mkdir -p ${DEPLOY_DIR}

# Paso 2: Ejecutar build
echo -e "${BLUE}🔨 Ejecutando build de producción...${NC}"
pnpm run build

# Verificar que el build se completó
if [ ! -d "${DIST_DIR}" ]; then
  echo -e "${YELLOW}❌ Error: El directorio ${DIST_DIR} no fue creado${NC}"
  exit 1
fi

# Paso 3: Crear archivo .htaccess para SPA routing
echo -e "${BLUE}📝 Creando archivo .htaccess...${NC}"
cat > ${DIST_DIR}/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirigir todos los requests a index.html excepto archivos existentes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]

  # Comprimir archivos de texto
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
  </IfModule>

  # Cachear archivos estáticos
  <IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
  </IfModule>
</IfModule>
EOF

# Paso 4: Copiar archivos de API
echo -e "${BLUE}📋 Copiando archivos de API...${NC}"
if [ -d "api" ]; then
  cp -r api ${DIST_DIR}/
  echo -e "${GREEN}✓ API copiada${NC}"
else
  echo -e "${YELLOW}⚠ No se encontró directorio api/${NC}"
fi

# Paso 5: Crear archivo ZIP
echo -e "${BLUE}📦 Creando archivo ZIP...${NC}"
cd ${DIST_DIR}
zip -r ../${DEPLOY_DIR}/${ZIP_NAME} . -q
cd ..

# Paso 6: Información del build
echo ""
echo -e "${GREEN}✅ Build completado exitosamente!${NC}"
echo ""
echo -e "${BLUE}📊 Información del build:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 Directorio de build: ${DIST_DIR}/"
echo "📦 Archivo ZIP: ${DEPLOY_DIR}/${ZIP_NAME}"
echo "📏 Tamaño del ZIP: $(du -h ${DEPLOY_DIR}/${ZIP_NAME} | cut -f1)"
echo "🕐 Timestamp: ${TIMESTAMP}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}📤 Para desplegar en Hostinger:${NC}"
echo "1. Extrae el contenido de ${DEPLOY_DIR}/${ZIP_NAME}"
echo "2. Sube todos los archivos a /public_html/ vía FTP/SFTP"
echo "3. O usa el File Manager del cPanel para subir el ZIP y extraerlo"
echo ""
echo -e "${YELLOW}💡 Tip: El archivo .htaccess ya está incluido para SPA routing${NC}"
echo ""
