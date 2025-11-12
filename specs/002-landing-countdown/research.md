# Research & Technology Decisions: Landing de Pre-Lanzamiento

**Feature**: 002-landing-countdown  
**Date**: 2025-11-11  
**Status**: Completed

## Overview

This document records all technology decisions, alternatives considered, and rationale for the landing page implementation.

---

## 1. Countdown Library: Tempo

**Decision**: Use **Tempo** for date/time handling and timezone management

**Rationale**:
- Modern, lightweight library for date/time operations
- Excellent timezone support (critical for Bogotá GMT-5)
- Type-safe TypeScript API
- Better than Date/Moment.js for timezone-specific calculations
- Size: ~5KB gzipped (acceptable for dependency minimalism)

**Alternatives Considered**:
- **date-fns-tz**: Popular but larger bundle size (~15KB)
- **Luxon**: Feature-rich but heavier (~25KB), overkill for countdown
- **Native Date + Intl API**: Complex timezone handling, error-prone

**Implementation**:
```typescript
import { Tempo } from '@formkit/tempo'

// Configure for Bogotá timezone
const targetDate = Tempo.parse('2025-11-24 00:00:00', 'YYYY-MM-DD HH:mm:ss', 'America/Bogota')
const now = Tempo.now('America/Bogota')
const diff = targetDate.diff(now, 'seconds')
```

---

## 2. UI Component Library: DaisyUI

**Decision**: Use **DaisyUI 5.5.0** for component styling

**Rationale**:
- Built on Tailwind CSS 4 (already in stack)
- Zero JS runtime (pure CSS components)
- Countdown component available: https://daisyui.com/components/countdown/
- Excellent for rapid prototyping (13-day timeline)
- Semantic HTML + Tailwind utility classes
- Size: ~50KB CSS (acceptable, tree-shakeable)

**Alternatives Considered**:
- **Headless UI**: More flexible but requires more custom styling
- **Radix UI**: Excellent but overkill for simple landing
- **Custom components**: Time-consuming, not justified for temporary landing

**Implementation**:
```tsx
// DaisyUI countdown component
<div className="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div className="flex flex-col">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value": days}}></span>
    </span>
    días
  </div>
  {/* hours, minutes, seconds... */}
</div>
```

---

## 3. State Management: React Hooks Only (No Zustand)

**Decision**: Use **built-in React hooks** (useState, useContext) instead of Zustand

**Rationale**:
- Landing page state is simple: countdown value, email form state, modal state
- No complex global state management needed
- Dependency minimalism: remove unnecessary library
- React hooks sufficient for:
  - Countdown timer state (useState + useEffect)
  - Email form state (useState)
  - Modal/toast state (useState)

**Alternatives Considered**:
- **Zustand**: Excellent but overkill for simple landing page
- **Redux**: Extremely overkill
- **Jotai/Recoil**: Atomic state, but unnecessary complexity

**Implementation**:
```typescript
// Simple countdown hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>()
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Tempo.now('America/Bogota')
      const diff = targetDate.diff(now, ['days', 'hours', 'minutes', 'seconds'])
      setTimeLeft(diff)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [targetDate])
  
  return timeLeft
}
```

**Impact**: Remove Zustand from package.json

---

## 4. Data Fetching: Native Fetch (No SWR)

**Decision**: Use **native fetch API** instead of SWR

**Rationale**:
- Only one API call: POST /api/emails (email submission)
- No need for caching, revalidation, or real-time updates
- Simple error handling sufficient
- Dependency minimalism: remove SWR
- Success/error states managed with useState

**Alternatives Considered**:
- **SWR**: Excellent for complex data fetching, but overkill here
- **React Query**: Similar to SWR, unnecessary complexity
- **Axios**: Adds dependency when fetch() is sufficient

**Implementation**:
```typescript
async function submitEmail(email: string): Promise<{ success: boolean; message: string }> {
  const response = await fetch('/api/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  
  if (!response.ok) {
    throw new Error('Failed to submit email')
  }
  
  return response.json()
}
```

**Impact**: Remove SWR from package.json

---

## 5. Routing: No React Router

**Decision**: **Remove React Router** - not needed for single-page landing

**Rationale**:
- Landing page is truly single-page (no routes)
- All content visible on scroll (countdown, categories, form, footer)
- No navigation between pages
- Dependency minimalism: remove unnecessary library
- Smaller bundle size

