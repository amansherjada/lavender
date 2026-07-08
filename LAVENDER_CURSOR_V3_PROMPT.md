# Lavender Real Estate — Homepage Build Prompt

You are building a brand new, premium real estate homepage for **Lavender Real Estate**, a luxury property agency based in Abu Dhabi, UAE.

This is a fresh Next.js 14 project. There are no existing files to reference or delete. Build everything from scratch following the specs below precisely.

---

## What We Are Building

A single-page homepage for lavenderuae.com. The design should feel like a **luxury property magazine** — think editorial typography, generous whitespace, warm tones, and quiet confidence. The reference site for layout inspiration is buildingblocks-style real estate sites: bold oversized headings, clean card grids, light backgrounds, premium feel.

The client's logo is gold on deep plum. We are using the **light version** of that palette — a warm cream background with plum headlines and gold accents. Not dark. Not navy. Light, airy, and expensive.

---

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger (scroll animations only — no Framer Motion)
- React Hook Form + Zod (form validation)
- Lucide React (icons)
- next/font/google (Cormorant Garamond + DM Sans + DM Mono)

---

## Design System

### Colors

Add to `tailwind.config.ts`:

```ts
colors: {
  plum: {
    DEFAULT: '#1A0A2E',
    mid:     '#2D1448',
    light:   '#4A2D6B',
    faint:   '#F0EBF7',
  },
  gold: {
    DEFAULT: '#B8966E',
    light:   '#D4AF87',
    dim:     '#8B6F4E',
    bg:      '#FAF4EC',
  },
  cream: {
    DEFAULT: '#F7F4F0',
    dark:    '#EDE8E0',
    border:  '#E5DDD5',
  },
}
```

Add to `app/globals.css`:

```css
:root {
  --plum:         #1A0A2E;
  --plum-mid:     #2D1448;
  --plum-light:   #4A2D6B;
  --plum-faint:   #F0EBF7;
  --gold:         #B8966E;
  --gold-light:   #D4AF87;
  --gold-dim:     #8B6F4E;
  --gold-bg:      #FAF4EC;
  --cream:        #F7F4F0;
  --cream-dark:   #EDE8E0;
  --cream-border: #E5DDD5;
  --text-body:    #4A2D6B;
  --text-muted:   #9B8BAA;
  --text-strong:  #1A0A2E;
}

html { scroll-behavior: smooth; }

body {
  background-color: #F7F4F0;
  color: #1A0A2E;
  -webkit-font-smoothing: antialiased;
}
```

### Fonts — `app/layout.tsx`

```ts
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
})
// Apply all three variables to <html>
```

### Typography Rules

```
H1 (hero):      font-display, 72–120px, weight 300, leading-[0.9], tracking-[-0.03em], color: plum
H2 (sections):  font-display, 42–60px,  weight 300, leading-[1.05], tracking-[-0.02em], color: plum
H3 (cards):     font-display, 20–28px,  weight 400, color: plum
Body:           font-body,    15–16px,  weight 300, leading-[1.7], color: var(--text-body)
Eyebrow/label:  font-mono,   10–11px,  uppercase, tracking-[0.18em], color: gold
Price:          font-mono,   24–32px,  weight 400, color: plum
Badge:          font-mono,    9–10px,  uppercase, tracking-[0.15em]
```

### Spacing

```
Page background:  #F7F4F0 throughout
Section padding:  py-32 md:py-40 (desktop) / py-20 (mobile)
Container:        max-w-[1280px] mx-auto px-6 md:px-12
Card radius:      rounded-2xl
Button radius:    rounded-full
Input radius:     rounded-xl
```

---

## Shared Components

### `GoldButton`

```tsx
// variant="solid" — plum background, gold text
// variant="outline" — transparent, gold border + gold text

// Solid:
className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
  font-mono text-[11px] uppercase tracking-[0.15em]
  bg-plum text-gold hover:bg-plum-mid transition-all duration-300"

// Outline:
className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
  font-mono text-[11px] uppercase tracking-[0.15em]
  border border-gold text-gold bg-transparent hover:bg-gold-bg transition-all duration-300"

// Always append: <ArrowRight size={13} strokeWidth={1.5} />
```

