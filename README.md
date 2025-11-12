# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Albion Awards

A static Single Page Application (SPA) built with **React + TypeScript + Vite**, designed for **100% compatibility with Hostinger static hosting**. The frontend is decoupled from a PHP REST API backend, ensuring portability and simplicity.

## 🏗️ Architecture Overview

```
┌─────────────────────────┐           ┌──────────────────┐
│   Frontend (SPA)        │           │  Backend (PHP)   │
│  React + TypeScript     │◄──AJAX──► │  REST API        │
│  Vite Static Build      │           │  /api/* routes   │
│  dist/ → Hostinger      │           │  JSON responses  │
└─────────────────────────┘           └──────────────────┘
     100% Static Files         No SSR | No Node.js Runtime
```

**Key Principles** (See [`.specify/memory/constitution.md`](.specify/memory/constitution.md)):
1. **Static-First**: 100% client-side SPA; no SSR, no Node.js.
2. **Dependency Minimalism**: Only essential packages; frequent audits.
3. **Backend Decoupling**: All communication via REST JSON API over AJAX.
4. **Hostinger Compatibility**: Pure static files + PHP backend in `/api/` folder.
5. **Type Safety**: TypeScript mandatory; unit tests for API contracts.

## 📦 Technology Stack

### Frontend
- **React**: 19.2.0+
- **TypeScript**: 5.9.3+
- **Vite**: 7.2.2+ (build tool, zero runtime overhead)
- **ESLint**: Code quality (0 dependencies in production)

### Backend
- **PHP**: 8.0+ (Hostinger standard)
- **API Pattern**: RESTful JSON
- **Database**: (TBD - configurable per deployment)

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18+ (development only; not deployed)
- **pnpm**: Recommended package manager
- **PHP**: 8.0+ (for local backend testing)

### Local Development Setup

```bash
# 1. Install frontend dependencies
pnpm install

# 2. Start dev server (Vite HMR on localhost:5173)
pnpm run dev

# 3. (Optional) Configure API proxy in vite.config.ts for local PHP backend
# Map /api/* requests to http://localhost:8000 (or your PHP server)

# 4. Build production assets
pnpm run build
# Output: dist/ folder (ready for Hostinger)

# 5. Lint code
pnpm run lint
```

### Deployment to Hostinger

**Método rápido con script automatizado:**

```bash
# 1. Generar build y empaquetarlo
pnpm run deploy:build

# 2. Subir el ZIP generado a Hostinger
# Archivo generado: deploy/albion-awards_TIMESTAMP.zip
```

El script `deploy:build` ejecuta automáticamente:
- Build de producción con Vite
- Generación de `.htaccess` optimizado para SPA routing
- Copia de archivos PHP del directorio `api/`
- Creación de archivo ZIP listo para desplegar

**Pasos detallados**:

1. **Frontend**:
   - Ejecuta `pnpm run deploy:build`
   - Sube el contenido del ZIP a la raíz de Hostinger vía FTP/SFTP o cPanel File Manager
   - El `.htaccess` ya está incluido para SPA routing

2. **Backend**:
   - Los archivos PHP de `api/` ya están incluidos en el ZIP
   - Configura `.env` con credenciales de base de datos (PHP-side only)
   - Configura CORS headers en PHP para permitir requests desde tu dominio

**Scripts disponibles**:
- `pnpm run deploy:build` - Genera build y ZIP para deployment
- `pnpm run deploy:clean` - Limpia builds antiguos (mantiene los últimos 3)

📖 **Guías completas**:
- [Guía de Deployment en Hostinger](docs/HOSTINGER_DEPLOYMENT_GUIDE_ES.md)
- [Documentación de Scripts](scripts/README.md)

### .htaccess Configuration for SPA Routing

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Rewrite all requests to index.html (SPA routing)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L]
</IfModule>
```

## 📝 Project Structure

```
albion-awards/
├── src/
│   ├── App.tsx            # Root React component
│   ├── main.tsx           # Entry point
│   ├── components/        # React components (TBD)
│   ├── services/          # API client (Fetch API wrapper)
│   └── assets/            # Images, static files
├── dist/                  # Build output (Hostinger deployment)
├── public/                # Static assets (copied to dist/)
├── .specify/
│   ├── memory/
│   │   └── constitution.md  # Governance & principles
│   └── templates/           # Feature planning templates
├── package.json           # Frontend dependencies (minimal)
├── vite.config.ts         # Build configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🔌 API Integration

All backend calls use the native **Fetch API**:

```typescript
// src/services/api.ts (example)
const API_BASE = '/api';

export async function fetchAwards() {
  const response = await fetch(`${API_BASE}/awards`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
```

Backend routes are in `src/api/` (PHP files deployed to `/api/` on Hostinger):

```php
// src/api/awards/index.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Process request, return JSON
echo json_encode(['awards' => [/* ... */]]);
```

## ✅ Quality Assurance

- **Linting**: `pnpm run lint` (ESLint + TypeScript)
- **Build Validation**: `pnpm run build` (must succeed before PR)
- **Dependencies**: Monthly audits; new packages require justification
- **Bundle Size**: Monitor with `pnpm run build --report` (if available)

## 📄 Governance

This project adheres to strict principles documented in [`.specify/memory/constitution.md`](.specify/memory/constitution.md):

- **No SSR, No Node.js Runtime**: Static-only deployment.
- **Minimal Dependencies**: Every package justified.
- **API-Driven Architecture**: Frontend ↔ Backend via REST JSON.
- **Type Safety**: 100% TypeScript, no `any` without `@ts-ignore`.

For feature planning, see [`.specify/templates/`](.specify/templates/) for specification and task templates.

## 🔗 Useful Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Hostinger Knowledge Base](https://support.hostinger.com/)
- [Project Constitution](.specify/memory/constitution.md)

## 📞 Questions?

Refer to the Constitution and templates in `.specify/` for detailed governance and planning workflows.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
