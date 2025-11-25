# BreatheX

AI-powered fitness and wellness platform built on Next.js App Router with Convex and Clerk. The site mixes a marketing-grade landing experience with a dynamic program library, admin CMS for plans, and student-facing day-by-day workouts.

## Highlights
- Next.js 15 (App Router) + Tailwind CSS for the marketing site, hero carousel, testimonials, product cards, and blog/CTA sections.
- Authentication via Clerk with Convex auth integration and a webhook to sync Clerk users into Convex.
- Program catalog per lifestyle (`students`, `housewives`, `professionals`) with Convex-backed plan data, outlines, and day-level detail pages.
- Admin-only CMS to create plans, publish/unpublish, edit meta, generate weekly outlines, and author day blocks (warmup/main/finisher/pranayama/cooldown).
- Student experience for viewing plan overviews and drilling into week/day workouts with collapsible blocks and exercise tables.
- AI generate page scaffold (`/generate`) ready to plug into Vapi or ElevenLabs AI flows.

## Tech Stack
- Framework: Next.js 15 (App Router), TypeScript, Turbopack dev server
- Styling: Tailwind CSS 4
- Auth: Clerk (`@clerk/nextjs`)
- Backend/DB: Convex (plans, outlines, day content, users)
- UI/Animation: GSAP, Lucide Icons, custom components

## Project Structure (key paths)
- `src/app` — App Router routes (`/`, `/programs`, `/generate`, `/shop`, `/sign-in`, `/sign-up`, `/admin`, etc.)
- `src/app/programs/*` — Category pages and student plan/day views powered by Convex queries.
- `src/app/admin` — Admin dashboard, plan meta/outlines/day editors (role-gated via Convex/Clerk).
- `src/components` — Marketing sections, navbar/footer, program UI (plan headers, week grids, day blocks).
- `src/providers/ConvexClerkProvider.tsx` — Bridges Clerk auth with Convex React client.
- `convex/*` — Convex schema, functions for plans/admin/users, Clerk webhook handler.

## Getting Started
1) Install dependencies  
```bash
npm install
```

2) Environment variables  
Create `.env.local` in the project root:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CONVEX_URL=https://<your-convex>.convex.cloud
CLERK_WEBHOOK_SECRET=whsec_...           # for Convex HTTP webhook
```

3) Run Convex locally (required for plan/admin data)  
```bash
npx convex dev
```
Leave this running in a terminal; it starts the Convex dev server.

4) Run the Next.js dev server  
```bash
npm run dev
```
Open http://localhost:3000.

## Data + Admin Workflow
- Seed demo student plans and outlines (optional)  
  ```bash
  npx convex run plans:seedStudents
  npx convex run plans:seedStudentsOutlines
  npx convex run plans:seedStudentsDays
  ```
- Sync users from Clerk: configured via the Convex HTTP endpoint `/clerk-webhook` using `CLERK_WEBHOOK_SECRET`.
- Make yourself admin: sign in via Clerk, then run `users:makeMeAdmin` from the Convex dashboard or CLI with identity. Admin routes are guarded server-side via `requireAdmin`.
- Admin dashboard (`/admin`): create plans, edit meta (title/slug/category/access tier/timings), generate outlines (weeks/days scaffold), and author day blocks with duplication helpers.

## Notable Routes
- `/` — Marketing landing (hero carousel, AI section, products, testimonials, community, blogs, marquee, footer).
- `/programs` — Category chooser + fitness pillars and disclaimer.
- `/programs/students` — Lists Convex-backed student plans; links into plan overview + day detail (`/programs/students/plans/[slug]/week/[w]/day/[d]`).
- `/programs/housewives`, `/programs/professionals` — Category experiences with sample plans/generators.
- `/admin` — Admin CMS (auth + role required).
- `/generate` — Visual shell for the upcoming GenX AI flow.
- `/sign-in`, `/sign-up` — Clerk hosted components.

## Scripts
- `npm run dev` — Next.js dev with Turbopack
- `npm run build` — Production build
- `npm start` — Start production server
- `npm run lint` — ESLint

## Deployment Notes
- Provision Convex (prod URL) and Clerk (publishable + secret keys) in your hosting environment.
- Configure the Clerk → Convex webhook to point to `/clerk-webhook` on your Convex deployment and set `CLERK_WEBHOOK_SECRET` there.
- If you need plan indexing by published status, uncomment/add the index in `convex/schema/programs.ts` and redeploy Convex.
