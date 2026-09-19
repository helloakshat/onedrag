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
  The number block is a solid `--spine` 33×33 square; the label block sits on
  `--border-subtle` with `0 12px 0 10px` padding. No separator, no gap
  between the two blocks — they read as one object.
- **Orange is a mark, not a fill.** Use `--accent` for chip numbers, the 1px
  left strip on primary buttons, corner ticks, and small emphasis marks.
  Avoid large orange fills.
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
  services/
    n8n-automation.json
    shopify-website.json
    framer-website.json
    product-design.json
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

Assignment (in build order):

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

**Band backgrounds.** Section background alternates by section, not by
variant:

| Section | Background |
|---|---|
| results | `--paper-alt` (`#DBDBD3`) |
| testimonials | `--paper-alt` (`#DBDBD3`) |
| work | `--dark` (`#202020`) |
| all others | `--paper` (`#F2F0EE`) |

A section on `--dark` sets its base text colour to `--text-on-dark`; nothing
inside it should hardcode `--text-primary`.

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
  --bg-overlay:     #EDECE9;   /* hover states, inputs */
  --border-subtle:  rgba(207, 206, 204, 0.5);
  --border-strong:  #CFCECC;

  /* Text */
  --text-primary:   #101010;   /* near-black */
  --text-secondary: #5A5856;
  --text-muted:     #8A8886;
  --text-on-dark:   #F4F3F1;   /* text on --dark / --accent */

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
  --tile-label:     #9E9E9E;
  --topo:           #D2CECA;   /* topographic dot matrix */

  /* Radius — always zero. Do not add radius tokens above 0. */
  --r-sm: 0px;
  --r-md: 0px;
  --r-lg: 0px;
  --r-full: 0px;

  /* Grid — columns are fluid (1fr each), so there is no column-width token */
  --grid-max-width:   1520px;
  --grid-gutter:      20px;    /* side padding below 1560px only */
  --rail-heading-max: 370px;

  /* Motion */
  --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
  --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast:   200ms;
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
| `--fs-display` | hero H1 | `clamp(44px, 3.8vw, 76px)`, line-height 1.0 |
| `--fs-h2` | section heading | 32px → 60px |
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

---

## 9. Content schema

`content/site.json` holds `nav`, `footer`, `socials`, and:

```json
"links": {
  "bookCall": "<cal.com URL — owner supplies>",
  "getInTouch": "<Typeform URL — owner supplies>"
}
```

Every CTA in the site reads from these two keys. There is **no contact page**.
Both links open in a new tab with `rel="noopener noreferrer"`.

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