**Alternatives Considered**:
- **React Router**: Excellent but unnecessary for single-page
- **Hash routing**: Not needed
- **No router**: Best choice for this use case

**Implementation**:
- Remove React Router from package.json
- Simple App.tsx with all sections stacked vertically
- Smooth scroll via CSS or scroll library if needed

**Impact**: Remove react-router from package.json

---

## 6. Form Validation: HTML5 + Custom Logic

**Decision**: Use **HTML5 validation** + custom email regex

**Rationale**:
- Native browser validation for required fields
- Custom regex for email format validation
- No need for heavy validation libraries (Zod, Yup)
- Inline error messages with state management

**Alternatives Considered**:
- **Zod**: Excellent for complex schemas, overkill for single email field
- **Yup**: Similar to Zod, unnecessary
- **React Hook Form**: Good for complex forms, not needed here

**Implementation**:
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): boolean {
  return emailRegex.test(email)
}
```

---

## 7. Styling Strategy: Tailwind 4 + DaisyUI

**Decision**: **Tailwind CSS 4** with **DaisyUI components**

**Rationale**:
- Tailwind 4 already in project (constitution-approved)
- Utility-first CSS for rapid development
- DaisyUI provides pre-styled components (countdown, buttons, cards)
- No CSS-in-JS runtime overhead (constitution principle)
- Responsive design built-in
- Purge unused CSS in production (small bundle)

**Configuration**:
```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'], // Custom Albion-themed later
  }
}
```

---

## 8. Image Optimization

**Decision**: Use **Vite image optimization** + manual compression

**Rationale**:
- Vite handles static assets automatically
- Manual compression with tools like TinyPNG for logos
- Lazy loading for images below fold (categories section)
- WebP format for modern browsers, PNG fallback

**Implementation**:
```tsx
<img 
  src="/albion-logo.png" 
  alt="Albion Awards"
  loading="lazy"
  width="200"
  height="200"
/>
```

---

## 9. Social Sharing: Web Share API + Fallback

**Decision**: Use **Web Share API** (native) with manual fallback links

**Rationale**:
- Native mobile sharing on supported devices
- Graceful fallback to traditional share links (Twitter, Facebook)
- No external library needed
- Best UX on mobile (opens native share sheet)

**Implementation**:
```typescript
async function shareOnSocial() {
  if (navigator.share) {
    await navigator.share({
      title: 'Albion Awards 2025',
      text: 'Vota por tus streamers favoritos de Albion Online',
      url: window.location.href
    })
  } else {
    // Fallback to manual share links
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`)
  }
}
```

---

## 10. Analytics: Google Analytics 4 (Basic)

**Decision**: **Google Analytics 4** (script tag only, no library)

**Rationale**:
- Simple script tag in index.html
- No additional dependencies
- Track: page views, email submissions, social shares
- Sufficient for pre-launch landing metrics

**Implementation**:
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Summary of Dependency Changes

**Added**:
- ✅ `@formkit/tempo` - Date/time with timezone support

**Removed** (from package.json):
- ❌ `react-router` - Not needed for single-page
- ❌ `zustand` - React hooks sufficient
- ❌ `swr` - Native fetch sufficient

**Final Production Dependencies**:
```json
{
  "dependencies": {
    "@formkit/tempo": "^0.1.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "daisyui": "^5.5.0",
    "@vitejs/plugin-react": "^5.1.0",
    "typescript": "~5.9.3",
    "vite": "^7.2.2"
  }
}
```

**Justification**: Reduces bundle size, aligns with dependency minimalism, maintains functionality

---

## Open Questions Resolved

1. ✅ **React Router needed?** → No, single-page landing
2. ✅ **Zustand needed?** → No, React hooks sufficient
3. ✅ **SWR needed?** → No, single POST request with fetch()
4. ✅ **Countdown library?** → Tempo (timezone support)
5. ✅ **UI components?** → DaisyUI (Tailwind-based, zero JS)

---

## Next Steps

1. Update package.json with final dependencies
2. Install `@formkit/tempo`
3. Remove `react-router`, `zustand`, `swr`
4. Configure DaisyUI in tailwind.config
5. Proceed to Phase 1: Data Model & API Contracts
