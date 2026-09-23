---
name: Krishiq Editorial Agronomics
colors:
  surface: '#f1fdf1'
  surface-dim: '#d1ddd2'
  surface-bright: '#f1fdf1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf7eb'
  surface-container: '#e5f1e5'
  surface-container-high: '#dfebe0'
  surface-container-highest: '#dae6da'
  on-surface: '#141e17'
  on-surface-variant: '#424842'
  inverse-surface: '#28332b'
  inverse-on-surface: '#e8f4e8'
  outline: '#727972'
  outline-variant: '#c2c8c0'
  surface-tint: '#48654f'
  primary: '#072413'
  on-primary: '#ffffff'
  primary-container: '#1e3a27'
  on-primary-container: '#85a48b'
  inverse-primary: '#aecfb4'
  secondary: '#835400'
  on-secondary: '#ffffff'
  secondary-container: '#ffb54b'
  on-secondary-container: '#714800'
  tertiary: '#00250d'
  on-tertiary: '#ffffff'
  tertiary-container: '#003d19'
  on-tertiary-container: '#69ab76'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#caebcf'
  primary-fixed-dim: '#aecfb4'
  on-primary-fixed: '#042110'
  on-primary-fixed-variant: '#314d39'
  secondary-fixed: '#ffddb5'
  secondary-fixed-dim: '#ffb957'
  on-secondary-fixed: '#2a1800'
  on-secondary-fixed-variant: '#643f00'
  tertiary-fixed: '#adf3b8'
  tertiary-fixed-dim: '#92d69d'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#0a5226'
  background: '#f1fdf1'
  on-background: '#141e17'
  surface-variant: '#dae6da'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 34px
  headline-sm:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
  metric-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.03em
  metric-compact:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative, bespoke agrarian-economic medium tailored for Indian agricultural smallholders, progressive agronomists, and agri-fintech stakeholders. The visual posture moves away from lightweight consumer tech and generic neon-tinted SaaS templates; instead, it adopts the dignity of an archival trade journal combined with the precision of a institutional commodity terminal.

The aesthetic philosophy draws directly from **high-craft editorial publishing** paired with **functional agricultural data-density**:
- **Tactile Paper Substrate:** The UI rests upon an organic, unbleached cotton-paper canvas that reduces visual fatigue in high-ambient-light outdoor field settings while conveying natural heritage.
- **Razor-Sharp Precision:** Layouts employ hair-thin 1px mechanical lines and muted sand-tinted dividers, enforcing systematic discipline reminiscent of ledger sheets, soil survey maps, and mandi price gazettes.
- **Architectural Framing:** Broad, generous interior card paddings contrast with tight, information-dense telemetry modules, creating an intentional rhythm between serene prose and sharp numerical utility.
- **Anti-SaaS Pragmatism:** Gradients, floating blurs, and neon accents are entirely replaced with matte color blocking, solid harvest-amber focal points, deep forest green anchoring, and ink-toned typographic hierarchy.

## Colors

The palette is rooted in the organic spectrum of fertile topsoil, mature foliage, and dry grain, anchored onto an archival neutral base:

- **Canvas & Surfaces:**
  - `canvas-default` (`#FBFBF7`): Unbleached woven paper base. Never use pure white (`#FFFFFF`) for global backgrounds.
  - `surface-subtle` (`#F0EFEA`): Muted sand tier for nested metrics, input enclosures, and inset table headers.
  - `surface-elevated` (`#FFFFFF`): Reserved exclusively for interactive cards, dialog overlays, and focal summary blocks requiring crisp separation against the paper backdrop.
- **Structural Lines:**
  - `border-hairline` (`#E5E7EB`): Crisp structural 1px rule for framing cards and separating table records.
  - `border-subtle` (`#E0DFD5`): Sand-tinted border for low-contrast separation within paper fields.
- **Primary Ink & Brand Tiers:**
  - `ink-primary` / `neutral` (`#141E17`): Deep soil charcoal-ink. Used for editorial headlines, dense metrics, and high-contrast iconography.
  - `ink-muted` (`#526056`): Mid-tier leaf-slated charcoal for secondary field labels and caption prose.
  - `brand-primary` (`#1E3A27`): Deep forest green. Drives primary conversion buttons, authoritative status badges, and institutional anchors.
  - `brand-secondary` (`#E39D34`): Warm harvest amber. Delivers high-visibility highlights, yield triggers, and market alert callouts.
  - `brand-tertiary` (`#2E6F40`): Soft leaf green. Dedicated to positive economic delta indicators, live mandi pricing upward swings, and biological crop-health confirmations.

## Typography

The typographic balance relies on intentional friction between classical literature and computational utility:

- **Editorial Serifs (Newsreader):** Used across display titles, hero narratives, section openings, and quote pulls. Display cuts should feature proportional, relaxed line-heights with slight negative tracking to emulate physical typeset printing. It conveys integrity and institutional weight.
- **Geometric Sans (Plus Jakarta Sans):** Selected for high legibility under harsh sunlight conditions. Used exclusively for body narrative, UI labels, data grids, currency readouts (₹ INR), tabular figures, and dynamic chart ticks.
- **Numerical Treatment:** All tabular economic data must enforce tabular lining figures (`font-variant-numeric: tabular-nums lining-nums`) to align currency indicators and tonnage decimals effortlessly across vertical columns.
- **Label Micro-Formatting:** Small operational indicators (`label-sm`) utilize full uppercase formatting with elevated letter spacing (`0.06em`) to establish visual contrast alongside editorial headings.

## Layout & Spacing

