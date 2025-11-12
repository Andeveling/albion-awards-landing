# Implementation Plan: Landing de Pre-Lanzamiento Albion Awards

**Branch**: `002-landing-countdown` | **Date**: 2025-11-11 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-landing-countdown/spec.md`

## Summary

Landing page estática con cuenta regresiva para generar expectativa antes del lanzamiento de votaciones Albion Awards (24/11/2025). Incluye: cuenta regresiva en tiempo real (zona horaria Bogotá), visualización de 10 categorías, formulario de captura de emails, botones de compartir en redes sociales, y diseño responsive. SPA 100% estática construida con React 19, TypeScript, Vite 7, Tailwind CSS 4, y DaisyUI para componentes UI.

## Technical Context

**Language/Version**: TypeScript 5.9+ / JavaScript ES2022  
**Primary Dependencies**:
- React 19.2.0 (UI framework)
- Vite 7.2.2 (build tool)
- Tailwind CSS 4.1.17 (styling utility-first)
- DaisyUI 5.5.0 (component library para Tailwind)
- Tempo (date/time library para manejo de zona horaria)
- React Router 7.9.5 (routing, aunque landing es single-page)
- Zustand 5.0.8 (state management liviano)
- SWR 2.3.6 (data fetching, para validación de emails)

**Storage**: MySQL (Hostinger) - solo para persistir emails registrados vía API PHP  
**Testing**: Vitest + React Testing Library (validación de componentes y lógica de countdown)  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - últimas 2 versiones), responsive desde 320px  
**Project Type**: Web SPA (frontend estático + backend PHP API)  
**Performance Goals**: <3s página completa en 3G, actualización de countdown cada 1s sin lag  
**Constraints**: 
- SPA 100% estática (sin SSR, sin Node.js runtime)
- Hostinger static hosting (solo HTML/CSS/JS + PHP en /api/)
- Bundle size: idealmente <500KB gzipped
- Fecha de lanzamiento: **24/11/2025 00:00 GMT-5** (13 días disponibles)

**Scale/Scope**: <10k visitantes concurrentes, ~50 emails/hora durante pico, landing temporal (reemplazada por sistema de votación después del 24/11)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Static-First (100% Client-Side SPA) ✅ PASS
- ✅ Frontend build produces pure HTML/CSS/JavaScript (Vite build → dist/)
- ✅ Zero SSR logic (React client-side only)
- ✅ All routing in browser (React Router, aunque es single-page)
- ✅ Deploy dist/ to Hostinger static hosting
- **Compliance**: Landing es SPA estática pura, no SSR

### II. Dependency Minimalism ⚠️ REVIEW
- ✅ Core stack justified: React (UI), Vite (build), TypeScript (safety)
- ✅ Tailwind 4 + DaisyUI: justified (rapid styling, countdown component)
- ✅ Tempo: justified (zona horaria Bogotá, manejo de fechas preciso)
- ⚠️ React Router: potentially unnecessary (es una sola página)
- ⚠️ Zustand: evaluar si state es simple enough para React hooks
- ⚠️ SWR: evaluar si fetch nativo es suficiente para validación de emails
- **Action**: Phase 0 research evaluará si Router/Zustand/SWR son realmente necesarios

### III. Backend Decoupling via REST API ✅ PASS
- ✅ Backend PHP comunica vía REST JSON (POST /api/emails)
- ✅ Frontend usa fetch() AJAX nativo
- ✅ Sin PHP embebido en templates
- ✅ CORS configurado en PHP backend
- **Compliance**: Arquitectura desacoplada cumple

### IV. Hostinger Compatibility Constraints ✅ PASS
- ✅ Sin Node.js runtime en producción
- ✅ Sin secrets en build output
- ✅ .htaccess configurado para SPA fallback (aunque es single-page)
- ✅ Build output: solo archivos estáticos
- **Compliance**: Compatible con Hostinger básico

### V. Type Safety and Testing ✅ PASS
- ✅ TypeScript 5.9+ para todo el código
- ✅ Strict type checking habilitado
- ✅ Tests para countdown logic y validación de emails
- ✅ API mocking para tests de integración
- **Compliance**: Type safety garantizado

**Overall Status**: ✅ PASS con revisión de dependencias en Phase 0

**Actions Required**:
1. Phase 0: Research si React Router es necesario (probablemente no, es single-page)
2. Phase 0: Research si Zustand es necesario vs useState/useContext
3. Phase 0: Research si SWR es necesario vs fetch nativo

## Project Structure

### Documentation (this feature)

```text
specs/002-landing-countdown/
├── plan.md              # This file (implementation plan)
├── spec.md              # Feature specification (completed)
├── research.md          # Phase 0: Technology decisions
├── data-model.md        # Phase 1: Data entities
├── quickstart.md        # Phase 1: Setup instructions
├── contracts/           # Phase 1: API contracts
│   └── emails-api.yaml  # POST /api/emails endpoint
├── checklists/          # Quality validation
│   └── requirements.md  # Spec quality checklist (completed)
└── tasks.md             # Phase 2: Task breakdown (via /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Countdown.tsx           # Countdown timer con Tempo
│   ├── CountdownDisplay.tsx    # DaisyUI countdown component
│   ├── CategoriesList.tsx      # Listado de 10 categorías
│   ├── EmailForm.tsx           # Formulario de captura de emails
│   ├── ShareButtons.tsx        # Botones de redes sociales
│   ├── EventInfo.tsx           # Sección "Sobre el Evento"
│   └── Footer.tsx              # Footer con disclaimer
├── services/
│   ├── api.ts                  # Cliente API (fetch wrapper)
│   ├── countdown.ts            # Lógica de cuenta regresiva
│   └── emailValidation.ts      # Validación de emails
├── hooks/
│   ├── useCountdown.ts         # Hook personalizado para countdown
│   └── useEmailSubmit.ts       # Hook para submit de emails
├── types/
│   ├── countdown.ts            # Types para countdown
│   └── api.ts                  # Types para API responses
├── config/
│   └── constants.ts            # Fecha objetivo, URLs, etc.
├── utils/
│   └── format.ts               # Formateo de fechas, validaciones
├── App.tsx                     # Componente raíz
├── main.tsx                    # Entry point
└── index.css                   # Tailwind imports + custom styles

