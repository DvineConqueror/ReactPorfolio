---
name: Henry Alicoben — Bryl Portfolio
description: Monochrome engineering portfolio with work-led editorial presentation.
colors:
  background: "#fff"
  foreground: "#0a0a0a"
  muted: "#626262"
  subtle: "#fafafa"
  fill: "#f5f5f5"
  border: "#e9e9e9"
  strong-border: "#d4d4d4"
  dark-background: "#0c0c0f"
  dark-foreground: "#f4f4f5"
  dark-muted: "#a0a0a8"
  dark-subtle: "#18181b"
  dark-fill: "#1e1e22"
  dark-border: "#2a2a30"
  dark-strong-border: "#3a3a42"
  contrast-muted: "#333"
  contrast-border: "#888"
  contrast-strong-border: "#555"
  dark-contrast-muted: "#ddd"
  dark-contrast-strong-border: "#aaa"
typography:
  display:
    fontFamily: "Geist Pixel, Geist Mono, monospace"
    fontSize: "clamp(2rem, 4.2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Geist Pixel, Geist Mono, monospace"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-.02em"
  project-title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.02em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    lineHeight: 1.6
  summary:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: ".95rem"
    lineHeight: 1.5
  supporting-body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: ".8rem"
    lineHeight: 1.6
  control:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: ".8rem"
    fontWeight: 500
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: ".75rem"
    lineHeight: 1.6
  metadata:
    fontFamily: "Geist Mono, monospace"
    fontSize: ".62rem"
    lineHeight: 1.6
    letterSpacing: ".03em"
  caption:
    fontFamily: "Geist Mono, monospace"
    fontSize: ".65rem"
  chip:
    fontFamily: "Geist Mono, monospace"
    fontSize: ".63rem"
    lineHeight: 1.5
  fine-print:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: ".7rem"
    lineHeight: 1.6
rounded:
  field: "6px"
  control: "8px"
  container: "12px"
  viewer: "16px"
  pill: "999px"
spacing:
  small: ".5rem"
  compact: ".75rem"
  base: "1rem"
  medium: "1.25rem"
  large: "1.5rem"
  heading-gap: "2rem"
  row-gap: "2.5rem"
  section: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: ".7rem 1rem"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: ".7rem 1rem"
  field:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.field}"
    padding: ".8rem"
  chip:
    textColor: "{colors.muted}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: ".2rem .55rem"
---

# Design System: Henry Alicoben — Bryl Portfolio

## Overview

**Creative North Star: “Quiet technical zine.”**

Bryl minimal is the approved visual authority: monochrome surfaces, pixel display type, mono metadata, fine rules and restrained framing. The artifact leads and the interface recedes. The density is compact enough to introduce selected work in the first desktop viewport, with room around screenshots and readable project summaries.

Original project screenshots and certificates retain their colors. The portrait starts grayscale and offers a color toggle. On hover-capable fine pointers, a dense generated head-pose sheet follows nearby cursor position through intermediate angles; the supplied real portrait replaces the earlier emoji photo. A single static halftone field sits behind its lightly rotated frame. The favicon is a matching monochrome pixel “ha.” monogram.

**Key Characteristics:**

- Pixel headings and numbered sections; sans-serif reading text and mono metadata.
- Black/white inversion for primary actions; neutral tonal surfaces for structure.
- Contained project media, source-backed credentials and accessible in-site viewers.

## Colors

The normative palette above maps directly to the root CSS variables in `src/index.css`; it has no chromatic accent.

### Primary

Foreground ink defines primary text and inverted action backgrounds; background paper supplies their text. The dark theme reverses these roles using the corresponding dark tokens.

### Neutral

Muted supports descriptions and metadata. Subtle backs fields, media frames and the résumé card; fill handles hover and document-reader wells. Border separates sections and surfaces; strong-border outlines actionable controls and chips. Original media colors are preserved rather than remapped into the palette.

Default theme follows the OS. Explicit light, dark and system choices persist. Increased contrast replaces muted and rule colors with the contrast tokens. Selection uses foreground/background inversion.

**The Ink Action Rule.** Use neutral inversion for primary actions; keep the interface monochrome while preserving source media.

## Typography

**Display Font:** Geist Pixel Square, exposed as Geist Pixel, with Geist Mono and monospace fallbacks. The Square WOFF2 and its license live in `src/assets/fonts`.

**Body Font:** Geist, with system-ui and sans-serif fallbacks; locally bundled through @fontsource at weights 400, 500 and 600.

