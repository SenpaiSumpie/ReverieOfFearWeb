# Reverie of Fear — Website Spec (v1)

A modern, cinematic web experience that blends clean UX (inspired by Zentry) with bold neon–noir slasher comic aesthetics.

---

## 1) Brand Foundation

**Tone:** Sleek, ominous, confident; "we control the night."

**Color Palette (Neon Noir):**

* Primary Neon Red: `#FF2E63`
* Primary Electric Cyan: `#24D1F2`
* Night Teal (BG): `#0D2A34`
* Deep Charcoal (BG/Ink): `#0B0E14`
* Sodium Lamp Amber (accent/glow): `#F6BF3A`
* Off‑White (copy): `#F5F7FF`

**Gradients:**

* *Streetlight Burn* → `linear-gradient(135deg, #FF2E63 0%, #24D1F2 100%)`
* *Siren Mist* → `linear-gradient(180deg, rgba(255,46,99,.12), rgba(36,209,242,.08))`

**Textures (subtle, low‑opacity):** film grain, halftone dot fields, ink splatter edges, chromatic aberration on hover.

**Typography:**

* Display: **Bebas Neue** (or **Anton/Antonio** alt), tight tracking for headlines.
* Body/UI: **Inter** (fallback: system UI).
* Numeric/Code Accents: **JetBrains Mono** (labels, stat pills).

**Iconography:** Simple line icons with neon outer‑glow on hover. Rounded 2xl corners, soft shadows.

---

## 2) Information Architecture & Routes

```
/
  ├─ /sets                (grid + filters)
  │    └─ /sets/[slug]    (set detail: theme, cards, rewards)
  ├─ /characters          (grid + filters)
  │    └─ /characters/[slug] (character detail: archetype, deck, perks)
  ├─ /slashers            (grid + filters)
  │    └─ /slashers/[slug]   (slasher detail: agenda, tells, minions)
  ├─ /media               (key art, wallpapers)
  └─ /roadmap             (timeline, newsletter CTA)
```

---

## 3) Page Blueprints (Wireframe Notes)

### Home (/)

1. **Hero (Fullscreen)**

   * Left: bold headline + subcopy, CTA buttons ("View Sets", "Playtest Sign‑Up").
   * Right: looping **cinematic key art** in a masked frame (16:9), with parallax rain + glow.
   * Utilities: top‑nav (sticky, translucent), audio toggle for ambience.

2. **What is Reverie of Fear? (3‑column)**

   * Cards with comic panel borders + halftone.
   * Topics: *Co‑op Deckbuilder*, *Hidden Target Mechanic*, *Save the Victims*.

3. **Spotlight Sections**

   * *Latest Set* (banner + 3 featured cards).
   * *Featured Character Archetype* (animated stat pills).
   * *Current Slasher* (agenda meter preview).

4. **Gallery Strip**

   * Horizontally scrollable VHS‑style carousel (thumbnails as cassette spines).

5. **Newsletter / Discord CTA**

   * Neon‑lit box with sodium glow, privacy note.

---

### Sets (/sets)

* **Filters:** Release, difficulty, theme, mechanics tags.
* **Card Grid:** 3–5 cols responsive; hover = flip to synopsis; bottom chip row for tags.
* **Detail (/sets/\[slug]):**

  * Hero banner with gradient overlays + grain.
  * Tabs: *Overview*, *Cards*, *Rewards/Boons*, *Designer Notes*.
  * Sidebar: set icons, playtime, player count, complexity.

### Characters (/characters)

* **Filters:** Archetype (5 horror roles), complexity, synergy tags.
* **Card Grid:** Character portrait card → hover shows role + key mechanic.
* **Detail (/characters/\[slug]):**

  * Hero panel with portrait; quick stats (health/sanity), role badge.
  * Tabs: *Kit*, *Signature Cards*, *Build Ideas*, *Lore*.
  * Sticky action bar: "Add to Deck" (future deckbuilder).

### Slashers (/slashers)

* **Filters:** Threat tier, agenda speed, tells, minion types.
* **Card Grid:** Tall, menacing cards with red underglow; rain parallax on hover.
* **Detail (/slashers/\[slug]):**

  * Cinematic banner (streetlight glow + silhouette).
  * *Agenda Timeline* (progress track), *Tells & Counters*, *Minions*, *Signature Events*.

---

## 4) Components (React + Tailwind)