public/
├── albion-logo.png             # Logo del evento (placeholder)
└── og-image.png                # Open Graph image para redes sociales

api/                            # Backend PHP (separado del frontend)
├── emails/
│   └── index.php               # POST /api/emails endpoint
├── config/
│   └── db.php                  # Conexión MySQL
└── .htaccess                   # CORS headers

dist/                           # Build output (gitignored)
└── [archivos estáticos compilados]
```

**Structure Decision**: Opción 2 (Web application) adaptada. Frontend SPA en `src/`, backend PHP en `api/`. La separación es física (carpetas diferentes) y lógica (comunicación via REST JSON). Frontend se despliega en root de Hostinger, backend en `/api/` subfolder.

**Rationale**:
- `components/`: Componentes React reutilizables y específicos de feature
- `services/`: Lógica de negocio y comunicación con API
- `hooks/`: Custom hooks para lógica stateful
- `types/`: TypeScript definitions centralizadas
- `config/`: Configuración estática (fecha objetivo, constantes)
- `utils/`: Funciones helper puras
- `api/`: Backend PHP completamente separado

## Complexity Tracking

> **No violations requiring justification**

All constitution principles are satisfied. Dependency minimalism flags (React Router, Zustand, SWR) will be evaluated in Phase 0 research to determine if simpler alternatives suffice.

---

## Phase 0: Research & Technology Decisions

**Status**: ✅ COMPLETED  
**Document**: [`research.md`](./research.md)

### Key Decisions Made

1. **Countdown Library**: Tempo (timezone support for Bogotá GMT-5)
2. **UI Components**: DaisyUI 5.5.0 (Tailwind-based, zero JS runtime)
3. **State Management**: React hooks only (useState, useContext) - **Zustand REMOVED**
4. **Data Fetching**: Native fetch() - **SWR REMOVED**
5. **Routing**: None needed (single-page landing) - **React Router REMOVED**
6. **Form Validation**: HTML5 + custom regex (no Zod/Yup)
7. **Social Sharing**: Web Share API + fallback links
8. **Analytics**: Google Analytics 4 (script tag only)

### Dependencies Resolution

**Added**:
- ✅ `@formkit/tempo` (date/time with timezone support)

**Removed** (honoring Dependency Minimalism):
- ❌ `react-router` (unnecessary for single-page)
- ❌ `zustand` (React hooks sufficient)
- ❌ `swr` (native fetch sufficient for one API call)

**Final Production Stack**:
- React 19.2.0 + TypeScript 5.9+
- Vite 7.2.2 + Tailwind CSS 4.1.17
- DaisyUI 5.5.0 + Tempo
- **Total production dependencies: 5** (vs original 8)

---

## Phase 1: Design & Data Model

**Status**: ✅ COMPLETED  
**Documents**:
- [`data-model.md`](./data-model.md)
- [`contracts/emails-api.yaml`](./contracts/emails-api.yaml)
- [`quickstart.md`](./quickstart.md)

### Data Model Summary

**Frontend State**:
```typescript
interface CountdownState {
  targetDate: Date
  timeLeft: { days, hours, minutes, seconds } | null
  isExpired: boolean
}