**Label/Mono Font:** Geist Mono 400, locally bundled through @fontsource. No article surface exists, so no long-form serif role is used.

### Hierarchy

Frontmatter records the reusable roles. The root is 15px, so rem values resolve against that base; the implementation uses observed sizes rather than a fabricated modular ratio.

- Display uses the fluid display role, a 17ch maximum line length and a phone override (2.15rem below 768px). Identity initials use the same pixel face (2rem, becoming 3rem at 1024px).
- Section headlines use the fluid headline role. Their muted section numbers are relative (0.7em), not independent headings. Keep the approved numbering.
- Project titles use the project-title role. Certificate titles use 1.1rem/1.4; dialog headings use 1.3rem/1.2. Small subsection headings range from .9rem to 1.05rem.
- Hero introduction uses .95rem/1.6, at most 48ch, becoming .88rem on phones. Project summary uses the summary role. Section descriptions use .86rem/1.6, at most 65ch.
- Supporting paragraphs, disclosures and certificate descriptions recur at .8rem; project paragraphs use .82rem, becoming .87rem on phones alongside disclosures. Form fields use .87rem, with an explicit 16px phone override.
- Labels and social links recur at .75rem; form notes and skill headings use .78rem. Navigation is .85rem, increasing to 1.5rem inside the mobile menu.
- Mono metadata uses the metadata role in uppercase; certificate kinds share its size with .06em tracking. Preview captions use the caption role; dates use .67rem. Chips use the chip role. Phone project metadata and chips become .67rem and preview hints .7rem.
- Mono navigation numbers and sidebar location use .6rem; footer uses .62rem/1.7. Fine print and project footer use .7rem; PDF toolbar uses mono .7rem, becoming .65rem on phones. Text actions use .76rem.

**The Pinned Type Rule.** Preserve the approved Geist pairing, pixel section headings and mono metadata; generic font or typography preferences do not override this direction.

## Layout

The desktop breakpoint (1024px) introduces a fixed sidebar (14rem wide) and main surface with horizontal gutters (`clamp(2rem,5vw,5rem)`) and maximum outer width (`calc(56rem + 10rem)`). At 1500px the main surface centers with a 7rem translation to account for the sidebar. Smaller viewports use a sticky top bar, main maximum width (60rem), and gutters (1.5rem).

Four featured project rows split image/copy (1.1fr/1fr), separated by a 1.75rem gap; project-to-project rhythm is 2.5rem. Media remains sticky on larger screens. Four other projects use a compact two-column grid from 768px, one column below. Their previews contain the full image, including portrait SmartDTR; small Typeroo images are not enlarged beyond their source resolution in the viewer. Certificates form two columns, approach items three, and contact divides .8fr/1.2fr. Section blocks use a top hairline and 3.5rem vertical padding.

Below 768px, gutters become 1rem, projects/certificates/approach/contact stack, media becomes static and sections use 2.75rem padding. The hero retains a portrait column (8rem), switching to one column with a 10rem portrait below 381px. Name/email fields also stack at that narrow breakpoint. The menu occupies the viewport; the phone résumé reader uses the full viewport and safe-area padding.

## Elevation & Depth

Hairlines and tonal layering carry most structure. The shared light-theme media shadow is `0 8px 22px -14px #0004`; explicit dark theme sets it to none. On hover-capable devices, project previews rise 2px with `0 18px 36px -20px #0006`. Dialogs use `0 40px 90px -20px #0006`, a translucent black backdrop (`#0007`) and an 8px blur. White PDF pages retain their document appearance with `0 4px 12px #0002`.

The sticky mobile header uses a 92% background mix and 16px blur. Reduced transparency removes blurs, restores solid header surfaces and strengthens the dialog backdrop (`#000b`). Increased contrast also makes the header opaque.

## Shapes

Soft rectangular frames organize evidence: fields (6px), controls and inset images (8px), portrait/certificate/résumé frames (12px), and project/dialog frames (16px). Stack chips alone use pill corners (999px). Borders are 1px. The portrait frame rotates 3 degrees, with a 4:5 cover-fit portrait; project media and certificates use contain-fit images so their contents remain visible.

## Components

### Buttons and links

Controls are compact and quiet: button padding (.7rem 1rem), minimum height (44px), strong border and control radius. Icon controls are 44px square. Primary buttons invert ink/paper and hover at .86 opacity; secondary buttons use the fill surface on hover. Disabled buttons use .5 opacity and a not-allowed cursor. Focus uses a 2px ink outline with 4px offset. Press feedback scales to .97 over 100ms; link arrows travel 2px diagonally over 200ms.