### `SectionLabel`

```tsx
<div className="flex items-center gap-3 mb-5">
  <div className="w-7 h-px bg-gold" />
  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{text}</span>
</div>
```

### `PropertyCard`

```tsx
<div className="group bg-white rounded-2xl overflow-hidden
  border border-cream-border
  hover:border-gold/40 hover:-translate-y-2
  hover:shadow-[0_20px_48px_rgba(26,10,46,0.10)]
  transition-all duration-500 ease-out cursor-pointer">

  <div className="relative overflow-hidden h-[200px]">
    <Image className="w-full h-full object-cover
      group-hover:scale-105 transition-transform duration-700 ease-out" />
    {/* Badge top-left */}
    {/* FOR SALE: bg-gold/15 text-gold-dim border border-gold/25 */}
    {/* FOR RENT: bg-plum/8 text-plum-light border border-plum/15 */}
  </div>

  <div className="p-5">
    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted mb-1">
      Starting from
    </p>
    <p className="font-mono text-[24px] text-plum mb-3 leading-none">AED 1,900,000</p>
    <h3 className="font-display text-[18px] text-plum leading-[1.3] mb-4">
      3-Bedroom Apartment, Ocean Residences
    </h3>
    <div className="h-px bg-cream-border mb-4" />
    <div className="flex gap-4 font-body text-[12px] text-text-muted mb-5">
      <span>3 Beds</span><span>2 Baths</span><span>1,744 ft²</span>
    </div>
    <GoldButton variant="outline" label="View Details" size="sm" />
  </div>
</div>
```

### `LocationCard`

```tsx
// Mouse-tracking 3D tilt — max 8deg rotateX and rotateY
// Use onMouseMove + onMouseLeave with useState for tiltX, tiltY
// Reset on mouse leave with transition: 'transform 0.6s ease-out'

<div
  style={{
    perspective: '1200px',
    transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out'
  }}
  className="relative overflow-hidden rounded-2xl cursor-pointer group h-[400px]"
>
  <Image className="absolute inset-0 w-full h-full object-cover
    group-hover:scale-105 transition-transform duration-700" />
  <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/20 to-transparent" />
  <div className="absolute bottom-0 left-0 right-0 p-6">
    <SectionLabel text="Exclusive" />
    <h3 className="font-display text-[30px] font-light text-white mb-4">Saadiyat Island</h3>
    <GoldButton variant="outline" label="Explore" size="sm" />
  </div>
</div>
```

---

## Sections — Build in This Order

---

### 1. Navbar

```
Position: fixed top-0 w-full z-50

Default state:
  bg-cream/95 backdrop-blur-md border-b border-cream-border

Scrolled (>80px):
  bg-cream/98 backdrop-blur-xl shadow-sm
  Detect with useEffect + window.scrollY

Logo (left):
  <div className="flex items-center gap-2">
    <div className="w-6 h-px bg-gold" />
    <span className="font-mono text-[13px] uppercase tracking-[0.3em] text-plum">LAVENDER</span>
  </div>

Nav links (center):
  font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted hover:text-plum transition-colors
  Links: Home, Rent, Buy, Locations, About, Contact

CTA (right):
  <GoldButton variant="solid" label="List Property" size="sm" />

Mobile hamburger → full-screen drawer, bg-cream
  Links stagger in with GSAP (delay: index * 0.06s, y: 20→0, opacity: 0→1)
```

---

### 2. Hero