interface EmailFormState {
  email: string
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  order: number
}
```

**Backend Schema** (MySQL):
```sql
CREATE TABLE email_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45) NULL,
  INDEX idx_email (email)
);
```

### API Contract

**Endpoint**: `POST /api/emails`

**Request**:
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Email registrado exitosamente"
}
```

**Error Responses**:
- 400: Invalid email format (`INVALID_EMAIL`)
- 409: Email already exists (`EMAIL_EXISTS`)
- 429: Rate limit exceeded (`RATE_LIMIT_EXCEEDED`)

**OpenAPI Spec**: See [`contracts/emails-api.yaml`](./contracts/emails-api.yaml)

### Setup Instructions

**Quick Start** (5 minutes):
```bash
# Clone and install
git checkout 002-landing-countdown
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with launch date: 2025-11-24T00:00:00-05:00

# Start dev server
pnpm run dev
# → http://localhost:5173
```

**Full Guide**: See [`quickstart.md`](./quickstart.md) for:
- Detailed setup instructions
- Backend PHP configuration
- Troubleshooting common issues
- Deployment to Hostinger

---

## Phase 2: Task Breakdown

**Status**: ⏳ PENDING  
**Generate via**: `/speckit.tasks` command

This phase will break down the implementation into discrete tasks:
- Scaffolding (Vite setup, Tailwind config, folder structure)
- Component implementation (Countdown, EmailForm, CategoriesList, etc.)
- Service layer (API client, countdown logic, validation)
- Styling (DaisyUI integration, custom theme)
- Testing (unit tests, integration tests)
- Deployment (build optimization, Hostinger upload)

**Next Command**: Run `/speckit.tasks` to generate `tasks.md` with prioritized, assignable tasks

---

## Summary & Next Steps

### ✅ Plan Complete - Ready for Task Generation

**What's Done**:
1. ✅ Constitution Check: All gates pass, 3 dependencies removed
2. ✅ Phase 0 Research: Technology decisions documented
3. ✅ Phase 1 Design: Data model, API contracts, quickstart guide created
4. ✅ Dependencies Updated: Tempo added, Router/Zustand/SWR removed
5. ✅ Environment Config: `.env.example` and `.env` created

**Key Decisions**:
- **Countdown**: Tempo library for timezone support (Bogotá GMT-5)
- **UI**: DaisyUI components (zero JS runtime, Tailwind-based)
- **State**: React hooks only (no Zustand needed)
- **Routing**: None (single-page landing, React Router removed)
- **Data Fetching**: Native fetch() (SWR removed)
- **Final Stack**: React 19 + TypeScript 5.9 + Vite 7 + Tailwind 4 + DaisyUI 5 + Tempo

**Production Dependencies Reduced**: 8 → 5 packages (honoring Dependency Minimalism)

### 📋 Next Action Required

Run the following command to generate implementation tasks:

```bash
/speckit.tasks
```

This will create `tasks.md` with:
- Prioritized task list (P0-P3)
- Estimated time per task
- Dependencies between tasks
- Acceptance criteria for each task
- Assignable work items

### 📚 Reference Documents

| Document                                                   | Purpose                 | Status      |
| ---------------------------------------------------------- | ----------------------- | ----------- |
| [`spec.md`](./spec.md)                                     | Feature specification   | ✅ Complete  |
| [`research.md`](./research.md)                             | Technology decisions    | ✅ Complete  |
| [`data-model.md`](./data-model.md)                         | Data entities & schemas | ✅ Complete  |
| [`contracts/emails-api.yaml`](./contracts/emails-api.yaml) | API OpenAPI spec        | ✅ Complete  |
| [`quickstart.md`](./quickstart.md)                         | Setup instructions      | ✅ Complete  |
| [`tasks.md`](./tasks.md)                                   | Task breakdown          | ⏳ Next step |

### 🎯 Timeline Reminder

**Launch Date**: 2025-11-24 00:00:00 GMT-5  
**Days Available**: 13 days from 2025-11-11  
**Priority**: P0-P1 tasks must complete before launch, P2-P3 optional

---

**Plan Version**: 1.0.0  
**Last Updated**: 2025-11-11  
**Prepared By**: GitHub Copilot + Andres  
**Ready for**: Task Generation Phase
