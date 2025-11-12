# Quickstart Guide: Landing de Pre-Lanzamiento

**Feature**: 002-landing-countdown  
**Last Updated**: 2025-11-11

## Overview

Esta guía te ayudará a configurar y ejecutar la landing page de pre-lanzamiento en tu entorno local.

---

## Prerequisites

**Required**:
- Node.js 20.x o superior
- pnpm 8.x o superior (package manager)
- Git
- Navegador moderno (Chrome, Firefox, Edge)

**Optional** (para backend):
- PHP 8.0+
- MySQL 8.0+
- Composer

---

## Quick Setup (5 minutos)

### 1. Clone Repository

```bash
cd ~/Proyectos
git clone https://github.com/your-org/albion-awards.git
cd albion-awards
```

### 2. Checkout Feature Branch

```bash
git checkout 002-landing-countdown
```

### 3. Install Dependencies

```bash
# Install frontend dependencies
pnpm install
```

**Expected Output**:
```
✓ Dependencies installed (23 packages)
✓ @formkit/tempo added
✓ daisyui added
✓ react, tailwindcss, vite installed
```

### 4. Configure Environment

```bash
# Create .env file
cp .env.example .env
```

**Edit `.env`**:
```bash
# Launch date (ISO 8601 format, GMT-5 Bogotá)
VITE_LAUNCH_DATE=2025-11-24T00:00:00-05:00

# Timezone (IANA format)
VITE_TIMEZONE=America/Bogota

# API endpoint (use mock for local dev)
VITE_API_BASE_URL=http://localhost:8000/api

# Google Analytics (optional, leave empty for dev)
VITE_GA_ID=

# Social media URLs
VITE_TWITTER_URL=https://twitter.com/kuruogg
VITE_DISCORD_URL=https://discord.gg/albion
```

### 5. Start Development Server

```bash
pnpm run dev
```

**Expected Output**:
```
VITE v7.2.2  ready in 350 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.10:5173/
➜  press h + enter to show help
```

### 6. Open in Browser

Navigate to: **http://localhost:5173/**

You should see:
- ✅ Countdown timer updating every second
- ✅ 10 categories displayed in grid
- ✅ Email registration form
- ✅ Social share buttons
- ✅ Footer with disclaimer

---

## Project Structure

```
albion-awards/
├── src/
│   ├── components/           # React components
│   │   ├── Countdown.tsx     # Main countdown component
│   │   ├── CountdownDisplay.tsx  # DaisyUI countdown UI
│   │   ├── CategoriesList.tsx    # Categories grid
│   │   ├── EmailForm.tsx         # Email capture form
│   │   ├── ShareButtons.tsx      # Social share buttons
│   │   ├── EventInfo.tsx         # Event description
│   │   └── Footer.tsx            # Footer with disclaimer
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useCountdown.ts   # Countdown logic with Tempo
│   │   └── useEmailSubmit.ts # Email submission logic
│   │
│   ├── services/             # API services
│   │   └── emailsApi.ts      # Email registration API client
│   │
│   ├── types/                # TypeScript types
│   │   ├── countdown.ts      # TimeLeft interface
│   │   ├── category.ts       # Category interface
│   │   ├── api.ts            # API request/response types
│   │   └── config.ts         # AppConfig interface
│   │
│   ├── config/               # Configuration
│   │   ├── categories.json   # Static categories data
│   │   └── app.config.ts     # App configuration loader
│   │
│   ├── utils/                # Utility functions
│   │   └── validators.ts     # Email validation
│   │
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles (Tailwind)
│
├── public/                   # Static assets
│   ├── albion-logo.png       # Albion Awards logo
│   └── favicon.ico           # Favicon
│
├── api/                      # Backend API (PHP)
│   ├── emails.php            # Email registration endpoint
│   ├── health.php            # Health check endpoint
│   └── config/
│       └── database.php      # MySQL connection
│
├── .env                      # Environment variables
├── .env.example              # Environment template
├── tailwind.config.js        # Tailwind + DaisyUI config
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
└── package.json              # NPM dependencies
```

---

## Development Workflow

### Running Tests

```bash
# Run unit tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test:watch
```

### Linting & Formatting

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

### Building for Production

```bash
# Build optimized bundle
pnpm build

# Preview production build locally
pnpm preview
```

**Output**: `dist/` folder with optimized static files

---

## Backend Setup (Optional for Local Dev)

### Option 1: Mock API (Recommended for Frontend Dev)

No backend needed! Use mock data:

```typescript
// src/services/emailsApi.ts
export async function submitEmail(email: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock successful response
  return { success: true, message: 'Email registrado (mock)' }
}
```

### Option 2: Local PHP Server

**Setup**:

```bash
# Navigate to API directory
cd api

# Install Composer dependencies
composer install

# Create .env file
cp .env.example .env
```

**Configure Database** (`api/.env`):
```bash
DB_HOST=localhost
DB_NAME=albion_awards
DB_USER=root
DB_PASS=password
```

**Run Migrations**:
```bash
php migrate.php
```