```
Layout: min-h-screen bg-cream relative overflow-hidden
Content: max-w-[1280px] mx-auto px-6 md:px-12, pt-48 pb-24

Background decoration (no Three.js — CSS only):
  Two blurred circle divs, position absolute, pointer-events-none, no z-index above content
  Circle 1: w-[600px] h-[600px] rounded-full bg-plum-faint opacity-40 blur-[120px]
             top-[-200px] right-[-100px]
  Circle 2: w-[400px] h-[400px] rounded-full bg-gold-bg opacity-50 blur-[100px]
             bottom-[100px] left-[-100px]

Eyebrow:
  <SectionLabel text="Abu Dhabi Real Estate" />

H1 — two separate lines, each wrapped in overflow-hidden for mask reveal:
  Line 1: "Find Your"
  Line 2: "Dream Property."
         ↑ "Dream" is italic (font-display italic) + text-gold
         ↑ "Property." is text-plum

  Size: text-[72px] md:text-[96px] lg:text-[120px]
  font-display font-light leading-[0.9] tracking-[-0.03em]

GSAP animation (run on mount):
  gsap.from('.hero-line-1', { y: '100%', opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
  gsap.from('.hero-line-2', { y: '100%', opacity: 0, duration: 1, ease: 'power3.out', delay: 0.55 })

Subheadline:
  mt-8 font-body font-light text-[16px] text-text-body max-w-[480px] leading-[1.7]
  GSAP: opacity 0→1, duration 0.8, delay 0.9

Search Bar:
  mt-14 max-w-[860px]
  bg: rgba(26,10,46,0.04)  border: 1px solid rgba(26,10,46,0.10)  rounded-2xl p-2

  Top tabs: All Status | For Rent | For Sale
    Active: bg-plum text-gold rounded-xl px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em]
    Inactive: text-text-muted hover:text-plum font-mono text-[10px] uppercase tracking-[0.15em]

  Bottom row: 4 dropdowns + Search button
    Each dropdown: flex-1 px-5 py-3.5 border-r border-cream-border last:border-r-0
    Label: font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted
    Value: font-body text-[14px] text-plum
    Dropdowns: Property Type | Location | Bedrooms | Max Budget

    Search button: bg-plum text-gold rounded-xl px-8 py-3.5 ml-2 shrink-0
      font-mono text-[11px] uppercase tracking-[0.15em] hover:bg-plum-mid transition-colors

Stats Row:
  mt-14 flex items-center
  4 stats, each separated by h-8 w-px bg-cream-border
  Each stat: px-8 first:pl-0

  Number: font-mono text-[36px] font-light text-plum leading-none
    GSAP countUp from 0 on load (duration 1.5s, power2.out, delay 1.2s)
  Label:  font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mt-2

  Values: "500+" Properties | "12" Yrs Experience | "1,200+" Clients | "4" UAE Locations
```

---

### 3. Buying Section

```
Background: bg-cream py-32 md:py-40

Header: flex justify-between items-end mb-16
  Left:
    <SectionLabel text="Featured Properties" />
    <h2 className="font-display font-light text-[48px] md:text-[60px] tracking-[-0.02em] text-plum">
      Buying Property<br />
      <em className="italic text-gold">in Abu Dhabi</em>
    </h2>
  Right (desktop): Prev/Next arrow buttons
    40px circle, border border-cream-border text-text-muted
    hover: border-gold text-gold

Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
Use PropertyCard (type="sale")

GSAP ScrollTrigger: stagger 0.1s, opacity 0→1, y 30→0, once: true
Add className="animate-in" to each card
```

---

### 4. Exclusive Locations

```
Background: bg-white py-32 md:py-40 border-y border-cream-border

Header: text-center mb-16
  <SectionLabel text="Exclusive Locations" /> (centered)
  <h2 className="font-display text-[48px] font-light text-plum tracking-[-0.02em]">
    Discover the Best<br /><em className="italic text-gold">Locations in the UAE</em>
  </h2>
  <p className="font-body font-light text-[15px] text-text-muted max-w-[400px] mx-auto mt-4">
    Four iconic destinations. Endless possibilities.
  </p>

Asymmetric grid layout:
  Left column (col-span-1): tall card h-[500px] — Saadiyat Island
  Right column (col-span-1): two stacked cards each h-[240px] — Yas Island + Al Reef
  Below full-width: h-[280px] wide card — Al Reem Island

Use LocationCard for each (3D tilt, max 8deg)
GSAP stagger entrance: y 40→0, opacity 0→1, 0.12s stagger, once: true
```

