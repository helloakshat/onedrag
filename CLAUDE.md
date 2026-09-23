# Onedrag — Project Brain

Read this file at the start of every session. It is the source of truth for
architecture, design tokens, and conventions. If a request conflicts with this
file, say so before acting.

---

## 1. What this is

Marketing site for **Onedrag** (onedrag.in) — a digital studio offering
automation, e-commerce, web, and product design services.

Owner: Akshat Gupta. Domain registered at Hostinger, DNS will point to Vercel.

**Visual direction:** light, Swiss-technical, high-precision. A visible
dashed construction grid. Numbered section chips. Warm orange accent against
off-white and near-black. Zero border-radius everywhere — every edge is
square. Generous negative space. Smooth scroll. Motion is calm and
deliberate — never bouncy, never fast.

This is **NOT** a dark or rounded design.

**Do NOT copy any commercial template's assets, copy, or exact typographic
lockup.** Layout patterns and mood are fine; assets are generated in-project.

---

## 2. Design language

- **Grid-first.** Every section is built on the column grid (§5) before any
  content is placed. Dashed vertical lines on column boundaries should be
  visible through most of the page — this is a construction-grid aesthetic,
  not a decorative one.
- **Zero radius, always.** No component may render a rounded corner. Tailwind's
  `rounded-*` utilities are disabled at the theme level (§6) so this can't
  happen by accident.
- **Two-family type system.** Inter (weight 500 for display type) for
  headings and body copy. Geist Mono, uppercase, for section chips, nav,
  buttons, labels, and stat lines — anything that reads as a "system" label
  rather than prose.
- **Section chips** mark every section: a two-block badge, e.g. `01 INTRO`.
  The number block is a solid `--spine` 31×31 square; the label block sits on
  `--border-subtle` with `0 12px 0 10px` padding. No separator, no gap
  between the two blocks — they read as one object.
- **Orange is a mark, not a fill — at rest.** Use `--accent` for chip
  numbers, the 1px left strip on primary buttons, corner ticks, and small
  emphasis marks. Avoid large orange fills in the resting state. The one
  sanctioned fill is the button hover: primary and secondary both fill
  `--spine` with `--text-on-fill` text, and an arrow slides in from the left
  ahead of the label (see §7).
- **Dark blocks as punctuation.** `#202020` (`--dark`) is used for secondary
  buttons and the occasional full dark section band (see §5 Band
  backgrounds) — used deliberately, as contrast punctuation, not as a base
  surface.
- **Motion stays calm.** See §7 — the grid may be visible and technical, but
  motion is still restrained, never showy.

---

## 3. Stack — do not substitute without asking

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router, TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | `motion` (Framer Motion) |
| Smooth scroll | `lenis` |
| Icons | `lucide-react` |
| Brand logos | `simple-icons` |
| Content | JSON (pages) + MDX (case studies) |
| MDX | `next-mdx-remote` |
| Fonts | `next/font/google` — Inter + Geist Mono, self-hosted at build, no external requests |
| Deploy | Vercel |

No CMS. No database. No auth. No analytics package beyond Vercel Analytics.

---

## 4. Directory contract

```
content/                  ← the ONLY folder the owner edits for copy
  site.json               nav, footer, socials, external links, default SEO
  home.json
  services/              one file per service; the filename IS the URL slug
    automations.json       → /automations
    ui-ux-design.json      → /ui-ux-design
    shopify-development.json → /shopify-development
    framer-development.json → /framer-development
  case-studies/
    _index.json           listing page copy
    <slug>.mdx            one file per case study
src/
  app/                    routes only — no business logic
  components/
    sections/             page-level sections (Hero, Process, Pricing…)
    ui/                   primitives (Button, SectionChip, Reveal, HeadingReveal, Tick…)
    layout/               Nav, Footer, SmoothScroll, Grid, Rail, DashedLine,
                          SectionShell, OrangeSpine
  lib/                    content loaders, utils
  styles/
    tokens.css            ← ALL colour/type/spacing/grid values live here
public/
  images/
```

**Rules:**
- Never hardcode a hex value in a component. Use a token.
- Never put copy strings in a component. Read from `content/`.
- Every section component takes its data as a typed prop.
- One section = one file. No file over ~200 lines.

### Site structure

Standing rules. These do not change without the owner saying so.

1. **Service pages are flat top-level routes.** `/<slug>`, rendered by
   `src/app/[slug]/page.tsx`. There is **no `/services` prefix** and **no
   "Services" menu item, ever** — not in the header, not in the footer.