**Start PHP Server**:
```bash
php -S localhost:8000 -t .
```

**Test API**:
```bash
curl -X POST http://localhost:8000/api/emails \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Email registrado exitosamente"
}
```

---

## Common Tasks

### Change Launch Date

**Edit `.env`**:
```bash
VITE_LAUNCH_DATE=2025-12-01T00:00:00-05:00
```

**Restart Dev Server**:
```bash
# Stop server (Ctrl+C)
pnpm run dev
```

### Add New Category

**Edit `src/config/categories.json`**:
```json
{
  "id": "nueva-categoria",
  "name": "Nueva Categoría",
  "description": "Descripción de la categoría",
  "icon": "🎯",
  "order": 11
}
```

### Customize Colors/Theme

**Edit `tailwind.config.js`**:
```javascript
export default {
  theme: {
    extend: {
      colors: {
        'albion-gold': '#d4af37',
        'albion-dark': '#1a1a1a',
      }
    }
  },
  daisyui: {
    themes: [
      {
        albion: {
          primary: '#d4af37',
          secondary: '#8b7355',
          accent: '#ff6b35',
          neutral: '#2a2a2a',
          'base-100': '#ffffff',
        }
      }
    ]
  }
}
```

---

## Troubleshooting

### Issue: Countdown Not Updating

**Symptom**: Timer stuck at 00:00:00:00

**Solution**:
1. Check `.env` file has valid `VITE_LAUNCH_DATE`
2. Restart dev server to reload env variables
3. Verify timezone is correct (`America/Bogota`)

```bash
# Check if date is in future
node -e "console.log(new Date('2025-11-24T00:00:00-05:00'))"
```

---

### Issue: Tailwind Styles Not Applying

**Symptom**: No styles visible, plain HTML

**Solution**:
1. Verify Tailwind is imported in `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Check `tailwind.config.js` content paths:
```javascript
content: ['./src/**/*.{js,ts,jsx,tsx}']
```

3. Restart dev server

---

### Issue: Email Submission Fails

**Symptom**: Form shows "Error al enviar email"

**Solution**:
1. Check API endpoint in `.env`:
```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

2. Verify PHP server is running:
```bash
curl http://localhost:8000/api/health
```

3. Check CORS headers in `api/emails.php`:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

---

### Issue: Port 5173 Already in Use

**Symptom**: `Error: Port 5173 is already in use`

**Solution**:
```bash
# Option 1: Kill existing process
lsof -ti:5173 | xargs kill -9

# Option 2: Use different port
pnpm run dev -- --port 3000
```

---

## Performance Checklist

Before deploying, verify:

- [ ] Bundle size < 500KB (run `pnpm build` and check `dist/` size)
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Images optimized (use WebP, < 100KB each)
- [ ] Countdown updates smoothly (no jank)
- [ ] Email form validates correctly
- [ ] Works on mobile (responsive design)
- [ ] Social share buttons functional
- [ ] Footer disclaimer visible

---

## Deployment Guide

### Deploy to Hostinger

**1. Build Production Bundle**:
```bash
pnpm build
```

**2. Upload Files**:
```bash
# Via FTP/SFTP
# Upload contents of dist/ to public_html/
```

**3. Configure Backend**:
```bash
# Upload api/ folder to public_html/api/
# Configure .env with production MySQL credentials
# Test: https://albionawards.com/api/health
```

**4. Verify**:
- Visit https://albionawards.com
- Check countdown is running
- Submit test email
- Verify in MySQL database

---

## Environment Variables Reference

| Variable            | Required | Default          | Description                   |
| ------------------- | -------- | ---------------- | ----------------------------- |
| `VITE_LAUNCH_DATE`  | ✅ Yes    | -                | Launch date (ISO 8601, GMT-5) |
| `VITE_TIMEZONE`     | ✅ Yes    | `America/Bogota` | IANA timezone identifier      |
| `VITE_API_BASE_URL` | ✅ Yes    | -                | API endpoint URL              |
| `VITE_GA_ID`        | ❌ No     | -                | Google Analytics ID           |
| `VITE_TWITTER_URL`  | ❌ No     | -                | Twitter profile URL           |
| `VITE_DISCORD_URL`  | ❌ No     | -                | Discord invite URL            |

---

## Next Steps

After setup:
1. ✅ Run `pnpm run dev` - verify countdown works
2. ✅ Test email form (mock mode)
3. ✅ Review categories list
4. ✅ Customize colors/branding
5. ✅ Setup backend API (optional)
6. ✅ Deploy to Hostinger

---

## Support

**Questions?**
- Check `specs/002-landing-countdown/spec.md` for full specification
- Review `specs/002-landing-countdown/research.md` for tech decisions
- Read `docs/prd.md` for product requirements

**Issues?**
- Create GitHub issue with label `002-landing-countdown`
- Include screenshots, console errors, and reproduction steps

---

**Last Updated**: 2025-11-11  
**Version**: 1.0.0  
**Estimated Setup Time**: 5-10 minutes
