# Reverie of Fear — Home Page (Augment Code Handoff)

A bold, neon–noir, comic‑book home page with a full‑screen hero, panelized content sections, and Zentry‑style modern flow.

---

## 0) TL;DR Build Order

1. Add theme tokens (Tailwind + CSS vars).
2. Build **HeroFull** (full‑bleed key art + rain + copy + CTAs).
3. Build **PanelRow** x3 (What‑is‑RoF).
4. Build **FeatureStrips** (Sets / Characters / Slashers).
5. Build **VHSCarousel** (gallery).
6. Wire sections into `/` page, add framer‑motion transitions, a11y, and perf.

---

## 1) Assets

* **Hero key art (desktop)**: `/public/hero/rof-hero-desktop.jpg` (the rain image provided)
* **Hero key art (mobile)**: `/public/hero/rof-hero-mobile.jpg` (center on protagonist)
* **Grain texture**: `/public/fx/grain.png` (repeat, low opacity)
* **Halftone field**: `/public/fx/halftone.png`
* **VHS spines** (svg masks): `/public/vhs/spine-*.svg`

---

## 2) Design Tokens (Tailwind + CSS Vars)

Add to `globals.css`:

```css
:root{
  --rof-red:#FF2E63; --rof-cyan:#24D1F2; --rof-amber:#F6BF3A; --rof-ink:#0B0E14; --rof-teal:#0D2A34; --rof-off:#F5F7FF;
}
html{ background: radial-gradient(100% 120% at 50% 0%, #0D2A34 0%, #0B0E14 60%); }
.bg-streetlight{ background: linear-gradient(135deg, var(--rof-red), var(--rof-cyan)); }
.text-glow{ text-shadow: 0 0 .35rem rgba(255,46,99,.7), 0 0 .9rem rgba(36,209,242,.55); }
.box-glow{ filter: drop-shadow(0 0 .6rem rgba(255,46,99,.45)) drop-shadow(0 0 1.2rem rgba(36,209,242,.25)); }
.scrim{ background: linear-gradient(180deg, rgba(11,14,20,.6), rgba(11,14,20,.2)); }
.halftone{ background-image:url('/fx/halftone.png'); background-size: 340px; opacity:.15; }
.grain{ background-image:url('/fx/grain.png'); mix-blend-mode: overlay; opacity:.08; }
```

Tailwind (add to `tailwind.config` theme.extend):

```js
colors:{ rof:{ red:'var(--rof-red)', cyan:'var(--rof-cyan)', amber:'var(--rof-amber)', ink:'var(--rof-ink)', teal:'var(--rof-teal)', off:'var(--rof-off)'} },
borderRadius:{ '2xl':'1rem','3xl':'1.5rem' }
```

---

## 3) Page Structure (Sections)

### A) HeroFull (fullscreen)

**Goal:** giant comic splash like a cover.
**Layout:** background key art fills viewport; scrim + grain + rain canvas. Copy lives bottom‑left.
**Content:**

* H1: `REVERIE OF FEAR` (Bebas Neue/Antonio, `tracking-tight`, `text-6xl md:text-8xl` with `.text-glow`).
* Sub: `Save the living. Unmask the target. Outlast the night.` (Inter, `max-w-xl`).
* CTAs: `View Sets` (solid rof-red) + `Meet the Slashers` (outline rof-cyan).

**Accessibility:** `role="img"` for decorative bg; ensure 4.5:1 contrast on text.

**Motion:** fade/scale on mount, gentle parallax of rain layer; CTA hover pulses.

### B) PanelRow — “What is Reverie of Fear?”

Three **oversized cards** with halftone edges + comic borders.

* **Co‑op Deckbuilder** — archetype synergy.
* **Hidden Target** — identify the marked victim.
* **Save or Perish** — health/sanity fail state.

**Animation:** staggered rise; panel border wipe.

### C) FeatureStrips (Zentry‑style content strips)

Three full‑bleed bands, alternating image/text sides:

1. **Sets** → background: gradient + set art; CTA: *Browse Sets*.
2. **Characters** → portrait grid ghosted behind; CTA: *Meet the Survivors*.
3. **Slashers** → darker, red‑dominant; agenda meter micro‑preview; CTA: *Face the Slashers*.

### D) VHSCarousel (Gallery)

* Horizontal scroll of tall VHS spines; keyboard arrows to navigate.
* On hover, tape “pulls out” with drop shadow + glow; click opens lightbox.

