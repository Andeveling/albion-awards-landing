<!-- Sync Impact Report (v1.0.0 - Initial)
     - NEW CONSTITUTION: Static SPA architecture with PHP backend integration
     - Principles: 5 core + 2 foundational
     - Architecture Decision: 100% static frontend (React+Vite), PHP backend (REST API)
     - Deployment: Hostinger static hosting compatible
     - Templates requiring review: plan-template.md, spec-template.md, tasks-template.md
-->

# Albion Awards Constitution

## Core Principles

### I. Static-First (100% Client-Side SPA)

**NON-NEGOTIABLE**: This application MUST be a fully static Single Page Application.
- Frontend build MUST produce pure HTML/CSS/JavaScript (no SSR, no Node.js runtime).
- Zero server-side rendering logic in the frontend layer.
- All routing and state management MUST occur in the browser (React SPA model).
- Build output: Deploy `dist/` folder directly to Hostinger static hosting.
- Rationale: Hostinger basic plans do not support Node.js or SSR frameworks; static files ensure maximum compatibility, speed, and cost-efficiency.

### II. Dependency Minimalism

**Principle**: Every added dependency MUST justify its necessity via measurable value.
- Audit imports monthly; remove unused packages.
- Prefer native browser APIs (fetch, DOM, etc.) over polyfills.
- Only add libraries for clear feature gaps (e.g., React, TypeScript, Vite are non-negotiable; others require justification).
- Production dependencies locked to latest stable versions; dev dependencies pinned by patch.
- Goal: Keep `package.json` as lean as possible without compromising maintainability.

### III. Backend Decoupling via REST API

**Rule**: Backend (PHP) and frontend (React SPA) communicate EXCLUSIVELY through RESTful JSON APIs.
- All data operations: POST/GET/PUT/DELETE calls to `/api/*` endpoints.
- No embedded PHP logic in HTML templates (SSR forbidden).
- Frontend fetches data via `fetch()` AJAX; transforms and renders in React.
- Backend processes requests independently, returns JSON responses (no HTML views).
- Cross-origin requests: CORS headers configured on PHP backend.
- Rationale: Ensures clean separation; backend remains portable (can migrate away from Hostinger); frontend remains re-deployable without backend changes.

### IV. Hostinger Compatibility Constraints

**Critical**: Every architectural decision MUST respect Hostinger static + PHP environment.
- Forbidden: Node.js APIs, server-side secrets in build output, dynamic route rewriting via `.htaccess` for SPA.
- Allowed: Static files (HTML/JS/CSS), PHP files in `/api` subfolder, environment variables in PHP `.env` files only.
- SPA routing: Configure Vite to output a single-fallback `index.html` for 404 handling OR use PHP `.htaccess` rewrite to serve `index.html` for unmatched routes.
- Build step: `npm run build` produces zero Node.js artifacts in `dist/`.

### V. Type Safety and Testing

**Standard**: TypeScript REQUIRED for all frontend code; unit tests for API client logic mandatory.
- All components and utilities: `.tsx` / `.ts` files with strict type checking.
- React component tests: Validate props, state changes, AJAX mocking.
- API integration tests: Mock PHP endpoints; verify request/response contracts.
- No untyped `any` usage without explicit `@ts-ignore` + comment justifying exception.

## Technology Stack

**Frontend (SPA)**:
- Framework: React 19+ (latest stable)
- Language: TypeScript 5.9+
- Build Tool: Vite 7+
- Styling: CSS Modules or inline styles (no CSS-in-JS runtime bloat)
- HTTP Client: Fetch API (native, zero dependencies)

**Backend (API)**:
- Runtime: PHP 8.0+ (Hostinger standard)
- API Pattern: RESTful JSON
- Database: (TBD - likely managed via Hostinger cPanel)
- Environment: Hostinger shared hosting environment

**Shared Contract**:
- API Schema: Documented in `/api/openapi.yaml` (or equivalent)
- Request/Response: JSON only; no form-encoded data unless explicitly needed
- Error Handling: Standard HTTP status codes + JSON error objects

## Development Workflow

**Build & Deployment**:
1. Frontend: `npm run build` produces static `dist/` folder (max ~5MB for Hostinger free tier limits).
2. Backend: PHP files in `src/api/` are uploaded to Hostinger `/api/` folder via FTP/SFTP.
3. Frontend Deployment: Upload `dist/` contents to Hostinger root folder; configure `.htaccess` to rewrite `404` → `index.html`.
4. Testing: Run unit/integration tests locally before push; GitHub CI validates build success.
5. Versioning: All code tagged by feature branch; releases tagged `v*.*.*` (semantic versioning).

**Local Development**:
- Frontend dev server: `npm run dev` (Vite HMR on localhost:5173)
- Backend dev server: Local PHP server or Hostinger staging environment
- Proxy in `vite.config.ts`: Map `/api/*` requests to local PHP server for testing

## Governance

**Constitution Authority**: This constitution supersedes all other practices and is the source of truth for architectural decisions.

**Amendment Process**:
- Major changes (principle removals/redefinitions): Require written consensus from all active contributors.
- Minor changes (new principles, constraints added): Documented in a PR with rationale; approved by at least one senior contributor.
- Patch changes (wording, clarifications): Can be merged with a single approval.

**Compliance Review**:
- Every PR MUST verify adherence to principles I–V above.
- Pre-commit checklist: `npm run build` succeeds, `npm run lint` passes, no new dependencies added without justification.
- Quarterly audit: Review package.json, bundle size, and architectural drift.

**Integration with Development**:
- Use `README.md` for runtime setup instructions and troubleshooting.
- Use `.specify/templates/plan-template.md` for feature planning (ensure no SSR, no Node.js dependencies planned).
- Use `.specify/templates/spec-template.md` for API contract documentation.
- Use `.specify/templates/tasks-template.md` for categorizing tasks as Frontend / Backend / Integration.

**Version**: 1.0.0 | **Ratified**: 2025-11-11 | **Last Amended**: 2025-11-11
