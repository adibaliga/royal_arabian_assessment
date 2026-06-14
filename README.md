# Royal Arabian Developer Assessment

Starter repository for the Senior Full-Stack Developer assessment.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity
- **Deployment:** Vercel

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ra-developer-assessment
npm install
```

### 2. Set Up Sanity

1. Create a free Sanity account at [sanity.io](https://www.sanity.io/)
2. Create a new project
3. Copy the schemas from `sanity/schemas/` to your Sanity project
4. Add sample content for China destination and at least 3 packages

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Sanity project details:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── lib/
│   └── sanity.ts           # Sanity client configuration
└── types/
    └── index.ts            # TypeScript types

sanity/
└── schemas/                # Sanity schema references
    ├── destination.ts      # Destination schema
    └── package.ts          # Package schema
```

## Your Task

Build the China destination page at `/cn` that:

1. Pulls content from Sanity CMS
2. Displays destination info (hero, description, highlights)
3. Shows at least 3 travel packages with pricing
4. Is fully responsive
5. Follows the design reference at [royalarabian.com/cn](https://royalarabian.com/cn)

See the assessment document for full requirements and evaluation criteria.

## Brand Colors

Already configured in `tailwind.config.ts`:

- Navy: `#1C355E` → `text-ra-navy`, `bg-ra-navy`
- Orange: `#C46A3B` → `text-ra-orange`, `bg-ra-orange`
- Gold: `#D0AF21` → `text-ra-gold`, `bg-ra-gold`

## Useful Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Import the repo in [Vercel](https://vercel.com/)
3. Add environment variables
4. Deploy

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Good luck! 🚀