### E) Newsletter / Footer

Clean Zentry‑like footer; add a subtle flicker on the logo.

---

## 4) Components (React + Tailwind + framer-motion)

### `<HeroFull/>` (JSX skeleton)

```tsx
export default function HeroFull(){
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <img src="/hero/rof-hero-desktop.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 scrim"/>
      <canvas id="rain" className="absolute inset-0" aria-hidden></canvas>
      <div className="grain absolute inset-0 pointer-events-none"/>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 h-full flex items-end">
        <div>
          <h1 className="text-6xl md:text-8xl font-black text-rof-off text-glow">REVERIE OF FEAR</h1>
          <p className="mt-4 max-w-xl text-rof-off/80">Save the living. Unmask the target. Outlast the night.</p>
          <div className="mt-8 flex gap-3">
            <a href="/sets" className="px-5 py-3 rounded-2xl bg-rof-red text-rof-ink font-semibold box-glow">View Sets</a>
            <a href="/slashers" className="px-5 py-3 rounded-2xl ring-2 ring-rof-cyan text-rof-off/90">Meet the Slashers</a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### `<PanelRow/>`

* 3 `<PanelCard/>` children with comic borders: `rounded-3xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,.06)_inset] halftone`.

### `<FeatureStrip/>`

Props: `{ title, subtitle, ctaLabel, ctaHref, side:'left'|'right', palette:'red'|'cyan'|'amber', bgImage }`

* Full‑bleed `min-h-[60vh]` section; text block in container; background image masked with gradient of chosen palette.

### `<VHSCarousel/>`

* Container with `overflow-x-auto snap-x snap-mandatory`; items are `inline-flex` VHS cards (`w-44 h-72`).
* Keyboard navigation + scroll buttons.

### Rain Canvas (placeholder)

Create `/lib/rain.ts` to draw diagonal streaks via simple requestAnimationFrame; disable on `prefers-reduced-motion`.

---

## 5) Next.js Page Wiring (`app/page.tsx`)

```tsx
import HeroFull from '@/components/HeroFull';
import PanelRow from '@/components/PanelRow';
import FeatureStrip from '@/components/FeatureStrip';
import VHSCarousel from '@/components/VHSCarousel';

export default function Home(){
  return (
    <main>
      <HeroFull />
      <section className="py-20"><PanelRow /></section>
      <FeatureStrip title="Sets" subtitle="Scenario packs with unique rules" palette="cyan" ctaLabel="Browse Sets" ctaHref="/sets" bgImage="/art/sets.jpg" />
      <FeatureStrip title="Characters" subtitle="Five horror archetypes to master" palette="amber" ctaLabel="Meet the Survivors" ctaHref="/characters" bgImage="/art/characters.jpg" />
      <FeatureStrip title="Slashers" subtitle="Agendas, tells, and ruthless minions" palette="red" ctaLabel="Face the Slashers" ctaHref="/slashers" bgImage="/art/slashers.jpg" />
      <section className="py-20"><VHSCarousel /></section>
    </main>
  );
}
```

---

## 6) Motion & Micro‑FX (framer-motion)

* Stagger `PanelRow` children with `delayChildren`/`staggerChildren`.
* On hover, VHS card y‑translate `-8px` + subtle rotate; add glow.
* `FeatureStrip` text block slides in from the opposite side of the image.

---

## 7) Accessibility & Performance

* Text scrims over imagery for AA contrast; clamp line lengths.
* `prefers-reduced-motion` → disable rain/parallax + heavy transitions.
* Use `next/image` for hero with `priority` and responsive sizes.
* Lazy‑load Feature strips and Carousel.

---

## 8) Content Copy (drop‑in)

**What‑is panels:**

* *Co‑op Deckbuilder* — Build archetype decks and synergize to survive.
* *Hidden Target* — The Slasher marks a victim. Find them before the kill.
* *Save or Perish* — Rescue victims for boons; hit 0 health/sanity and it’s over.

**CTA labels:** `View Sets`, `Meet the Survivors`, `Face the Slashers`.

---

## 9) QA Checklist

* [ ] Hero key art fills viewport at 16:9 and crops gracefully on mobile.
* [ ] H1 legible at 4.5:1 over scrim; CTAs accessible by keyboard.
* [ ] Rain effect pauses when tab is not visible and for reduced motion.
* [ ] 60fps on mid‑range laptop; no layout shift on initial load.
* [ ] All sections pass axe DevTools checks.