---

### 5. Why Lavender (Dark Section)

```
THE ONLY DARK SECTION ON THE PAGE (besides footer).
Background: bg-plum (#1A0A2E)
py-28 border-y border-plum-mid

Header: text-center mb-16
  <SectionLabel text="Why Lavender" />
  <h2 className="font-display text-[48px] font-light text-cream tracking-[-0.02em]">
    Interested in<br />Purchasing Your Home?
  </h2>
  <p className="font-body font-light text-[15px] max-w-[440px] mx-auto mt-4" style={{ color: '#7A6B8A' }}>
    Leverage our team of qualified agents and dedicated customer care to ensure a smooth experience.
  </p>

3-column grid (use grid gap-px bg-plum-mid so gaps act as dividers):
  Each cell: bg-plum p-12

  Icon: 40px circle bg-gold/10 border border-gold/20
    Lucide icon inside: 16px, text-gold
    Icons: ShieldCheck | Star | HeartHandshake

  Eyebrow: font-mono text-[10px] uppercase tracking-[0.15em] text-gold mb-3
  Title:   font-display text-[26px] text-cream mb-3
  Body:    font-body font-light text-[14px] leading-[1.7] max-w-[260px]
           color: #7A6B8A

Footer of section: flex justify-center mt-16
  <GoldButton variant="outline" label="Get In Touch" />
```

---

### 6. Renting Section

```
Background: bg-cream py-32 md:py-40

Same layout as Buying Section.
Badge: "For Rent" — bg-plum/8 text-plum-light border border-plum/15
Everything else identical, different data.
```

---

### 7. How It Works

```
Background: bg-white py-32 md:py-40 border-y border-cream-border

Layout: 2 columns — left sticky, right scrolling steps

LEFT (sticky top-32, w-[380px]):
  <SectionLabel text="The Process" />
  <h2 className="font-display text-[48px] font-light text-plum leading-[1.05] tracking-[-0.02em] mb-6">
    How It Works
  </h2>
  <p className="font-body font-light text-[15px] text-text-body leading-[1.7] mb-10">
    Three simple steps to your perfect property.
  </p>
  <GoldButton variant="solid" label="Start Your Search" />

RIGHT: flex flex-col gap-6 (3 step cards)

Each step card:
  bg-cream rounded-2xl p-10 border border-cream-border relative
  hover:border-gold/30 transition-colors

  Step number (background decoration):
    absolute top-6 right-8
    font-display text-[100px] font-light leading-none select-none
    color: rgba(26,10,46,0.05)

  <SectionLabel text="Step 01" />
  <h3 className="font-display text-[28px] text-plum mb-3">Contact Our Experts</h3>
  <p className="font-body text-[14px] text-text-body leading-[1.7]">...</p>

Steps:
  01 — Contact Our Experts / "Reach out via our inquiry form or call. We'll match you with the right specialist agent."
  02 — Schedule a Viewing  / "Visit in person or take a virtual tour. We arrange everything around your schedule."
  03 — Close the Deal      / "Complete your transfer within a week. Our team handles all paperwork end to end."

Connecting dashed line between cards:
  2px dashed line, color: rgba(184,150,110,0.3), height 40px between each card
  Animate stroke-dashoffset with GSAP ScrollTrigger (draw effect on scroll)
```

---

### 8. Inquiry Form

