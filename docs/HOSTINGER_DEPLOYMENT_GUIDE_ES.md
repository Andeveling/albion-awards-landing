# Guía de Deployment en Hostinger

## 📋 Descripción General

Este documento describe cómo desplegar **Albion Awards** (SPA estática + backend PHP) en Hostinger.

**Arquitectura**:
- Frontend: Archivos estáticos (HTML, CSS, JS) en raíz de Hostinger
- Backend: APIs PHP en carpeta `/api/` del mismo hosting
- Comunicación: AJAX (Fetch API) desde el SPA al backend PHP

---

## ✅ Pre-requisitos

### En tu máquina local

1. **Node.js 18+** - para compilar el SPA
2. **pnpm** - gestor de paquetes
3. **Cliente FTP/SFTP** - para subir archivos
   - Recomendado: Cyberduck (gratuito), FileZilla, o WinSCP
   - O usar terminal: `sftp` o `scp`

### En Hostinger

1. Acceso FTP/SFTP a tu cuenta
2. Carpeta raíz del dominio (usualmente `/public_html/` o similar)
3. PHP 8.0+ habilitado (estándar en Hostinger)
4. Control Panel (cPanel) para configurar bases de datos

---

## 🏗️ Paso 1: Construir el SPA Localmente

```bash
# 1. Instalar dependencias
pnpm install

# 2. Compilar para producción
pnpm run build

# Resultado: carpeta dist/ con archivos estáticos
# ├── index.html
# ├── assets/
# │   ├── index-xxxxx.js
# │   ├── index-xxxxx.css
# │   └── ...
# └── ...
```

**Verificar tamaño**:
```bash
du -sh dist/
# Debe estar bajo ~5-10 MB para Hostinger (depende tu plan)
```

---

## 🌐 Paso 2: Subir Frontend a Hostinger

### Opción A: Via cPanel File Manager (Fácil)

1. Accede a **cPanel** → **File Manager**
2. Navega a `/public_html/` (raíz del dominio)
3. **Elimina archivos old** si existe proyecto anterior
4. **Sube** todos los archivos de `dist/` a `/public_html/`
   - Arrastra y suelta desde tu computadora, o usa el botón "Upload"

### Opción B: Via SFTP/FTP (Recomendado para automatización)

```bash
# Configurar credenciales SFTP
# Host: tu-dominio.com o IP
# Usuario: tu-usuario-ftp
# Contraseña: tu-contraseña
# Puerto: 22 (SFTP) o 21 (FTP)

# Desde terminal (Linux/macOS):
sftp tu-usuario@tu-dominio.com
cd /public_html
put -r dist/* .
exit

# O con scp (más simple):
scp -r dist/* tu-usuario@tu-dominio.com:/public_html/
```

---

## 🔄 Paso 3: Configurar SPA Routing en Hostinger

El SPA usa React Router; todos los URLs deben servir `index.html` para que React maneje el enrutamiento.

### Crear `.htaccess` en `/public_html/`

```apache
# .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # No reescribir si es un archivo o carpeta real
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Reescribir TODO a index.html (SPA routing)
  RewriteRule ^(.*)$ index.html [L]
</IfModule>
```

**Pasos**:
1. En cPanel → File Manager, navega a `/public_html/`
2. Click derecha → "Create New File" → nombre: `.htaccess`
3. Edita el archivo y pega el contenido anterior
4. **Guardar**

**Verificación**:
- Abre tu sitio en `https://tu-dominio.com/`
- Navega a cualquier ruta (ej: `/about`, `/awards`)
- Debe servir el SPA correctamente (sin 404 error)

---

## 🔌 Paso 4: Crear Estructura de Backend PHP

### Crear carpeta `/api/`

En cPanel File Manager:
1. Navega a `/public_html/`
2. Click derecha → "Create New Folder" → nombre: `api`
3. Dentro de `api/`, crea el siguiente estructura:

```
/public_html/api/
├── .env                    # Variables de entorno (NO subir a control)
├── .htaccess               # Reescrituras para API
├── config/
│   └── db.php             # Conexión a BD
├── handlers/
│   ├── awards.php         # GET /api/awards
│   ├── users.php          # GET /api/users
│   └── ...
├── middleware/
│   └── cors.php           # CORS headers
├── index.php              # Router principal
└── ...
```

### Archivo Principal: `/public_html/api/index.php`

```php
<?php
// Habilitar CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Router simple
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api/', '', $path);
$method = $_SERVER['REQUEST_METHOD'];

// Ejemplos de rutas
if ($path === 'awards' && $method === 'GET') {
    // Llamar a handler
    include 'handlers/awards.php';
} elseif ($path === 'users' && $method === 'GET') {
    include 'handlers/users.php';
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>
```

