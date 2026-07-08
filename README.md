# Lavender Real Estate — Abu Dhabi

Premium single-page homepage for [Lavender Real Estate](https://lavenderuae.com), built with Next.js 14, TypeScript, Tailwind CSS, GSAP, and Lenis smooth scroll.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** + **Tailwind CSS**
- **GSAP** + ScrollTrigger (scroll animations)
- **Lenis** (smooth scroll)
- **React Hook Form** + **Zod** (inquiry form)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_PABBLY_WEBHOOK_URL` | Yes (for form) | Pabbly webhook URL for inquiry form submissions |

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variable:
   - `NEXT_PUBLIC_PABBLY_WEBHOOK_URL` = your Pabbly webhook URL
5. Deploy

No extra build configuration needed — `npm run build` works out of the box.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Project Structure

```
app/              # Next.js App Router (layout, page, globals)
components/
  ui/             # GoldButton, PropertyCard, LocationCard, etc.
  layout/         # Navbar, Footer, SmoothScroll, CustomCursor
  sections/       # Hero, Buying, Locations, Form, etc.
hooks/            # useScrollAnimation
lib/              # data, schemas, utils, scrollReveal
public/images/    # Static assets (hero background)
```