```
Background: bg-cream py-32 md:py-40

Layout: 2 columns (60/40) desktop, stacked mobile

LEFT:
  <SectionLabel text="Get In Touch" />
  <h2 className="font-display text-[48px] font-light text-plum leading-[1.05] tracking-[-0.02em] mb-6">
    Talk to<br /><em className="italic text-gold">Our Experts.</em>
  </h2>
  <p className="font-body font-light text-[15px] text-text-body leading-[1.7] max-w-[360px] mb-10">
    Send us your requirements and we'll connect you with the right specialist within 24 hours.
  </p>

  3 feature rows (flex items-start gap-3 mb-5 each):
    Icon: 32px circle bg-gold-bg border border-cream-border, Lucide 14px text-gold
    Text: font-body text-[14px] text-text-body
    Items:
      MapPin   → "200+ locations across Abu Dhabi"
      Zap      → "24-hour response guarantee"
      Users    → "No fees, no pressure"

  Contact number: font-mono text-[18px] text-plum mt-10
  "+971 55 433 4369"

RIGHT — Form card:
  bg-white rounded-2xl p-10 border border-cream-border

  ALL inputs and selects share this style:
    Label: font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted mb-1.5 block
    Input/Select:
      w-full bg-cream border border-cream-border rounded-xl
      px-4 py-3.5 font-body text-[14px] text-plum
      placeholder:text-text-muted
      focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10
      transition-all duration-200

  FIELDS LAYOUT:
    1. Inquiry Type          — select, full width
       Options: Purchase, Rent, Sell, Valuation, Mortgage

    2. I'm a                 — select, full width
       Options: Buyer, Real Estate Agent, Property Owner

    3. First Name | Last Name — grid-cols-2 gap-4

    4. Email Address         — full width

    5. Mobile Number         — full width
       "+971" prefix inside input (font-mono text-gold, border-r border-cream-border pr-3 mr-2)

    6. Location              — select, full width (Abu Dhabi location list)

    7. Property Type         — select, full width

    8. Max Price | Min Size  — grid-cols-2 gap-4

    9. Beds | Baths          — grid-cols-2 gap-4

    10. GDPR Checkbox
        Custom: hidden real checkbox
        Visual: w-4 h-4 rounded border border-cream-border bg-cream
        Checked: bg-plum border-plum with white ✓ SVG
        Label: font-body text-[13px] text-text-muted ml-2

    11. <GoldButton variant="solid" label="Submit Inquiry" className="w-full justify-center" />

  PABBLY WEBHOOK:
    const webhookUrl = process.env.NEXT_PUBLIC_PABBLY_WEBHOOK_URL

    On submit (React Hook Form + Zod):
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiry_type, user_type, first_name, last_name,
          email, mobile, location, property_type,
          max_price, min_size, beds, baths, gdpr_consent,
          submitted_at: new Date().toISOString(),
          source: 'lavenderuae.com – Homepage'
        })
      })

    Success state — replace form content (no redirect):
      Centered: animated gold checkmark SVG (stroke-dashoffset draw, 0.6s)
      font-display text-[32px] text-plum "Thank You"
      font-body text-[15px] text-text-body "We'll be in touch within 24 hours."
      (no Lottie — pure SVG animation)

    Error: font-mono text-[10px] text-red-500 mt-1 below each field
```

---

### 9. Newsletter

```
Background: bg-plum py-20

Layout: flex justify-between items-center (desktop) / flex-col gap-8 (mobile)

Left:
  <h3 className="font-display text-[36px] font-light text-cream leading-[1.1] tracking-[-0.02em]">
    Stay Ahead of<br />the Market.
  </h3>
  <p className="font-body font-light text-[14px] mt-2" style={{ color: '#7A6B8A' }}>
    Weekly insights on Abu Dhabi real estate.
  </p>

Right: flex gap-3 items-center
  Name input (w-44) + Email input (w-60):
    bg-plum-mid border border-plum-mid rounded-xl px-4 py-3.5
    font-body text-[14px] text-cream placeholder:text-[#7A6B8A]
    focus:border-gold focus:outline-none
  <GoldButton variant="outline" label="Subscribe" />
```

---

### 10. Footer