* **NavBar** (glass + blur, neon underline on active).
* **HeroPanel** (media mask, rain canvas layer).
* **NeonButton** (primary red, secondary cyan; subtle pulse).
* **CardPanel** (comic border, halftone bg, hover‑flip).
* **FilterPills** (JetBrains Mono labels).
* **StatMeter** (agenda/health/sanity with glow thresholds).
* **CarouselVHS** (spine labels + snap scrolling).
* **TabSwitcher** (ink‑splash underline).
* **Footer** (newsletter form, social, ESRB‑style content tags).

**Design Tokens (Tailwind plugin/variables):**

```css
:root{
  --rof-red:#FF2E63; --rof-cyan:#24D1F2; --rof-teal:#0D2A34; --rof-ink:#0B0E14; --rof-amber:#F6BF3A; --rof-off:#F5F7FF;
  --glow: drop-shadow(0 0 .75rem rgba(255,46,99,.55)) drop-shadow(0 0 1.25rem rgba(36,209,242,.35));
}
```

---

## 5) Motion & FX

* **Ambient Rain Layer:** lightweight canvas shader on heroes/banners.
* **Glow Reactions:** focus/hover adds cyan outer‑glow; active states lean red.
* **Panel Entry:** framer‑motion y‑slide with opacity; staggered card reveals.
* **Chromatic Aberration Micro‑effect:** on images at 2–3px separation (hover only).
* **Keyboard Nav:** arrow‑keys scroll carousels; space toggles media.

---

## 6) Accessibility & Performance

* WCAG AA contrast (use off‑white text over teal/ink; add dark scrims on art).
* Prefers‑reduced‑motion: disable rain/parallax, remove glows.
* Lazy‑load media; srcset for responsive images; prefetch critical routes.
* Keyboard‑focus rings (cyan); skip‑to‑content link; semantic landmarks.

---

## 7) Sample Content Blocks

### Hero Headline

> **REVERIE OF FEAR**
> Save the living. Unmask the target. Outlast the night.

**CTAs:** `View Sets` (primary), `Meet the Slashers` (secondary outline).

### "What Is It" Cards

* **Co‑op Deckbuilder** — Build archetype decks and synergize.
* **Hidden Target** — Identify who the Slasher marked before it’s too late.
* **Save or Perish** — Rescue victims for boons; lose health/sanity and it’s over.

---

## 8) Augment Code Task List (MVP Sprint)

1. **Scaffold** Next.js + Tailwind + framer‑motion; install fonts (Bebas Neue, Inter, JetBrains Mono).
2. **Theme**: add CSS variables + Tailwind plugin for `rof` colors; global grain background.
3. **Layout**: build `NavBar`, `Footer`, `Container`, and `Section` wrappers (max‑w‑7xl, p‑6).
4. **Home**: implement `HeroPanel` with parallax rain; three info cards; spotlight sections; VHS carousel; newsletter block.
5. **Grid Pages**: `/sets`, `/characters`, `/slashers` with filters (pills) + responsive card grids.
6. **Detail Pages**: dynamic `[slug]` routes with sticky tabbed content; `StatMeter` and `TabSwitcher`.
7. **Accessibility**: focus rings, reduced‑motion toggles, semantic roles.
8. **Perf**: image optimization, lazy components, route prefetch.
9. **Analytics**: basic pageview + outbound link tracking.
10. **Content Hooks**: JSON data loaders for Sets/Characters/Slashers (stubbed).

---

## 9) Future Enhancements

* Deckbuilder (save/share), encounter simulator widgets, press kit page, dark/light toggle (keeps neon intact), soundtrack player, localized copy.

---

**Deliverables**

* MVP site with the above pages/components.
* A style guide page listing colors, typography, buttons, cards, and meters.

---

## 10) Accounts, Profiles & Deckbuilder (MVP)

### Tech Choice

* **Auth/DB:** **Supabase** (Postgres + Auth + Storage + Row‑Level Security).
* **Alt:** Clerk/Auth.js for auth + Neon/PlanetScale for DB (if you prefer vendor split).
* **Realtime:** Supabase Realtime channels for deck collaboration/presence.

### Data Model (Postgres)