Layouts follow an asymmetric, structured grid designed for hybrid editorial pacing:
- **Desktop Grid:** 12-column responsive layout with max container constraint of `1280px`. Outer margins sit at `3rem` (`48px`) to maintain breathing space around content blocks.
- **Tablet Grid (768px - 1024px):** 8-column layout with `2rem` outer margin and `1.25rem` gutter.
- **Mobile Grid (< 768px):** 4-column layout with `1.25rem` margins. All dense side-by-side metric tiles convert into stacked vertical ledgers or horizontal kinetic carousels.
- **Spatial Rhythm:**
  - Component interiors rely heavily on `space-lg` (`24px`) and `space-xl` (`40px`) to prevent visual crowding.
  - Micro-metric groups (soil pH, moisture %, mandi ticker) use `space-xs` and `space-sm` for dense, unified grouping.
  - Section dividers leverage hairline horizontal borders anchored by `space-xl` top and bottom cushions.

## Elevation & Depth

This design system deliberately eschews standard diffuse SaaS drop-shadows. Depth is articulated purely through **material layering**, **hairline boundaries**, and **ambient ground contact**:

- **Subtle Surface Tiers:**
  - Canvas: Base `#FBFBF7`.
  - Recessed/Grouped Areas: `#F0EFEA` (no borders needed when sitting directly on paper canvas).
  - High Cards: Solid white (`#FFFFFF`) delineated strictly by a crisp, uniform `1px solid #E5E7EB` outline.
- **Contact Shadows:** When an interactive element hovers or an economic modal lifts, use a physical, low-diffusion soil-tinted contact shadow:
  - *Resting Card:* `0px 1px 2px rgba(20, 30, 23, 0.04), 0px 0px 0px 1px #E5E7EB`
  - *Floating Layer / Action Hover:* `0px 8px 24px -4px rgba(20, 30, 23, 0.08), 0px 2px 6px -1px rgba(20, 30, 23, 0.04), 0px 0px 0px 1px #E0DFD5`
- **Zero Glassmorphism:** No backdrop blurs or translucent frosted materials. Every sheet is opaque, tactile, and reminiscent of heavy card stock.

## Shapes

The shape architecture balances structural precision with comfortable organic handling:
- **Primary Content Enclosures & Cards:** Utilize an intentional `24px` to `32px` corner radius (`rounded-xl`). This wide, smooth curvature softens the technical data density and evokes the organic boundaries of cultivated land plots.
- **Small Interactive Units:** Buttons, micro-badges, form controls, and table chips scale down to standardized `8px` (`0.5rem`, `roundedness: 2`) or full pill (`rounded-full`) geometry depending on role.
- **Hairline Integration:** Every rounded card must pair its radius with the corresponding `1px solid` border tone to prevent blurred antialiasing along edge curves.

## Components

### Buttons
- **Primary Action:** Solid Deep Forest Green (`#1E3A27`) with unbleached paper ink text (`#FBFBF7`). Padding: `12px 24px`. Roundedness: `8px`. Hover state subtly deepens tone to `#14271A` with a micro-lift contact shadow.
- **Secondary / Accent:** Warm Harvest Amber (`#E39D34`) solid background with Deep Soil Ink (`#141E17`) typography for immediate economic calls to action (e.g., "Lock Mandi Price", "Run Soil Scan").
- **Tertiary / Outlined:** Transparent background with `1px solid #E5E7EB`, text `#1E3A27`. On hover, fills with `#F0EFEA`.

### Cards
- **Editorial Insight Card:** Grounded on `#FFFFFF`, radius `24px`, padding `32px`, bordered by `1px solid #E5E7EB`. Contains an overline category in `label-sm` Harvest Amber, followed by an editorial Newsreader serif title, body prose, and an anchored micro-metrics ledger at the base.
- **Telemetry Tile:** Recessed background (`#F0EFEA`), radius `16px`, padding `16px 20px`. Displays compact tabular numbers (`metric-display`) with currency or percentage tags in `ink-muted`.

### Micro-Metrics & Data-Dense Badges
- **Economic Delta Badges:** Pill-shaped (`rounded-full`), padding `4px 10px`.
  - Positive Yield / Profit Delta: Soft Leaf Green surface tint (`rgba(46, 111, 64, 0.1)`) with `#2E6F40` bold tabular text.
  - Market Alert / Volatility: Amber surface tint (`rgba(227, 157, 52, 0.12)`) with `#996315` text.
- **Mandi Status Indicator:** Minimal circular pulse (6px dot) encased in a hairline ring, paired with a small mono-numeric readout of daily arrivals (quintals/rate).

### Input Fields
- Enclosed containers with `#FFFFFF` background resting on `#F0EFEA` or canvas background, framed by `1px solid #E5E7EB`.
- Height: `48px`, internal horizontal padding: `16px`, border-radius: `8px`.
- Active / Focus: Border changes cleanly to `#1E3A27` with a zero-blur outline ring `2px solid rgba(30, 58, 39, 0.15)`. No default browser glow.
- Labels sit outside the field above the box in `label-md` Soil Ink (`#141E17`).

### Checkboxes & Radios
- Size: `20px x 20px` square (`rounded: 4px`) for checkboxes; `20px` circular for radios.
- Border: `1.5px solid #526056`. Checked state: solid fill `#1E3A27` with sharp white SVG checkmark.

### Lists & Data Tables
- Header: Grounded on `#F0EFEA`, uppercase `label-sm` lettering, `12px 16px` padding, bottom border `1px solid #E0DFD5`.
- Rows: Background `#FFFFFF`, alternating optionally with `#FBFBF7`. Bottom border `1px solid #E5E7EB`. Hover changes row background to `#F5F4EE`.
- Numeric columns right-aligned with `tabular-nums`; text columns left-aligned with editorial metadata support.