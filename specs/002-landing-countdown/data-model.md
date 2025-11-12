# Data Model: Landing de Pre-Lanzamiento

**Feature**: 002-landing-countdown  
**Date**: 2025-11-11  
**Status**: Completed

## Overview

Este documento define el modelo de datos para la landing page. Dado que es una página estática de pre-lanzamiento, el modelo es minimalista.

---

## Frontend State Model

### 1. Countdown State

**Purpose**: Mantener el estado del contador regresivo

```typescript
interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownState {
  targetDate: Date // 2025-11-24 00:00:00 GMT-5
  timeLeft: TimeLeft | null
  isExpired: boolean
}
```

**Lifecycle**:
- Initialize on component mount
- Update every 1 second via setInterval
- Mark expired when timeLeft reaches zero

---

### 2. Email Form State

**Purpose**: Gestionar el formulario de captura de emails

```typescript
interface EmailFormState {
  email: string
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
}
```

**Validation Rules**:
- Required field
- Valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Max length: 255 characters

**State Transitions**:
```
IDLE → SUBMITTING → SUBMITTED (success)
     ↓
     ERROR → IDLE (retry)
```

---

### 3. Categories State

**Purpose**: Lista de categorías para mostrar en la landing

```typescript
interface Category {
  id: string // "streamer-del-año"
  name: string // "Streamer del Año"
  description: string // "Vota por el mejor streamer..."
  icon: string // "🎮" (emoji)
  order: number
}

type CategoriesState = Category[]
```

**Data Source**: Static JSON array (no API needed)

**Sample Data**:
```json
[
  {
    "id": "streamer-del-año",
    "name": "Streamer del Año",
    "description": "Vota por el mejor streamer de Albion Online",
    "icon": "🎮",
    "order": 1
  },
  {
    "id": "youtuber-del-año",
    "name": "Youtuber del Año",
    "description": "El mejor creador de contenido en YouTube",
    "icon": "🎥",
    "order": 2
  }
  // ... 8 more categories
]
```

---

### 4. UI State

**Purpose**: Gestionar estados de UI (modals, toasts, loading)

```typescript
interface UIState {
  isShareModalOpen: boolean
  toastMessage: string | null
  toastType: 'success' | 'error' | 'info'
}
```

---

## Backend Data Model (API)

### 1. Email Registration

**Table**: `email_registrations` (MySQL)

```sql
CREATE TABLE email_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notification_sent BOOLEAN DEFAULT FALSE,
  notification_sent_at TIMESTAMP NULL,
  ip_address VARCHAR(45) NULL, -- IPv4/IPv6
  user_agent TEXT NULL,
  INDEX idx_email (email),
  INDEX idx_registered_at (registered_at)
);
```

**Constraints**:
- Email must be unique (prevent duplicates)
- IP address stored for spam prevention
- User agent stored for analytics

---

### 2. Launch Configuration

**Table**: `launch_config` (MySQL)

```sql
CREATE TABLE launch_config (
  id INT AUTO_INCREMENT PRIMARY KEY,
  config_key VARCHAR(100) NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Sample Data**:
```sql
INSERT INTO launch_config (config_key, config_value) VALUES
('launch_date', '2025-11-24 00:00:00'),
('timezone', 'America/Bogota'),
('launch_url', 'https://albionawards.com'),
('email_notification_enabled', 'true');
```

**Purpose**: Centralizar configuración sin hardcodear fechas

---

## API Response Models

### 1. Email Submission Response

**Success**:
```json
{
  "success": true,
  "message": "Email registrado exitosamente"
}
```

**Error (Duplicate Email)**:
```json
{
  "success": false,
  "message": "Este email ya está registrado",
  "error_code": "EMAIL_EXISTS"
}
```

**Error (Invalid Email)**:
```json
{
  "success": false,
  "message": "Formato de email inválido",
  "error_code": "INVALID_EMAIL"
}
```

**Error (Rate Limit)**:
```json
{
  "success": false,
  "message": "Demasiadas solicitudes. Intenta más tarde.",
  "error_code": "RATE_LIMIT_EXCEEDED"
}
```

---

## Environment Configuration

**`.env` (Frontend)**:
```bash
# Fecha de lanzamiento (ISO 8601)
VITE_LAUNCH_DATE=2025-11-24T00:00:00-05:00

# Timezone (IANA identifier)
VITE_TIMEZONE=America/Bogota

# API endpoint
VITE_API_BASE_URL=https://albionawards.com/api

# Google Analytics ID
VITE_GA_ID=G-XXXXXXXXXX

# Social media URLs
VITE_TWITTER_URL=https://twitter.com/albionawards
VITE_DISCORD_URL=https://discord.gg/albionawards
```

**`.env` (Backend - PHP)**:
```bash
# Database
DB_HOST=localhost
DB_NAME=albion_awards
DB_USER=albion_user
DB_PASS=secure_password

# Email notification service (future)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@albionawards.com
SMTP_PASS=secure_password

# Rate limiting
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_SECONDS=60
```

---

## Data Flow Diagram

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         │ 1. Load page
         ▼
┌─────────────────────────────┐
│  React App (Vite)           │
│  - Load categories (static) │
│  - Init countdown (Tempo)   │
│  - Render UI (DaisyUI)      │
└────────┬────────────────────┘
         │
         │ 2. User submits email
         ▼
┌─────────────────────────────┐
│  POST /api/emails           │
│  Body: { email: string }    │
└────────┬────────────────────┘
         │
         │ 3. Validate + Save
         ▼
┌─────────────────────────────┐
│  PHP API (Hostinger)        │
│  - Validate email format    │
│  - Check rate limit (IP)    │
│  - Insert to MySQL          │
│  - Return JSON response     │
└────────┬────────────────────┘
         │
         │ 4. Response
         ▼
┌─────────────────────────────┐
│  Update UI State            │
│  - Show success toast       │
│  - Disable form             │
└─────────────────────────────┘
```

---

## Type Definitions Summary

**Frontend Types** (`src/types/`):

```typescript
// src/types/countdown.ts
export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// src/types/category.ts
export interface Category {
  id: string
  name: string
  description: string
  icon: string
  order: number
}

// src/types/api.ts
export interface EmailSubmissionRequest {
  email: string
}

export interface EmailSubmissionResponse {
  success: boolean
  message: string
  error_code?: string
}

// src/types/config.ts
export interface AppConfig {
  launchDate: Date
  timezone: string
  apiBaseUrl: string
  gaId: string
  socialMedia: {
    twitter: string
    discord: string
  }
}
```

---

## Validation Rules

### Email Validation

**Frontend**:
- Required field
- Format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Max length: 255 chars
- Trim whitespace

**Backend**:
- Same regex validation
- Check for duplicate in database
- Check rate limit (5 requests/minute per IP)
- Sanitize input (prevent SQL injection)

---

## Performance Considerations

**State Updates**:
- Countdown updates every 1 second (acceptable frequency)
- Categories loaded once (static data)
- Email form state updates on user input (debounced)

**Persistence**:
- No frontend persistence needed (ephemeral state)
- Backend persists emails to MySQL
- No localStorage/sessionStorage required

---

## Migration Strategy

**Current State**: No existing data

**Initial Setup**:
1. Create database tables (email_registrations, launch_config)
2. Seed launch_config with target date
3. Deploy API endpoint
4. Deploy frontend with env variables

**Rollback Plan**: Drop tables, redeploy with corrections

---

## Next Steps

1. Create TypeScript type definitions in `src/types/`
2. Define API contracts in OpenAPI format
3. Implement data validation logic
4. Create seed data for categories (static JSON)