```sql
-- Users are managed by Supabase auth; mirror minimal public profile
create table public.profiles (
  user_id uuid primary key references auth.users on delete cascade,
  handle text unique not null check (handle ~ '^[a-zA-Z0-9_]{3,20}$'),
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  name text not null,
  format text not null default 'standard', -- e.g., standard/draft/custom
  archetype text, -- one of 5 horror archetypes
  is_public boolean not null default false,
  cover_image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.deck_cards (
  deck_id uuid references public.decks(id) on delete cascade,
  card_id text not null,  -- matches cards.catalog_id
  qty int not null check (qty > 0 and qty <= 3),
  primary key (deck_id, card_id)
);

create table public.cards (
  catalog_id text primary key, -- e.g., SET-ABC-012
  set_slug text not null,
  name text not null,
  type text not null, -- character/slasher/victim/event/upgrade/etc
  rarity text,
  cost int,
  rules jsonb,
  image_url text
);

-- social & discovery
create table public.deck_likes (
  deck_id uuid references public.decks(id) on delete cascade,
  user_id uuid references public.profiles(user_id) on delete cascade,
  created_at timestamptz default now(),
  primary key (deck_id, user_id)
);

create table public.deck_tags (
  deck_id uuid references public.decks(id) on delete cascade,
  tag text,
  primary key (deck_id, tag)
);
```

**RLS Policies (sketch):**

* `profiles`: users can `select` all; `insert/update` only their row.
* `decks`:  `select` where `is_public = true` OR `user_id = auth.uid()`.
  Owners can `insert/update/delete` their decks.
* `deck_cards`, `deck_likes`, `deck_tags`: follow parent deck policy.

### API Routes (Next.js app router)

```
POST /api/decks           -> create deck
GET  /api/decks           -> list decks (public + mine)
GET  /api/decks/[id]      -> deck detail
PATCH/DELETE /api/decks/[id]
POST /api/decks/[id]/cards   -> add/update card qty
POST /api/decks/[id]/publish -> toggle public
POST /api/decks/[id]/like    -> like/unlike
GET  /api/cards?set=SET1&type=event -> catalog search
```

**Validation Service:** server action `validateDeck(deck)` enforcing format rules (deck size, per‑card limits, required role/kit cards, banned list by format).

### UI/UX Additions

* **/deckbuilder**: left sidebar (catalog filters), center canvas (current deck list), right panel (stats: cost curve, archetype synergies, sanity/health curve).
* **/decks**: grid of my decks + popular (tabs).
* **/decks/\[id]**: read‑only share view with copy link + export to code.
* **/u/\[handle]**: public profile (avatar, bio, favorite archetype, published decks, achievements).
* **Settings**: change handle, avatar, privacy, linked accounts.

**Interactions**

* Drag‑to‑add from catalog → stack count pill increments.
* Inline search (cmd/ctrl+k) for quick card add.
* Real‑time presence: show collaborators viewing the deck (read‑only for MVP).
* Export: `rof://deck/<uuid>` and `application/json` file.

### JSON Schemas

```json
// deck.json
{
  "$schema": "https://rof.gg/schemas/deck-1.0.json",
  "id": "uuid",
  "name": "Starter Control",
  "format": "standard",
  "archetype": "Occultist",
  "cards": [{ "catalogId": "SET1-CHR-007", "qty": 2 }],
  "createdAt": "2025-09-08T22:00:00Z",
  "updatedAt": "2025-09-08T22:10:00Z"
}
```

### In‑Game Integration (UE5 or Client)

* **Auth:** short‑lived JWT from website; game uses OAuth device code or QR pair to link account.
* **Sync:** game calls `GET /api/me/decks` with bearer token; caches deck JSON; verifies with `validateDeck` endpoint.
* **Webhooks:** on publish/update, push a lightweight message (Supabase channel `decks:<user>`).
* **Offline:** ship last‑used deck JSON with save data.

### Security & Privacy

* Enforce RLS; rate‑limit mutations; server‑side input validation (Zod).
* Unique handle guard; profanity filter; image uploads via signed storage URLs.
* GDPR requests: export/delete account endpoints.

### Augment Code — Deckbuilder Sprint

1. Add Supabase client + env vars; scaffold RLS policies.
2. Build `/auth` flow (email magic link + OAuth providers).
3. Implement `profiles` CRUD and `/u/[handle]` page.
4. Create `DeckCard`, `CatalogList`, `DeckStats`, `CardSearch`, `CardPill` components.
5. Wire `/deckbuilder` with drag‑add, qty controls, validation badge.
6. Implement API routes above (server actions where possible).
7. Build `/decks` and `/decks/[id]` (share view) + like system.
8. Export/Import deck JSON; deep link `rof://` handler placeholder.
9. Realtime presence via Supabase channels.
10. QA: a11y, reduced‑motion, mobile builder layout; unit tests for validation.

```
```
