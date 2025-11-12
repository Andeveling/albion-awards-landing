# 📦 Scripts de Deployment

Scripts para automatizar el proceso de build y empaquetado para despliegue en Hostinger.

## 🚀 deploy-build.sh

Script que automatiza el proceso completo de build y empaquetado para despliegue estático.

### Características

- ✅ Ejecuta el build de producción con Vite
- ✅ Genera archivo `.htaccess` optimizado para SPA routing
- ✅ Copia los archivos de API PHP (si existen)
- ✅ Crea un archivo ZIP timestampeado listo para subir
- ✅ Muestra información detallada del build

### Uso

#### Opción 1: Via npm script (Recomendado)

```bash
pnpm run deploy:build
```

#### Opción 2: Ejecutar directamente

```bash
./scripts/deploy-build.sh
```

### Output

El script genera:

```
deploy/
└── albion-awards_YYYYMMDD_HHMMSS.zip
```

Este archivo ZIP contiene:
- `index.html` - SPA principal
- `assets/` - CSS, JS, imágenes compiladas
- `.htaccess` - Configuración para Apache (SPA routing + optimizaciones)
- `api/` - Endpoints PHP (si existen)

### Despliegue en Hostinger

Después de ejecutar el script:

1. **Via File Manager (cPanel)**:
   - Accede a cPanel → File Manager
   - Navega a `/public_html/`
   - Sube el archivo ZIP
   - Extrae el ZIP en `/public_html/`
   - Elimina el ZIP

2. **Via FTP/SFTP**:
   ```bash
   # Extraer localmente
   cd deploy
   unzip albion-awards_*.zip -d temp/
   
   # Subir via SFTP
   sftp usuario@tu-dominio.com
   cd /public_html
   put -r temp/* .
   exit
   ```

### Archivo .htaccess incluido

El script genera automáticamente un `.htaccess` con:

- **SPA Routing**: Redirecciona todas las rutas a `index.html`
- **Compresión**: Habilita Gzip para archivos de texto
- **Caché**: Configura caché a largo plazo para assets estáticos
- **Optimización**: Mejora el rendimiento y SEO

### Troubleshooting

**Error: "pnpm: command not found"**
```bash
npm install -g pnpm
```

**Error: "Permission denied"**
```bash
chmod +x scripts/deploy-build.sh
```

**ZIP muy grande (> 50MB)**
- Verifica que `node_modules/` no esté incluido
- Revisa el tamaño de assets en `dist/`
- Considera optimizar imágenes

## 📋 Estructura del proyecto después del build

```
dist/
├── index.html           # SPA principal
├── .htaccess           # Configuración Apache
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── api/                # Endpoints PHP
    ├── config/
    └── emails/
```

## 🧹 clean-deploy.sh

Script para limpiar builds antiguos y mantener solo los más recientes.

### Uso

```bash
# Mantener los últimos 3 builds (por defecto)
pnpm run deploy:clean

# Mantener los últimos 5 builds
bash scripts/clean-deploy.sh 5

# Mantener solo el último build
bash scripts/clean-deploy.sh 1
```

### Ejemplo

```bash
# Antes
deploy/
├── albion-awards_20251110_120000.zip
├── albion-awards_20251111_150000.zip
├── albion-awards_20251111_180000.zip
├── albion-awards_20251112_080000.zip
└── albion-awards_20251112_084001.zip

# Después de ejecutar: pnpm run deploy:clean
deploy/
├── albion-awards_20251111_180000.zip
├── albion-awards_20251112_080000.zip
└── albion-awards_20251112_084001.zip
```

## 🔗 Referencias

- [Guía de Deployment en Hostinger](../docs/HOSTINGER_DEPLOYMENT_GUIDE_ES.md)
- [Documentación de Vite Build](https://vitejs.dev/guide/build.html)