The icon theme control retains system/light/dark cycling. Effective palette changes reveal through a 20-point stepped pixel aperture originating at the active control, using a 580ms native View Transition with cubic-bezier(.4,0,.2,1). The shape echoes the pixel wordmark rather than a circular wipe. New root snapshots sit above the old without blending; ordinary color transitions are suppressed only during the reveal to avoid mixed-theme text. Same-palette selections skip the reveal. Rapid requests cancel old snapshots and stale callbacks; reduced motion switches directly, including when enabled mid-animation. Unsupported APIs preserve normal palette selection. System preference updates remain automatic; no looping effect or additional dependency is introduced.

### Seasonal modes

The adjacent season icon offers Off, Halloween and Christmas in an anchored nonmodal picker. Season/motion preferences are manual, remembered separately from palette, and default to Off/motion-on. Native popover dismissal is reused with an inline positioned fallback; React 18's missing popover props are handled on the native DOM element. Escape/selection restore the trigger; mobile navigation remains the parent dialog. Pointer opening uses a 180ms opacity/.97-scale transition; keyboard interaction is immediate.

Original inline SVG pixel folk-art sits in a reserved hero-bottom scene: 112px at 768px and above, 80px on phones. Halloween includes stitched scarecrow, lanterns, cobwebs, spider, ghost and fence/grave silhouettes. Christmas includes snowy cabin/pines, decorated tree, gifts, mistletoe and a top-edge light string. Scene layers crossfade over 200ms; inactive layers have no running animations. Off unmounts both scenes and all atmospheric elements immediately. Artwork is aria-hidden, unfocusable and pointer-transparent. Phone art crops only spare background scenery, retaining the main figures.

Seasonal color stays in artwork/control accents: Halloween #9a3412 in light and #fdba74 in dark; Christmas #166534 in light and #86efac in dark. Page ink/surfaces, portrait, screenshots, certificates and documents retain their original palette. Snow is subtle and behind content; lights occupy only the upper 12px of chrome, clear of controls. Desktop webs occupy the spare right gutter; phones keep webs in the scene.

Snow uses 32 deterministic transform-only CSS flakes, with only 16 displayed/animated below 768px, 10–18s linear falls and negative delays. Lantern/window/light brightness varies with opacity over 3400ms; the spider enters once over 480ms. Motion pauses for hidden pages, open dialogs, theme snapshots and the visitor pause switch, without replacing particles. Reduced motion removes snow/movement/pulsing while retaining static scene art and explains the device override. Increased contrast hides snow; reduced transparency keeps the picker solid. Seasonal selection/motion changes settle any pending theme snapshot to the requested palette first. No new dependencies or animation clock.

### Chips and evidence frames

Stack chips use the strong border, muted mono labels and compact pill padding. Featured project previews show a snapshot count below contained images (4:3, switching to 16:10 on phones); other-project previews use 16:10. Every project has an explicit Explore project action. One project dialog combines contained screenshots, count/caption, multi-image navigation/thumbnails, overview, Developer role, contributions, feature bullets, full stack and Source link when available. Unknown metadata is omitted. The centered desktop panel is at most 56rem; below 768px it fills 100dvh with safe-area padding and a sticky close/header row. Native dialog focus/inertness and the shared Lenis/body scroll lock are reused; galleries never open a second modal. Certificate previews retain their complete source ratio (792:612) and open full previews with original downloads.

### Inputs and fields

Fields use subtle surfaces, strong borders, field radius and .8rem padding. Name/email share a row until the narrow breakpoint. Labels sit above their fields; invalid fields use ink borders and inline text. Error communication stays monochrome with explicit text. Keep the 16px phone input size and visible focus treatment.

### Navigation

Muted links become ink on hover/current state; a directional arrow appears alongside the current or hovered destination. Desktop uses the fixed sidebar; smaller screens use a full-screen native dialog. A single 44px icon cycles system → light → dark. Monitor, sun and moon show the current choice; the accessible name and tooltip describe the next action. The same icon appears inside mobile navigation. Theme persistence and system preference remain unchanged.

### Viewers

Native dialogs provide focus containment, Escape dismissal, background inertness and restored focus. Project galleries keep controls, captions and thumbnails visible. Résumé access begins with Turnstile; successful verification reveals the selectable, zoomable PDF reader. Certificates remain public. Supplied document contents remain unchanged.

### Motion and preferences