### Ejemplo Handler: `/public_html/api/handlers/awards.php`

```php
<?php
// GET /api/awards
// Retorna lista de awards

$awards = [
    ['id' => 1, 'name' => 'Best Player', 'year' => 2025],
    ['id' => 2, 'name' => 'Most Active Guild', 'year' => 2025],
];

http_response_code(200);
echo json_encode(['success' => true, 'data' => $awards]);
?>
```

---

## 🔐 Paso 5: Configurar Base de Datos (Opcional)

Si necesitas una BD (ej: para guardar datos de awards):

### En cPanel

1. **Crear BD**:
   - cPanel → "MySQL Databases"
   - Nombre: `tuusuario_awards` (Hostinger prefija automáticamente)
   - Usuario: `tuusuario_awardsuser`
   - Contraseña: (genera segura)
   - Privilegios: SELECT, INSERT, UPDATE, DELETE

2. **Crear archivo `/public_html/api/config/db.php`**:

```php
<?php
// config/db.php
$db_host = 'localhost';
$db_name = 'tuusuario_awards';
$db_user = 'tuusuario_awardsuser';
$db_pass = 'tu-contraseña-segura';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode(['error' => 'DB Connection Failed']));
}
?>
```

3. **Usar en handlers**:

```php
<?php
// handlers/awards.php
include '../config/db.php';

$stmt = $pdo->query("SELECT * FROM awards ORDER BY year DESC");
$awards = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'data' => $awards]);
?>
```

---

## 🧪 Paso 6: Probar la Integración

### Test 1: SPA Carga Correctamente

```bash
# Desde tu navegador
https://tu-dominio.com/
# Debe mostrar la app Albion Awards
```

### Test 2: API Responde

```bash
# Desde terminal
curl https://tu-dominio.com/api/awards
# Debe retornar JSON:
# {"success":true,"data":[...]}
```

### Test 3: Frontend Consume API

En el SPA (ej: `src/services/api.ts`):

```typescript
const API_BASE = '/api';

export async function fetchAwards() {
  const response = await fetch(`${API_BASE}/awards`);
  if (!response.ok) throw new Error('Failed to fetch awards');
  return response.json();
}
```

Desde un componente:

```typescript
useEffect(() => {
  fetchAwards().then(data => setAwards(data.data));
}, []);
```

---

## 📝 Variables de Entorno en PHP

Hostinger **no permite** archivos `.env` públicos. En su lugar:

### Opción 1: `.htaccess` Protege `.env`

```apache
<Files .env>
    Order allow,deny
    Deny from all
</Files>
```

### Opción 2: Usar cPanel Environment Variables

1. cPanel → "Environment Variables"
2. Crea `DB_PASSWORD`, `API_KEY`, etc.
3. Accede en PHP:

```php
$db_pass = getenv('DB_PASSWORD');
```

### Opción 3: Config en Carpeta Privada

Crea `/private/config.php` (fuera de `public_html`):

```php
<?php
return [
    'db_pass' => 'tu-contraseña',
    'api_key' => 'tu-key',
];
?>
```

Luego:

```php
$config = include('/path/to/private/config.php');
$db_pass = $config['db_pass'];
```

---

## 🚀 Paso 7: Automatizar Deploy (Opcional)

Si usas GitHub, puedes automatizar el deploy:

### GitHub Actions + FTP Deploy

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build SPA
        run: pnpm run build
      
      - name: Deploy to Hostinger
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
```

**Crear Secrets en GitHub**:
1. Repository → Settings → Secrets
2. Agregar: `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`

---

## 🆘 Troubleshooting

### Problema: "404 Not Found" en rutas SPA

**Solución**: Verifica que `.htaccess` esté en `/public_html/` y que mod_rewrite esté habilitado.

```bash
# Desde cPanel, en Terminal:
apache2ctl -M | grep rewrite
# Debe mostrar: rewrite_module
```

### Problema: CORS Error en API calls

**Solución**: Asegúrate que PHP tenga headers CORS:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
```

### Problema: Database Connection Failed

**Solución**: Verifica credenciales en cPanel, usa `localhost` como host.

```bash
# Test desde cPanel Terminal:
mysql -h localhost -u usuario -p bd_name
```

### Problema: Archivos no se suben completamente

**Solución**: Usa SFTP en lugar de FTP (más confiable en Hostinger).

---

## 📚 Recursos Útiles

- [Hostinger Knowledge Base](https://support.hostinger.com/)
- [PHP en Hostinger](https://support.hostinger.com/en/articles/6619295-php-faq)
- [cPanel Docs](https://docs.cpanel.net/)
- [CORS en PHP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Documento Actualizado**: 2025-11-11  
**Versión**: 1.0.0  
**Público**: Documentación para todo el equipo
