# Royal Arabian — China Destination Page

CMS-driven China destination page built with Next.js 14. Content comes from Sanity — nothing is hardcoded.

## Tech Stack

- Next.js 14 (App Router), TypeScript (strict), Tailwind CSS 3.4
- Sanity for content, Supabase for enquiry submissions
- Deployed on Vercel

## Quick Start

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your Sanity project ID (e.g., `2dsie515`) and dataset. If you want enquiries to work, add Supabase credentials too.

```bash
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/cn`.

### Seed Sanity Content

If you're starting fresh, create an API token at sanity.io/manage (Editor role), add `SANITY_API_TOKEN` to `.env.local`, then:

```bash
npm run seed
```

This uploads images from Unsplash and creates a China destination with 3 packages.

## Routes

| Route | What it does |
|---|---|
| `/` | Redirects to `/cn` |
| `/cn` | Destination page — hero, description, highlights, packages, good-to-know |
| `/cn/packages/[slug]` | Package detail — hero, pricing, inclusions, itinerary timeline |

All pages are statically generated at build time.

## Project Structure

```
src/
  app/
    layout.tsx          # Header + Footer + EnquiryProvider wrapper
    page.tsx            # Redirects to /cn
    cn/
      page.tsx          # China destination page
      packages/[slug]/
        page.tsx        # Package detail page
    api/enquire/
      route.ts          # POST endpoint -> Supabase
  components/
    Header.tsx          # Fixed nav, scroll effect, mobile hamburger
    Footer.tsx          # Dark footer with links and contact
    AnimatedSection.tsx # Scroll-reveal wrapper (IntersectionObserver)
    EnquiryProvider.tsx # Context provider for enquiry modal
    EnquiryForm.tsx     # Modal form, submits to /api/enquire
    EnquireButton.tsx   # Button that triggers the modal
    sections/
      HeroSection.tsx
      DestinationIntro.tsx
      PackagesSection.tsx
      GoodToKnowSection.tsx
  lib/
    sanity.ts           # Lazy Sanity client, urlFor helper
    queries.ts          # GROQ query functions
    supabase.ts         # Lazy Supabase client
  types/
    index.ts            # Destination, Package, etc.
sanity/schemas/         # Schema definitions (reference copies)
scripts/seed.mjs        # Sanity content seeder
```

## Design Decisions

- **Lazy clients.** Both Sanity and Supabase clients are created lazily so the app builds even without env vars configured. You get a fallback UI instead of a crash.
- **Combined GROQ query.** The `/cn` page fetches destination + packages in one request.
- **Zero-JS accordion.** The "Good to Know" section uses `<details>`/`<summary>` — works without JavaScript.
- **Server Components for data.** All data fetching happens in Server Components. Only the header (scroll listener, mobile menu) and enquiry modal need client JS.
- **AnimatedSection is thin.** It's a tiny client wrapper around IntersectionObserver. Sections stay as Server Components.

## Scripts

```bash
npm run dev           # dev server
npm run build         # production build
npm run lint          # ESLint
npm run seed          # seed Sanity with sample content
npm test              # Jest (11 tests)
npm run test:e2e      # Playwright (13 tests)
```

## Sanity CMS

**Project ID:** `2dsie515`  
**Dataset:** `production`

The destination and package schemas are in [`sanity/schemas/`](./sanity/schemas/). You can view the content structure at [sanity.io/manage](https://www.sanity.io/manage) under the `2dsie515` project.
