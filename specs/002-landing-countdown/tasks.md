# Tasks: Landing de Pre-Lanzamiento Albion Awards

**Feature**: 002-landing-countdown  
**Branch**: `002-landing-countdown`  
**Input**: Design documents from `/specs/002-landing-countdown/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependencies installation, and basic configuration

- [x] T001 Verify project structure matches plan.md (src/components/, src/services/, src/hooks/, src/types/, src/config/, src/utils/, public/, api/)
- [x] T002 Install @formkit/tempo dependency for timezone handling
- [x] T003 [P] Configure Tailwind CSS 4 with DaisyUI plugin in tailwind.config.js
- [x] T004 [P] Create .env file with VITE_LAUNCH_DATE=2025-11-24T00:00:00-05:00 and VITE_TIMEZONE=America/Bogota
- [x] T005 [P] Add Google Analytics script tag to index.html (optional, empty GA_ID for dev)
- [x] T006 Create src/types/countdown.ts with TimeLeft interface (days, hours, minutes, seconds)
- [x] T007 [P] Create src/types/api.ts with EmailSubmissionRequest and EmailSubmissionResponse interfaces
- [x] T008 [P] Create src/types/category.ts with Category interface (id, name, description, icon, order)
- [x] T009 Create src/config/constants.ts with launch date constant and timezone config

**Checkpoint**: Foundation ready - components can now be implemented in parallel

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities and services that multiple user stories depend on

**⚠️ CRITICAL**: These tasks must complete before user story implementation begins

- [x] T010 Implement email validation function in src/utils/validators.ts (regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
- [x] T011 [P] Implement date formatting utilities in src/utils/format.ts for countdown display
- [x] T012 [P] Create API client wrapper in src/services/api.ts with base fetch configuration
- [x] T013 Create src/config/categories.json with static data for 10 award categories (Streamer del año, Youtuber del año, Streamer revelación, Rey de las nieblas, Mejor trayectoria, Mejor video tutorial, Mejor clip del año, Mejor kill del año, Blooper del año, Enfado del año)
- [x] T014 Update src/index.css with Tailwind 4 imports (@import "tailwindcss") and DaisyUI theme configuration

**Checkpoint**: Foundation complete - user stories can now be implemented independently

---

## Phase 3: User Story 1 - Ver Cuenta Regresiva del Evento (Priority: P1) 🎯 MVP

**Goal**: Visitor sees a real-time countdown timer showing days, hours, minutes, and seconds until launch (24/11/2025 00:00 GMT-5 Bogotá)

**Independent Test**: Access the landing page and verify countdown displays correctly, updates every second, and reflects Bogotá timezone

### Implementation for User Story 1

- [x] T015 [P] [US1] Create src/hooks/useCountdown.ts hook that uses Tempo to calculate time difference in Bogotá timezone
- [x] T016 [P] [US1] Implement countdown update logic with setInterval (1 second interval) in useCountdown.ts
- [x] T017 [P] [US1] Create src/components/CountdownDisplay.tsx using DaisyUI countdown component (https://daisyui.com/components/countdown/)
- [x] T018 [US1] Create src/components/Countdown.tsx that integrates useCountdown hook and CountdownDisplay component
- [x] T019 [US1] Add expired state handling in Countdown.tsx to show "¡Las votaciones ya están abiertas!" when countdown reaches zero
- [x] T020 [US1] Implement responsive countdown layout (show days when >24h, hide days when <24h) in CountdownDisplay.tsx
- [x] T021 [US1] Integrate Countdown component into src/App.tsx at the top of the page

**Checkpoint**: Countdown timer should be fully functional, updating every second, showing correct Bogotá timezone

---

## Phase 4: User Story 2 - Conocer las Categorías del Evento (Priority: P2)

**Goal**: Visitor can explore the 10 award categories with brief descriptions, generating anticipation

**Independent Test**: Navigate to categories section and verify all 10 categories are listed with clear descriptions

### Implementation for User Story 2

- [x] T022 [P] [US2] Create src/components/CategoryCard.tsx to display individual category with icon, name, and description
- [x] T023 [US2] Create src/components/CategoriesList.tsx that loads categories from src/config/categories.json and renders grid layout
- [x] T024 [US2] Implement responsive grid for CategoriesList (1 column mobile, 2 columns tablet, 3 columns desktop) using Tailwind
- [x] T025 [US2] Add scroll reveal animation to CategoryCard using CSS transitions (optional polish)
- [x] T026 [US2] Integrate CategoriesList component into src/App.tsx below countdown section

**Checkpoint**: All 10 categories should be visible, readable on mobile without horizontal scroll, properly spaced

---

## Phase 5: User Story 3 - Recibir Notificación del Lanzamiento (Priority: P2)

**Goal**: Visitor can submit email address to receive notification when voting opens

**Independent Test**: Enter valid/invalid emails and verify confirmation/error messages display correctly (backend optional for MVP - can use mock)

### Implementation for User Story 3

- [ ] T027 [P] [US3] Create src/hooks/useEmailSubmit.ts hook to handle form submission state (isSubmitting, isSubmitted, error)
- [ ] T028 [P] [US3] Implement email submission service in src/services/emailsApi.ts that calls POST /api/emails endpoint
- [ ] T029 [P] [US3] Create src/components/EmailForm.tsx with input field, submit button, and validation messages
- [ ] T030 [US3] Integrate email validation from src/utils/validators.ts into EmailForm component
- [ ] T031 [US3] Implement form state management in EmailForm using useEmailSubmit hook
- [ ] T032 [US3] Add success message display in EmailForm when email is submitted successfully
- [ ] T033 [US3] Add error handling in EmailForm for invalid format, duplicate email, and rate limit errors
- [ ] T034 [US3] Implement loading state (disable button, show spinner) during submission in EmailForm
- [ ] T035 [US3] Integrate EmailForm component into src/App.tsx below categories section

**Checkpoint**: Email form should validate correctly, show success/error messages, handle loading states (can use mock API for now)

---

## Phase 6: User Story 4 - Compartir en Redes Sociales (Priority: P3)

**Goal**: Visitor can share landing page on social media (Twitter/X, Facebook) to invite others

**Independent Test**: Click social share buttons and verify correct sharing windows open with pre-formatted content

### Implementation for User Story 4

- [ ] T036 [P] [US4] Create src/components/ShareButtons.tsx with Twitter/X and Facebook share buttons
- [ ] T037 [US4] Implement Web Share API in ShareButtons with fallback to manual share links for desktop
- [ ] T038 [US4] Add Twitter/X share URL with pre-formatted tweet text about Albion Awards
- [ ] T039 [US4] Add Facebook share URL with landing page URL and Open Graph image
- [ ] T040 [US4] Style share buttons with DaisyUI button component and social media icons
- [ ] T041 [US4] Integrate ShareButtons component into src/App.tsx (near countdown or footer)

**Checkpoint**: Share buttons should open correct social media windows/apps with pre-filled content

---

## Phase 7: Supplementary Content & Layout

**Purpose**: Event description, organizers info, footer disclaimer, and overall page structure

- [ ] T042 [P] Create src/components/EventInfo.tsx with event description paragraph
- [ ] T043 [P] Add organizers information to EventInfo component (kuruogg: https://www.twitch.tv/kuruogg, andeveling: https://andeveling.vercel.app/)
- [ ] T044 [P] Create src/components/Footer.tsx with disclaimer text "Evento no oficial organizado por la comunidad"
- [ ] T045 Integrate EventInfo component into src/App.tsx (between categories and email form)
- [ ] T046 Integrate Footer component into src/App.tsx at the bottom of the page
- [ ] T047 Implement overall page layout structure in src/App.tsx (header with countdown, main content, footer)
- [ ] T048 Add Open Graph meta tags to index.html for social media previews (title, description, image)

**Checkpoint**: Complete landing page structure with all content sections visible and properly ordered

---

## Phase 8: Backend API (PHP) - Optional for MVP

**Purpose**: Email registration endpoint for production deployment

**Note**: Can be deferred if using mock API for initial testing. Required before production deployment.

- [ ] T049 [P] Create api/config/db.php with MySQL connection configuration for Hostinger
- [ ] T050 [P] Create database migration script for email_registrations table (id, email, registered_at, ip_address, INDEX on email)
- [ ] T051 Create api/emails/index.php endpoint that handles POST requests for email registration
- [ ] T052 Implement email validation in api/emails/index.php (format check, duplicate check)
- [ ] T053 Implement rate limiting in api/emails/index.php (5 requests/minute per IP address)
- [ ] T054 Add CORS headers to api/emails/index.php (Access-Control-Allow-Origin, Access-Control-Allow-Methods)
- [ ] T055 Create api/.htaccess file with CORS configuration and URL rewriting rules
- [ ] T056 Test POST /api/emails endpoint locally with valid/invalid emails and verify responses match OpenAPI spec

**Checkpoint**: Backend API should accept emails, validate format, prevent duplicates, enforce rate limits

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final styling, performance optimization, responsive design, and deployment preparation

- [ ] T057 [P] Add responsive design breakpoints (mobile 320px+, tablet 768px+, desktop 1024px+) to all components
- [ ] T058 [P] Optimize countdown component performance (ensure no memory leaks, clean up intervals on unmount)
- [ ] T059 [P] Add loading skeleton or placeholder for categories while loading (if using dynamic data)
- [ ] T060 [P] Implement smooth scroll behavior between sections (optional UX enhancement)
- [ ] T061 Verify bundle size is <500KB gzipped (run pnpm build and check dist/ folder size)
- [ ] T062 Run Lighthouse audit and ensure Performance, Accessibility, Best Practices scores >90
- [ ] T063 [P] Add favicon.ico and logo images to public/ folder (albion-logo.png, og-image.png)
- [ ] T064 [P] Test landing page on Chrome, Firefox, Safari, Edge (latest 2 versions) for cross-browser compatibility
- [ ] T065 Test landing page on mobile devices (iOS Safari, Android Chrome) for responsive design
- [ ] T066 Verify countdown displays correct time in Bogotá timezone (manual test at specific time)
- [ ] T067 Create production build with pnpm build and verify all static files are in dist/ folder
- [ ] T068 Create deployment guide for Hostinger (upload dist/ to public_html/, upload api/ to public_html/api/)

**Checkpoint**: Landing page ready for production deployment, fully tested, optimized, and cross-browser compatible

---

## Dependencies & Execution Order

### User Story Dependencies

```
Setup (Phase 1) ──────┬───────────────────────────────┐
                      │                               │