2. **One array drives the menu:** `nav.links` in `content/site.json`, in
   order:

   | Label | Route |
   |---|---|
   | Home | `/` |
   | Automations | `/automations` |
   | Shopify dev | `/shopify-development` |
   | Framer dev | `/framer-development` |
   | UI/UX | `/ui-ux-design` |
   | Case studies | `/case-studies` |

3. **A menu item renders only if its page exists.** `lib/navigation.ts`
   filters the array: a service page exists when
   `content/services/<slug>.json` does, anything else when
   `src/app/<segment>/page.tsx` does. All four service pages are built;
   Case studies is in the array and stays hidden until it is.
4. **Adding a page is one array entry** plus its content file. Nothing else
   is edited — the link appears in the header and the footer at the position
   it already held.
5. **The footer's nav column is the same array, same order**, rendered from
   the same `getNavLinks()`. The footer's second column is legal only
   (`contacts.legalLinks`).

A service's JSON carries no menu fields — label and order live in the array,
so there is one source of truth for both.

---

## 5. The grid

The construction grid is a first-class part of the design, not an invisible
layout aid — its dashed lines are meant to be seen.

- **Container:** max-width `1520px`, centered, **no inner gutter** once the
  viewport clears the container. At a `1920px` viewport the container edges
  land on `x=200` and `x=1720`. Below `1560px` a `--grid-gutter` (20px) side
  padding kicks in so content never touches the screen edge.
- **Columns:** 6 **equal** columns (`1fr` each), zero gap. At `1920px` that
  is `253.33px` per column. Columns are fluid — there is no fixed column
  width token.
- **Boundaries:** referred to as `C0`–`C6`, mapping to Tailwind
  `col-start-1`…`col-start-7`:

  | Boundary | col-start | x @ 1920 |
  |---|---|---|
  | C0 | 1 | 200 |
  | C1 | 2 | 453.3 |
  | C2 | 3 | 706.7 |
  | C3 | 4 | 960 |
  | C4 | 5 | 1213.3 |
  | C5 | 6 | 1466.7 |
  | C6 | (end) | 1720 |

- **Rail:** `C0→C2` (two columns). **All content in the content field begins
  at `C2`.** Rail headings are constrained to `--rail-heading-max` (~370px).
- **Place everything by column span.** Never position with arbitrary padding
  or margins horizontally — vertical rhythm still uses margins.
- On mobile the grid collapses to a single column (`col-span-6`); the column
  placements are `md:`-prefixed.