Dialog entry takes 200ms with opacity and scale (.97 to 1); the shared ease is `cubic-bezier(.16,1,.3,1)`. Theme surfaces transition over 500ms. Portrait grayscale toggles over 350ms. Lenis smooths wheel/programmatic navigation while touch remains native. Reduced motion removes smoothing, transitions, animation and decorative hover movement. Only the loading indicator loops; the hero halftone stays static.

Portrait tracking maps pointer position continuously into a 6×6 atlas of 36 generated poses. A time-based 110ms damping response carries the current head angle toward its target, including through neutral on reversals; elapsed time is capped to avoid a jump after a stalled frame. Small frame-boundary overlap prevents jitter. Only one fully opaque atlas image is displayed: no photo crossfades or animated sprite-coordinate sliding. One requestAnimationFrame loop runs only while the head is settling, and the portrait frame stays anchored. The 260px nearby radius, color toggle, pointer-departure/scroll/blur resets and static original on touch/coarse pointers, reduced motion or loading failure remain. The shipped source is `src/assets/portrait/real-atlas.webp`; its generated PNG and exact prompt are retained alongside it. The new favicon URL includes a version suffix so browsers fetch the updated design.

## Do's and Don'ts

### Do:

- **Do** preserve pixel display type, mono metadata, numbered headings and neutral inversion.
- **Do** contain screenshots and document previews, retaining original source colors and contents.
- **Do** keep 44px action targets, visible focus, keyboard-operable viewers and preference-aware presentation.
- **Do** use the observed small text roles intentionally; extend existing roles before inventing a new scale.

### Don't:

- **Don't** replace the pinned Bryl typography with generic font recommendations.
- **Don't** add a chromatic interface accent or looping decorative backgrounds.
- **Don't** crop project evidence, rewrite supplied documents or introduce unsupported claims or metrics.

## Design Direction Contract
THESIS: Quiet technical zine; the artifact leads and interface recedes.
OWN-WORLD: Bryl monochrome, pixel display, mono metadata, hairlines, generous rhythm.
STORY: Introduction → four featured and four other projects → working approach and skills → source-backed credentials → GitHub activity → contact and protected résumé.
FIRST VIEWPORT: Identity/sidebar, concise introduction, portrait/halftone and beginning of selected work on desktop; compact header/introduction on mobile.
FORM: Sidebar-to-overlay navigation, split project rows, contain-fit media, accessible modal viewers.
SIGNATURE INTERACTION: Project preview opens an image-focused gallery; résumé transitions from human verification to a selectable, zoomable document without leaving the site.

## Seasonal atmosphere and activity follow-up

Seasonal mode is an explicit exception to neutral-only styling: dim parchment/plum for Halloween light, deep plum for Halloween dark, evergreen winter surfaces for Christmas. Keep foreground contrast readable. Original curve-web SVGs and silk-mounted spiders stay in gutters; lightning uses one low-opacity pulse every 17 seconds, never rapid strobing. Only opacity/transform animate. Device reduced motion removes weather/flash animation; the visitor's motion switch pauses decorations and hides lightning. Sidebar/menu controls and project imagery stay clear.

The GitHub section reuses pixel statistic numerals, mono metadata, hairlines and contained surfaces. Heatmap levels follow the selected seasonal accent; the base palette uses muted green. Use a scrollable calendar on small screens and a disclosure with daily count table for keyboard/touch access. All totals and streaks name their date range. Data loading/failure states keep the profile link available.

Christmas character scene: original pixel snowman, reindeer, Santa, two elves and presents form a small winter village. Scale the Christmas scene separately on phones to keep the complete cast visible. Top mistletoe occupies the outer corners below the mobile header. Dark Christmas has midnight navy surfaces and broad green/violet aurora curtains behind content; a 28-second opacity/transform cycle includes a dark interval. Pause/reduced-motion states use a static faint curtain, while contrast/transparency preferences remove it.

## Portfolio review polish

On phones, give the greeting and headline full width, then pair the introduction with the portrait. Below 380px, stack the portrait. Keep work, résumé and email actions early. Supporting project text is larger; full technical skills and credential images use native disclosures to shorten the initial reading path.

Featured rows identify “My part”; dialogs separate the problem, contribution, engineering decision and inspectable evidence. Preserve original screenshots with contain fit. Project URLs and announced copy-link status make individual work shareable.

Hover feedback uses 200ms and existing easing, with moving image/link effects limited to fine pointers. Keyboard section activation and device reduced motion use immediate navigation. Existing portrait, seasonal effects and theme transitions retain their own controls. Motion audit: plans/portfolio-motion.md.
