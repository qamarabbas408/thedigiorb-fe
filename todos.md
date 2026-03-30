# FE Migration Plan - Next.js to Laravel API

## Overview
Migrate the Next.js frontend from internal API routes to Laravel backend API (`http://localhost:8000/api/v1/*`), using **Axios + TanStack Query** for network requests.

---

## Phase 1: Remove Legacy Code ✅

### Completed
- [x] Delete `src/app/api/` - All API routes
- [x] Delete `src/app/admin/` - Admin panel
- [x] Delete `src/lib/*.sql` - All SQL files (13 files)
- [x] Delete `src/lib/db.ts` - Database connection

---

## Phase 2: Setup TanStack Query + Axios ✅

### 2.1 Install Dependencies
- [x] Install `@tanstack/react-query`
- [x] Install `axios`

### 2.2 Create API Client
- [x] `src/lib/api/client.ts` - Axios instance with base URL
- [x] `src/lib/api/types.ts` - TypeScript interfaces
- [x] `src/lib/api/ApiConstants.ts` - API constants and endpoints

### 2.3 Create Query Client Provider
- [x] `src/components/providers/QueryProvider.tsx` - React Query provider
- [x] Update `src/app/layout.tsx` to wrap with QueryProvider

### 2.4 Create API Service Layer
- [x] `src/lib/api/services/projects.ts` - Portfolio projects API
- [x] `src/lib/api/services/categories.ts` - Portfolio categories API
- [x] `src/lib/api/services/services.ts` - Services API
- [x] `src/lib/api/services/stats.ts` - Stats API
- [x] `src/lib/api/services/team.ts` - Team API
- [x] `src/lib/api/services/testimonials.ts` - Testimonials API
- [x] `src/lib/api/services/contacts.ts` - Contacts API
- [x] `src/lib/api/services/settings.ts` - Settings API

### 2.5 Create Custom Hooks
- [x] `src/hooks/useProjects.ts`
- [x] `src/hooks/useCategories.ts`
- [x] `src/hooks/useServices.ts`
- [x] `src/hooks/useStats.ts`
- [x] `src/hooks/useTeam.ts`
- [x] `src/hooks/useTestimonials.ts`
- [x] `src/hooks/useContacts.ts`
- [x] `src/hooks/useSettings.ts`

---

## Phase 3: Update Components ✅

### 3.1 Update Contexts
- [x] `src/context/SettingsContext.tsx` - Updated to use TanStack Query hook

### 3.2 Update Public Website Components
- [x] `src/components/Header.tsx` - Uses settings context
- [x] `src/components/Footer.tsx` - Uses settings context
- [x] `src/components/Favicon.tsx` - Uses settings context
- [x] `src/components/sections/Hero.tsx` - Fetch stats via TanStack Query
- [x] `src/components/sections/About.tsx` - Fetch stats via TanStack Query
- [x] `src/components/sections/Services.tsx` - Fetch services via TanStack Query
- [x] `src/components/sections/Portfolio.tsx` - Fetch projects/categories via TanStack Query
- [x] `src/components/sections/Team.tsx` - Fetch team via TanStack Query
- [x] `src/components/sections/Testimonials.tsx` - Fetch testimonials via TanStack Query
- [x] `src/components/sections/Contact.tsx` - Submit contact form via TanStack Query
- [x] `src/components/sections/WhyUs.tsx` - Fetch stats via TanStack Query

### 3.3 TypeScript Fixes
- [x] Fixed nullable settings references across components
- [x] Added social links to TeamMember interface

### 3.4 API Path Updates
- [x] Updated projects API: `/portfolio/projects`
- [x] Updated categories API: `/portfolio/categories`

---

## Phase 4: SEO (Pending)

### 4.1 Update SEO Files
- [ ] Update `robots.ts` to point to Laravel routes
- [ ] Update `sitemap.ts` to point to Laravel routes (fetch from API)

---

## API Endpoints Reference (Laravel)

| Entity | Endpoint |
|--------|----------|
| Projects | `/api/v1/portfolio/projects` |
| Categories | `/api/v1/portfolio/categories` |
| Services | `/api/v1/services` |
| Stats | `/api/v1/stats` |
| Team | `/api/v1/team` |
| Testimonials | `/api/v1/testimonials` |
| Contacts | `/api/v1/contacts` |
| Settings | `/api/v1/settings` |
| Upload | `/api/v1/upload` |

---

## Current Status
- Phase 1: ✅ Complete
- Phase 2: ✅ Complete
- Phase 3: ✅ Complete
- Phase 4: ⬜ Pending (SEO files)