**Orange spine.** A `1px` **dashed** `--spine` (`#ED4F00`) vertical line at
exactly `C2` — the rail boundary and the left edge of the content field.
Dash pattern ~3px on / 4px off (a `repeating-linear-gradient`, since CSS
border dashes aren't tunable), `opacity: 0.55`. It runs the full page height,
unbroken across every section including dark bands, and sits above section
backgrounds. Implemented as a single `position: fixed` element in the root
layout (`OrangeSpine`) that renders through the *same* Container + Grid as
the content, so it stays locked to `C2` at any viewport width — do not
reposition it with a `calc()` offset.

**Construction grid lines** (`GridLines`), on the column boundaries:

| Boundary | Treatment |
|---|---|
| C3, C5 | `3px` dashed `--grid-line` |
| C4 | `1px` solid `--grid-line-solid` |

C1 carries no line. **The spine at C2 is the only orange vertical on the
page** — don't add a second one.

Plus a full-viewport-width horizontal rule partway down the hero. Lines run
the section height and may continue past its lower edge.

**Layer scale.** Sections must NOT create a stacking context (no `isolate`,
no z-index on the section) or this scale stops resolving:

| Layer | z-index |
|---|---|
| Section background | auto |
| Decor (`TopoTexture`) | `2` |
| Construction lines | `3` |
| Orange spine | `4` |
| Content (`Container`) | `10` |
| Header | `50` |

This is what keeps the spine visible over band backgrounds while never
cutting across text.

**Section variants.** Every section renders through a `SectionShell`
component that takes a `variant` prop:

- `variant="rail"` — chip + H2 sit in the `490px` left rail (§5 Rail);
  content fills the field to its right.
- `variant="field"` — the left rail is empty; chip + H2 + content all begin
  in the content field (no reserved rail column).

Assignment, home page (in build order):

| # | Section | Variant |
|---|---|---|
| 01 | intro | field |
| 02 | services | rail |
| 03 | process | field |
| 04 | results | rail |
| 05 | work | field |
| 06 | industries | rail |
| 07 | value | rail |
| 08 | testimonials | field |
| 09 | faq | field |
| 10 | contacts | rail |

Service page (`/<slug>`):

| # | Section | Variant |
|---|---|---|
| 01 | hero | field |
| 02 | capabilities | rail |
| 03 | scope | rail |
| 04 | process | field |
| 05 | related work | field |
| 06 | faq | field |
| 07 | contacts | rail |

**Chip numbers are page order, never content.** The same `Process` section is
03 on home and 04 on a service page, so the number cannot sit in the JSON
beside the label — the chip in `content/` carries `label` only. Each page
opens a counter (`lib/sections.ts`) and spends one number per numbered
section, in render order; every section takes the result as a required
`number` prop. Unnumbered strips (trusted by) never call it, and a section
that can be dropped — related work, when no case study matches — must not
call it when it isn't rendered, or the sequence gains a hole.

Because contacts closes the sequence and its number therefore differs per
route, the contacts band is rendered **by each page**, not by the root
layout. Each page owns its own `<main>` and its `<Footer>`.

**Band backgrounds.** Section background alternates by section, not by
variant:

| Section | Background |
|---|---|
| trusted by | `--bg-raised` (`#FFFFFF`) |
| results | `--paper-alt` (`#DBDBD3`) |
| work | `--dark` (`#202020`) |
| testimonials | `--paper-alt` (`#DBDBD3`) |
| faq | `--bg-raised` (`#FFFFFF`) |
| all others | `--paper` (`#F2F0EE`) |

`body` and `html` also sit on `--paper` so overscroll matches the page.

A section on `--dark` sets its base text colour to `--text-on-dark`; nothing
inside it should hardcode `--text-primary`.

**Mobile (below 768px).** The construction grid is a desktop device — below
md the 6-column grid, the orange spine, `GridLines` and `GridCrosshairs` are
all hidden (`hidden md:block`), `Container` drops to a 20px gutter (a media
query on `--grid-gutter` itself, so no component needs a mobile variant),
and `SectionShell`'s rail already collapses above the content field at full
width. That scaffolding is reflow — most sections need more than that.

Several sections use a spatial device that only reads with the whole
layout visible at once (a stagger, a horizontal connector, a side-by-side
split). Reflowing those into one column doesn't produce a smaller version
of the desktop design, it produces unexplained gaps and orphaned labels.
Those sections ship a **second, purpose-built mobile layout** gated with
`md:hidden` / `hidden md:...` alongside the desktop one, not a reflowed
variant of it:

| Section | Desktop device dropped on mobile | Mobile replacement |
|---|---|---|
| hero | tile cluster, system diagram (already `hidden md:block`) | static chip above H1 — the header's own chip only tracks scroll at md+ |
| services | 1×4 row, descriptions | 2×2, icon + mono title only |
| process | horizontal icon connectors, "DATA IN >" labels | vertical list, dotted line down the left connecting the number blocks |
| results | — | numeral / label / description stacked, 48px between stats |
| work | — | cover 4:3 (16:10 at md+), arrows right-aligned below the image |
| industries | always-visible capability list | 2×3, tap a cell to expand its list (chevron indicates state) |
| value | the 120px column stagger | plain 2×2 — a stagger only reads as deliberate side by side; serialised it's just empty space |
| testimonials | 4-thumbnail picker | swipe the portrait (`touchstart`/`touchend`, ~40px threshold); arrows stay as the discoverable control |

Two buttons stack full width with 0 gap and a shared 1px divider on mobile
(Hero's two CTAs) rather than each carrying its own border.

---

## 6. Design tokens

Defined in `src/styles/tokens.css` as CSS custom properties, surfaced to
Tailwind v4 via `@theme`. These are the starting values — tune in browser,
then update here. Never fork them into a component.

```css
:root {
  /* Surface — page/band backgrounds */
  --paper:          #F2F0EE;   /* default section background */
  --paper-alt:      #DBDBD3;   /* results, testimonials bands */
  --dark:           #202020;   /* work band, secondary buttons */
  --bg-raised:      #FFFFFF;   /* cards */
  --bg-overlay:     #EDEDEA;   /* hover states, inputs */
  --border-subtle:  rgba(207, 206, 204, 0.5);
  --border-strong:  #CFCECC;

  /* Text */
  --text-primary:   #202020;   /* near-black */
  --text-secondary: #5A5856;
  --text-muted:     #8A8886;
  --text-on-dark:   #F2F0EE;   /* text on --dark / --accent */
  --copy:           #616060;   /* body copy inside sections */
  --faint:          #9E9E9E;   /* captions, tile labels, meta */
  --text-on-fill:   #FFFFFF;   /* text on a filled button */

  /* Accent */
  --accent:         #E9762B;   /* warm orange — marks, not fills */
  --accent-hover:   #F58B44;
  --accent-muted:   rgba(233, 118, 43, 0.12);
  --spine:          #ED4F00;   /* spine, chip block, ticks, button strip */
  --spine-hatch:    #F4813C;   /* diagonal hatch on the system diagram */

  /* Construction grid lines — see §5 */
  --grid-line:        rgba(210, 206, 202, 0.65);
  --grid-line-solid:  rgba(210, 206, 202, 0.4);

  /* Decor */
  --tile-fill:      #E5E3E1;   /* numbered tile cluster */
  --topo:           #D2CECA;   /* topographic dot matrix */

  /* Radius — always zero. Do not add radius tokens above 0. */
  --r-sm: 0px;
  --r-md: 0px;
  --r-lg: 0px;
  --r-full: 0px;

  /* Grid — columns are fluid (1fr each), so there is no column-width token */
  --grid-max-width:   1520px;
  --grid-gutter:      32px;    /* side padding below 1560px only, 20px below 768px */
  --rail-heading-max: 370px;

  /* Motion */
  --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
  --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast:   200ms;
  --dur-hover:  400ms;  /* every hover-triggered transition, --ease-inout */
  --dur-base:   500ms;
  --dur-slow:   900ms;
}
```

Tailwind v4 must map `--radius-*` theme keys to `0px` so no `rounded-*`
utility (including `rounded-full`) can produce a visible radius, even if used
by mistake.

**Type scale** — fluid, `clamp()` based:

| Token | Use | Range |
|---|---|---|
| `--fs-display` | hero H1 | `clamp(36px, 3.8vw, 76px)`, line-height 1.0 |
| `--fs-h2` | section heading | 28px → 48px |
| `--fs-h3` | card heading | 20px → 28px |
| `--fs-body-lg` | lead paragraph | 17px → 20px |
| `--fs-body` | body | 15px → 17px |
| `--fs-label` | section chips, nav, buttons, stat lines | 15px, uppercase |
| `--fs-tile` | numbered tile cluster labels | 11px |

**Fonts:**
- **Inter**, weight 500, for the display H1 and section headings.
  Letter-spacing `-0.05em` on `--fs-display`. Sentence case, never all-caps.
- **Geist Mono**, uppercase, for section chips, nav, buttons, labels, and
  stat lines.
- Both loaded via `next/font/google`, exposed as CSS variables
  (`--font-inter`, `--font-geist-mono`), self-hosted at build — no external
  font requests at runtime.

**Spacing:** section vertical padding `clamp(80px, 10vw, 160px)`.
Container is the grid container from §5 (max-width `1520px`, gutter `32px`).

---

## 7. Motion rules

- Global smooth scroll via Lenis, `lerp: 0.1`.
- **Heading reveal (H1/H2 only):** left-to-right mask wipe — animate
  `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` over `--dur-slow` with
  `--ease-out`, triggered once on viewport entry. No opacity fade, no
  y-translate on headings.
- **Body/mono reveal (everything else):** opacity 0→1, y 20px→0,
  `--dur-base`, `--ease-out`, triggered once at 20% viewport entry.
- Stagger children by 60ms.
- **Hover transitions:** every hover-triggered transition — button fills,
  the button arrow/label slide, nav arrows, link opacity, testimonial
  thumbnails — runs on `--dur-hover` (400ms) with `--ease-inout`, never
  `--ease-out`. `--ease-out` is for scroll-triggered reveals only. Button's
  `→` slides in from `opacity 0 / translateX(-12px)`, pushing the label
  20px right; primary and secondary behave identically.
- **Header chip** tracks the section holding the viewport midpoint, via
  `IntersectionObserver` with `rootMargin: "-50% 0px -50% 0px"`. Gaps
  between observed sections hold the last value rather than clearing.
- **Testimonials swipe (mobile only):** `touchstart`/`touchend` on the
  portrait, ~40px horizontal threshold, ignored if the drag is more
  vertical than horizontal so page scroll still works.
- Counters animate on first view only.
- Marquee (if used): CSS `translateX` keyframes, pauses on hover.
- **Always respect `prefers-reduced-motion`.** Wrap every animation.
- No parallax on mobile.

---

## 8. Assets — generated, not downloaded

- Backgrounds/washes: generated SVG (dot-matrix topographic wash, layered
  paths), never a raster PNG.
- Icons: `lucide-react` only.
- Integration logos: `simple-icons` SVG paths, rendered at `--text-secondary`.
- OG image: Next.js `opengraph-image.tsx`, generated at build.
- Avatars: placeholder until the owner supplies real ones. Mark every
  placeholder with a `TODO: replace` comment.

**Dither.** Every 1-bit image on the site goes through the same treatment.
There is no component called `Dither`. The shared matrix and constants live
in **`lib/halftone.ts`**; `DitheredCover` is the path a real photograph
takes, and `DitherImage` / `DitherAvatar` are the generated stand-ins for
portraits. The old `Halftone` component — which faked a photograph from a
procedural tonal field — was removed; do not reintroduce that approach.

- **4×4 ordered (Bayer) matrix**, `BAYER4` in `lib/halftone.ts`. One matrix,
  shared — do not fork a second one into a component.
- **Pixel size 2–3px.** Resolution is derived from the rendered width so the
  dithered pixels land at roughly that size. At 8–10px the subject collapses
  into a checkerboard.
- **Contrast normalisation is mandatory.** Stretch the source to its own
  min/max range, then push tones away from mid grey by `DITHER_CONTRAST`
  (1.35) before thresholding. Skipping this is what turns a flat image into
  an even field of dots.
- **The subject must be recognisable at 400px wide.** This is the acceptance
  test. A dithered image that fails it is not a stylised image, it is a
  broken one — use the construction block instead (see below).
- **Never fake a photograph procedurally.** A generated tonal field dithers
  into noise, not a subject. Where real imagery has not been supplied yet,
  the stand-in is an honest construction block: flat `--dark`, the dashed
  column grid, and the subject's name in the mono label face.

**Case study covers.** `public/images/case-studies/<slug>/cover.jpg`.
The file is optional and checked for at build time (`lib/case-studies`):
absent, the card renders the construction block; present, it runs through
`DitheredCover`. Adding a cover is dropping the file in — there is no code
change and no content field to set.

---

## 9. Content schema

`content/site.json` holds `nav`, `footer`, `socials`, and:

```json
"links": {
  "bookCall": "<cal.com URL — owner supplies>"
}
```

Every CTA in the site reads from this one key. There is **no contact page**,
**no contact form and no form backend** — booking a call is the only path
in. The link opens in a new tab with `rel="noopener noreferrer"`.

CTA labels stay page-specific (the FAQ's "Get in touch", a service Scope's
"Talk through your stack") — one destination, not one label.

Case study MDX frontmatter:

```yaml
---
title:
client:
slug:
summary:        # one line for the listing card
services: []    # maps to service page slugs
year:
cover:          # /images/case-studies/<slug>/cover.jpg
metrics:        # exactly 3
  - label:
    value:
problem:
approach:
outcome:
---
```

---

## 10. Git & deploy workflow

- `main` = production → onedrag.in
- `edit/<short-topic>` = every change, no exceptions
- Never commit directly to `main`
- Commit format: `feat|fix|content|style: short imperative summary`
- After pushing a branch, report the Vercel preview URL to the owner
- Merge to `main` only when the owner says "ship it"
- Rollback: `git revert` on main, or tell the owner to use Vercel's
  Instant Rollback in the dashboard

---

## 11. Quality gates before any "ship it"

- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] Tested at 375px, 768px, 1280px, 1920px
- [ ] No console errors or warnings
- [ ] All images have `alt`; decorative ones `alt=""`
- [ ] `prefers-reduced-motion` verified
- [ ] Every page has unique `title` + `description`
- [ ] No `TODO: replace` placeholders remaining
- [ ] No visible rounded corners anywhere
- [ ] `npm run build` passes clean

---

## 12. How to work with the owner

He is a product designer — he reads design decisions fluently but is not
writing the code. So:

- Propose, then build. Don't ask permission for obvious implementation details.
- When a visual choice has tradeoffs, name them in one line and pick a default.
- Show the preview URL, not the diff, for visual changes.
- Be blunt about what won't work. He prefers a "no" with a reason over a
  half-working yes.