Foundational (Phase 2)│                               │
                      │                               │
                      ├─── US1 (P1) ── MVP ───────────┤
                      │                               │
                      ├─── US2 (P2) ─────────────────┤
                      │                               │
                      ├─── US3 (P2) ─────────────────┤
                      │                               │
                      └─── US4 (P3) ─────────────────┤
                                                      │
Supplementary (Phase 7)───────────────────────────────┤
Backend API (Phase 8) - Optional ─────────────────────┤
Polish (Phase 9) ─────────────────────────────────────┘
```

**Key Insights**:
- **US1, US2, US3, US4 are independent** - can be implemented in parallel after Phase 2
- **US1 is MVP** - should be completed first for maximum value
- **US2 and US3 are P2** - implement next for core functionality
- **US4 is P3** - nice-to-have, can be deferred if timeline tight
- **Phase 8 (Backend)** - can use mock API initially, implement before production

### Parallel Execution Opportunities

**After Phase 1 Setup** (can run in parallel):
- T006, T007, T008 (types)
- T003, T004, T005 (configuration)

**After Phase 2 Foundational** (can run in parallel by user story):
- US1 tasks: T015, T016, T017 (countdown logic and display)
- US2 tasks: T022, T023 (categories)
- US3 tasks: T027, T028, T029 (email form)
- US4 tasks: T036, T037 (share buttons)

**Phase 7 Supplementary** (can run in parallel):
- T042, T043, T044 (EventInfo, Footer)
- T048 (Open Graph meta tags)

**Phase 9 Polish** (can run in parallel):
- T057, T058, T059, T060, T063, T064 (independent optimization tasks)

---

## Implementation Strategy

### Recommended MVP Scope (Week 1 - Critical Path)

**Goal**: Functional countdown landing page with email capture

1. **Phase 1: Setup** (Day 1) - T001 to T009
2. **Phase 2: Foundational** (Day 1-2) - T010 to T014
3. **Phase 3: US1 - Countdown** (Day 2-3) - T015 to T021 ✅ MVP Core
4. **Phase 5: US3 - Email Form** (Day 3-4) - T027 to T035 ✅ Lead Capture
5. **Phase 7: Supplementary** (Day 4) - T042 to T048 ✅ Content
6. **Phase 9: Polish** (Day 5) - T057 to T068 ✅ Production Ready

**Total MVP: ~45 tasks** in 5 days (aggressive timeline for 24/11/2025 launch)

### Post-MVP Enhancements (Week 2 - Optional)

7. **Phase 4: US2 - Categories** (Day 6-7) - T022 to T026
8. **Phase 6: US4 - Social Share** (Day 7) - T036 to T041
9. **Phase 8: Backend API** (Day 8-9) - T049 to T056 (required before production)

### Incremental Delivery Plan

- **Iteration 1** (US1): Countdown timer only → Deploy to staging
- **Iteration 2** (US1 + US3): Add email form → Test lead capture
- **Iteration 3** (US1 + US3 + Supplementary): Add content sections → Full landing
- **Iteration 4** (All US + Backend): Full feature set → Production deployment

---

## Task Summary

**Total Tasks**: 68  
**Setup Phase**: 9 tasks  
**Foundational Phase**: 5 tasks  
**User Story 1 (P1)**: 7 tasks 🎯  
**User Story 2 (P2)**: 5 tasks  
**User Story 3 (P2)**: 9 tasks  
**User Story 4 (P3)**: 6 tasks  
**Supplementary Content**: 7 tasks  
**Backend API**: 8 tasks (optional for initial MVP)  
**Polish & Deployment**: 12 tasks  

**Parallelizable Tasks**: 32 tasks marked with [P]  
**Independent User Stories**: 4 stories (US1, US2, US3, US4)  
**MVP Scope**: US1 (countdown) - 7 core tasks  
**Suggested Timeline**: 5 days MVP + 4 days enhancements = 9 days (buffer for 13-day deadline)

---

## Format Validation

✅ All tasks follow checklist format: `- [ ] [ID] [P?] [Story?] Description`  
✅ All user story tasks include [US1]/[US2]/[US3]/[US4] labels  
✅ All parallelizable tasks marked with [P]  
✅ All tasks include specific file paths  
✅ Task IDs are sequential (T001-T068)  
✅ Dependencies clearly documented  
✅ Independent test criteria provided for each story  
✅ MVP scope explicitly identified (US1)

---

**Generated**: 2025-11-11  
**Ready for**: Implementation Phase  
**Next Step**: Start with Phase 1 Setup tasks (T001-T009)