```
Background: #100620 pt-20 pb-10

Grid: grid-cols-2 md:grid-cols-4 gap-12

Col 1 — Brand:
  Logo (same as navbar, cream text)
  mt-5 font-body font-light text-[13px] leading-[1.8] max-w-[220px] color: #7A6B8A
  "Lavender Real Estate offers a full range of services — sales, leasing, consultancy, and mortgage solutions."
  Social icons (mt-8 flex gap-3):
    36px circle border border-plum-mid, icon: 16px color: #7A6B8A
    hover: border-gold text-gold transition
    Icons: Instagram, Linkedin, Phone

Col 2 — Site:
  Label: font-mono text-[9px] uppercase tracking-[0.2em] text-gold mb-5
  Links: font-body text-[13px] color: #7A6B8A hover:text-cream transition
  Items: About, Rent, Buy, Agent, Contact

Col 3 — Contact:
  Label: same style
  Lines: font-body text-[13px] color: #7A6B8A leading-[2]
  Office No. 222, Eldorado Tower Block A, Electra Street, Abu Dhabi – UAE
  +971 55 433 4369
  Info@lavenderuae.com

Col 4 — Hours:
  Label: same style
  Mon–Fri: 9:00 AM – 6:00 PM
  Sat: 10:00 AM – 4:00 PM
  Sun: Closed

Bottom bar (mt-16 pt-8 border-t border-plum-mid flex justify-between):
  font-mono text-[10px] color: #5A4B6A
  Left:  "© 2025 Lavender Real Estate. All rights reserved."
  Right: "Abu Dhabi, UAE"
```

---

### Custom Cursor (desktop only)

```tsx
// components/layout/CustomCursor.tsx
// Pure JS requestAnimationFrame — no Framer Motion

// Two fixed elements (pointer-events-none, z-[9999]):
// 1. Dot: 6px, bg-plum, border-radius 50%
//    Follows cursor instantly (direct transform, no lag)
// 2. Ring: 30px, border 1px solid rgba(26,10,46,0.25), border-radius 50%
//    Trails with lerp factor 0.12 via rAF

// On hover over a or button:
//    Dot: scale 0
//    Ring: scale(1.6) + bg-plum/5

// Mount guard: only render on client
// Only activate when window.matchMedia('(hover: hover)').matches
```

---

## Scroll Animations

```ts
// hooks/useScrollAnimation.ts
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current?.querySelectorAll('.animate-in') ?? [], {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          once: true,
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return ref
}

// Add className="animate-in" to: SectionLabel, H2, body text, cards, feature cells
// Do NOT add to: Navbar, Hero (separate GSAP), background blobs
```

---

## Install Commands

```bash
npm install gsap react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge
```

---

## Environment Variable

```bash
# .env.local
NEXT_PUBLIC_PABBLY_WEBHOOK_URL=https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_KEY
```

---

## File Build Order

```
1.  tailwind.config.ts
2.  app/globals.css
3.  app/layout.tsx
4.  lib/utils.ts
5.  components/ui/GoldButton.tsx
6.  components/ui/SectionLabel.tsx
7.  components/layout/Navbar.tsx
8.  components/sections/HeroSection.tsx
9.  components/ui/PropertyCard.tsx
10. components/sections/BuyingSection.tsx
11. components/ui/LocationCard.tsx
12. components/sections/LocationsSection.tsx
13. components/sections/WhyLavender.tsx
14. components/sections/RentingSection.tsx
15. components/sections/HowItWorks.tsx
16. components/sections/InquiryForm.tsx
17. components/sections/Newsletter.tsx
18. components/layout/Footer.tsx
19. components/layout/CustomCursor.tsx
20. hooks/useScrollAnimation.ts
21. app/page.tsx
```

---

## Done When

- Page background is cream (#F7F4F0) throughout — not dark
- Every heading is Cormorant Garamond (verify in DevTools)
- "Dream" in hero is italic + gold
- Property cards are white with warm border and lift on hover
- Location cards tilt on mouse move, max 8deg
- Only dark sections: Why Lavender strip + Newsletter + Footer
- Inquiry form posts to Pabbly webhook and shows success state
- Mobile: nav drawer works, cards stack, search bar scrolls horizontally
- `npm run build` — zero errors

---

*Lavender Real Estate — Homepage | Cream × Plum × Gold*
