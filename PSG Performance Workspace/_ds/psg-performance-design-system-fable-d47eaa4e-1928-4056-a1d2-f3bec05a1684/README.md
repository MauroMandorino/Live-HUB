# PSG Performance Design System: V1

The design language of a football performance department: black ink type on a near-white canvas, a 100–1000 neutral gray scale that gives every divider and disabled state its own deliberate step, a single **accent** (`--accent #141428`: PSG Bleu Nuit, the deepest charte blue, one family with the crest navy) that carries every action and active state, and a meaning-locked **status palette** for the player, squad, and workflow states the department tracks daily. Type is **Virage** (PSG's proprietary title face) at display scale, **Geist** for everything narrative, and **Geist Mono** for the technical/data layer: metric labels, code, terminal mockups, section eyebrows. The signature shape is the **diagonal card corner**; the signature surface is the **flat-navy hero band** carrying the colossal crest watermark; a first-class **dark mode** ships with the system. **Gradients are retired.**

---

## Signature decisions

The load-bearing choices that make the system recognisable. Each is token-level and inherited everywhere automatically.

- **One accent, system-wide.** `--accent #141428`: PSG Bleu Nuit (charte Pantone 2768C, RVB 20 20 40), the deepest charte blue, one family with the crest navy. Dark mode lifts it to a light periwinkle so actions and icons stay legible. Four sub-tokens drive every primary / active surface, light and dark; `--link` aliases it. Kept strictly separate from status so it never leaks into a badge.
- **Diagonal card corners.** `--radius-md/lg/xl` are `0 8px 0 8px` etc (square TL+BR, rounded TR+BL) at card scale. Controls, pills, inputs and badges stay uniform. Need a uniform card corner (e.g. an image cap)? Use `--radius-*-uniform`.
- **Meaning-locked status badge** (`.ds-status`). Six states (green / amber / blue / grey / red / gold), each a soft bg + deep fg. Stays a pill: the diagonal corner does not apply. The leading dot is retired system-wide (decision 08C): the tinted pill alone carries state; `--st-*-dot` tokens survive only as chart/legend key marks and the `--success/--warning/--error` aliases.
- **The hero is a flat navy band (`.ds-hero`); gradients are retired.** `--hero-bg` (= `--psg-navy`; deepened in dark mode) with white type (`--hero-fg/-body/-mute`) and the colossal watermark inverted to light lines. No glows, no scrims, and **no coloured hairlines** anywhere in the system. Small surfaces use `.img-placeholder` (45° hatch + image glyph).
- **PSG crest constants**: `--psg-navy #004070` / `--psg-red #E30613` / `--psg-gold #CEAB5D`, reserved for crest and brand moments; accent + status carry day-to-day UI.
- **Full dark mode**: first-class `[data-theme="dark"]` with dark variants for every status colour and the accent.

---

## Club charte alignment

The system is the performance department's own language, aligned with the club's Corporate Identity & Style Guide (and the season Collatéral charte) where club rules apply, and deliberately divergent where a commercial device would not serve a professional data tool.

**Adopted from the club charte:**
- The Paris palette as constants (Paris Blue `#004070` (Pantone 294 C), Paris Red `#E30613` (185 C), Paris Gold `#CEAB5D` (872 C), white) reserved for crest and brand moments.
- The accent is PSG Bleu Nuit `#141428` (Pantone 2768C), one family with `--psg-navy` and the charte blues (Heritage Blue `#10569F` → Bleu Premium `#1A2B4C` → Bleu Nuit `#141428`); decorative blues still draw from that charte range.
- Colour discipline: red is a supporting colour: never text-only red, never red or gold backgrounds, red + gold pair only inside the badge.
- Virage as the exclusive logo and display face, with the charte's typographic don'ts: no manual stretch/compression, no justified blocks, no long all-caps passages; tracking opens at small sizes and tightens at display scale.
- The logo category system (a department is a Category-3 typographic mark), the "PSG" acronym configuration, the protected area, and the 12 mm minimum: see Logo & lockup.
- The filaire discipline for the watermark: thin uniform stroke (one face, one stroke weight) thickness adapted tone-on-tone for legibility, cropping allowed while the form stays identifiable.
- Season notation: paired two-digit years, "25/26" ("Season 25/26" in full, never "Saison").

**Deliberately not carried (commercial / promotional devices):**
- Virage Extra (outline caps), slanted and curved text: campaign tools, not product UI.
- The two-coloured band: a marketing identifier; this system's brand surface is the flat navy band + watermark.
- Segment palettes (Hospitalités premium blue + gold, VVIP gold / silver): commercial audiences; gold here stays a brand-moment constant.
- Patchwork and the Jersey pattern: the colossal watermark is this system's one ambient motif.
- **One typographic deviation, documented:** Geist + Geist Mono carry body and the technical/data layer, chosen for dense-data legibility (tabular figures, code, 10–13px labels) where a display family cannot serve. Virage remains the headline voice, as the charte intends: and the charte itself substitutes faces where Virage cannot serve (web-safe Arial, IBM Plex for non-Latin).

---

## Sources

The system is self-contained: every token, type class, and component primitive lives in `colors_and_type.css`, with specimens in `preview/`. `colors_and_type.css` is the single source of truth: when it disagrees with any prose, the token wins.

---

## Index

| Path | Purpose |
|---|---|
| `README.md` | This file: context, content & visual foundations, iconography |
| `SKILL.md` | Agent-Skill manifest so Claude Code / agents can load this system on demand |
| `tone.md` | The writing voice for prose: general vs. technical register |
| `colors_and_type.css` | All color, type, spacing, radius, and elevation tokens as CSS vars + helper classes |
| `reference/PSG Data Viz Reference.html` | The data-viz deep reference: the full color system behind the `--viz-*` layer |
| `templates/a4-report/` | The A4 print-report template: the document grammar end-to-end |
| `templates/deck/` | The 16:9 slide-deck template: the projection grammar end-to-end |
| `templates/app-shell/` | The internal web-app template: the screen/interface grammar end-to-end |
| `templates/memo/` | The single-page memo template: the short-form grammar |
| `templates/newsletter/` | The multi-section A4 newsletter template: the internal-update grammar end-to-end |
| `examples/` | Finished documents (guidelines, roles, quarterly update): read them, start new work from `templates/` |
| `fonts/` | Self-hosted Virage (PSG title face) + Geist / Geist Mono, with `_virage-faces.css` / `_geist-faces.css` @font-face declarations |
| `index.html` | The system showcase: a single landing page that links to every specimen in `preview/` |
| `preview/` | Small specimen cards rendered into the Design System tab |
| `components/pitch/` | The `Pitch` component (see Components below) with its specimen cards and `preview/pitch-lab.html` playground |
| `assets/logos/` | PSG crest lockups (colour / mono-black / mono-white), vector SVG |

## Components

- **Pitch** (`components/pitch/Pitch.jsx`): the pitch graphic family. Three marking tiers (`full` for precise plotting: pass/event maps demand it; `standard` for training-space diagrams; `minimal` to signal "pitch" in lineups and small multiples), zone overlays (thirds / half-space lanes), half-pitch extents with a direction-of-play arrow, aspect-ratio crops, shaded training areas (`--accent-soft`, the device from the training-guidelines document), and metre-true 105×68 plotting for markers and passes. Monochrome by law: lines ride ink/neutral registers, plotted data rides the sealed `--viz-*` categoricals, never green. Explore every register live in `preview/pitch-lab.html`.

---

## CONTENT FUNDAMENTALS

### Tone
The system writes for performance staff (sports scientists, S&C coaches, analysts, and medical) people who already read the data fluently. The voice is **confident, terse, data-forward**: a tool reporting what's true, not selling it. No hype, no exclamation marks, no throat-clearing. The data is the proof.

**Prose follows the plain voice in `tone.md`.** It adapts the plain-writing rules (source: github.com/shreyashankar/plain-writing-skill) so wide-audience prose reads plainly without dumbing down expert work. Write every paragraph of body copy in one of two registers, chosen by audience:
- **General register** (wide or mixed readers: comms, summaries, briefs, onboarding): apply all the plain-writing rules.
- **Technical register** (expert, research, domain-specific readers: methods, data-viz notes, testing write-ups): apply the same rules but keep domain vocabulary at full precision. Explain a term once on first use for a mixed audience, never repeatedly, and never trade a precise term for a vague one.

The rules already guard against dumbing down: rule 4 permits a technical term when truly needed, and rule 7 states plain does not mean terse and expands a cramped idea rather than cutting its substance. This tone layer governs prose only. The mono technical/data layer (eyebrows, metric labels, IDs, code, table headers) stays terse by design, and code is exempt.

### Casing & punctuation
- **Sentence-case headlines, no terminal period.** Headlines end without a full stop; hierarchy comes from size and weight.
- **No em dashes.** Banned system-wide. Use a colon for a lead-in, a comma or parentheses for an aside, and a period or semicolon between clauses. The en dash (–) is reserved for numeric ranges and table nils.
- **Never all-caps** outside of mono labels. Headlines lean on size + weight, never uppercase.
- Section eyebrows and small technical labels use the **label face** (`.ds-eyebrow`), uppercase + letter-spaced. The label face is register-locked: Virage in the document and deck registers, Geist Mono in the screen register (`[data-register="screen"]` on the shell root); the register decides, never the artifact, never the element. An eyebrow NAMES a group or key ("Contents", "Doc ID"); it never announces or counts what follows ("The six fields", "Key highlights") and never restates its own heading. If the heading already introduces the content, set no label.

### Voice examples
Illustrative of the register: short, declarative, one idea each:

> "Squad availability at a glance."

> "Load is trending down across the group."

> "Every test, one timeline."

### Emoji
**Never.** The technical layer (mono labels, data, code blocks) does the work emoji would otherwise do. Iconography is minimal line/geometric glyphs, monochrome, inheriting text colour.

### Numbers & technical detail
Metrics, IDs, filenames, and code are first-class content: set code, metrics and IDs in `.ds-code` (Geist Mono); section eyebrows ride the label face (`.ds-eyebrow`), register-locked: Virage on paper and deck, Geist Mono on screen. The dark `.ds-code-surface` mockup is a recurring hero element, not an afterthought.

---

## VISUAL FOUNDATIONS

### Colors
Four registers, kept strictly separate.

- **Ink + neutral.** `--ink #171717` is the **type** colour: every heading, and the polarity-flipped dark band. A 100–1000 gray scale supplies dividers (`--hairline #ebebeb`), de-emphasised text (`--mute #888`), body (`--body #4d4d4d`), and surfaces. Ink is **not** the action colour; that is the accent.
- **Accent.** `--accent #141428` is the single brand action token: PSG Bleu Nuit (charte Pantone 2768C), the deepest charte blue, one family with the crest navy (dark mode lifts it to a light periwinkle so icons stay legible). It drives every primary action and active / selected / focus state (`.ds-btn-accent`, active tabs, icon chips), with `--accent-press`, `--accent-soft`, `--accent-line`, `--accent-contrast` for its states. `--link` aliases the accent: one action blue system-wide. It never appears in a status badge.
- **Status**: meaning-locked `--st-*` palette: green = approved / delivered / operational, amber = pending validation, blue = in progress / evaluation, grey = draft / not started, red = blocked / failed, gold = new / highlighted. Each is a soft bg + deep fg + dot. Status colours never inherit the accent and are never restyled to match it. Status-blue stays a separate vivid blue because it is badge-only; `--warning` is the status-amber family (one amber, not two); status-gold's dot is the crest gold (one gold family).
- **PSG crest hues.** `--psg-navy / --psg-red / --psg-gold` are reserved for crest and brand moments. The hero band fill (`--hero-bg`) is the one sanctioned day-to-day use of the navy. There are no other decorative hues; the legacy gradient hues are gone.

Text hierarchy is achieved through **shade and weight, never hue**: ink headings, `--body` paragraphs, `--mute` fine print.

### Surfaces: the four-step ladder
`--canvas #ffffff` (cards/dialogs) → `--canvas-soft #F6F8FA` (page body) → `--canvas-soft-2 #EAEEF1` (inset regions, code inner bg, menus) → `--primary #171717` (the polarity-flipped dark band). The light end rides the 2026 collateral charte **brand silvers**: cool blue-tinted tints (Light Silver `#EAEEF1`, Cold Grey `#E1E6F0`) that tie light mode to the navy-tinted dark mode; tint lives in surfaces only, never in text or the gray ramp. Switching a band from soft canvas to ink **is** the system's chief depth cue. In dark mode the polarity flips: ink surfaces go light.

### Typography
- **Virage** (PSG's proprietary title face, self-hosted from `fonts/`) carries display / headline type: weights 400–800 plus italics. This is the brand's voice at headline scale.
- **Geist** (geometric sans, self-hosted) for body, button, link, label, and card/row titles. Working weights **400 / 500 / 600**.
- **Geist Mono** for the technical/data layer: code (13px), terminal mockups, section eyebrows (uppercase + letter-spaced), metric labels, filename captions. Weights 400 / 500.
- **Default letter-spacing.** Display type sets at its natural tracking: no negative letter-spacing anywhere. Hierarchy comes from size and weight.

### Spacing
4px base unit; every value is a multiple of 4. Tokens run `xxs 4` / `xs 8` / `sm 12` / `md 16` / `lg 24` / `xl 32` / `2xl 40` / `3xl 48` / `4xl 64` / `5xl 96` / `6xl 128` / `section 192`. Section bands sit at `4xl`–`5xl` top/bottom; hero bands stretch toward `section` to let the band breathe. Cards pad `lg`–`xl`; the headline/paragraph stack inside a card is tight (`xs`), then a wider gap before the action cluster. **Large gaps + tight interior** is the rhythm.

### Grid & container
Content caps at **1400px** (`--page-width`), centred with 24px desktop / 16px mobile gutters. Bands stretch edge-to-edge in colour but content holds the max-width. Common column patterns: 3-up feature rows (→2-up→1-up), 5-up tab-pill rows, 5-up grids, 3-up cards with the middle tier polarity-flipped.

### Tables
The department's workhorse surface (`.ds-table`): availability boards, GPS exports, test batteries:
- **Header**: Geist Mono, uppercase, letter-spaced, `--mute`, on a `--hairline-strong` rule (the eyebrow voice applied to columns).
- **Rows**: 44px on `--hairline` dividers, **no zebra striping**; `.ds-table--dense` gives 32px rows for in-app panels; `.ds-table--hover` adds a `--canvas-soft-2` row hover.
- **Numbers are right-aligned, tabular figures** (`.is-num`) so columns of metrics align digit-for-digit: mono on screen; on paper `.ds-doc` re-faces them in Geist tabular figures with plain zeros and sets headers in the label face (mono in print survives only as literal code and verbatim IDs). The entity column leads in ink at weight 500 (`.is-lead`).
- **Status pills sit in cells unchanged**: same `.ds-status-*`, same meaning lock.
- **Deltas**: `.is-up` / `.is-down` reuse the status green/red and mean *favorable / unfavorable*, extending the meaning lock into data. When a change carries no value judgment, leave it plain ink.
- A `tfoot` summary row sits on a `--hairline-strong` top rule in ink.

### Charts
A **sealed register** (`--viz-*`). The deep reference is **`reference/PSG Data Viz Reference.html`**: the full color system behind the daily layer (categorical order, scales, combinations, stacking, focus + gray, density tiers, labels-in-color, micro viz, bivariate, media rules). Power users read the reference; the design system carries only this daily layer:
- **Five ordered categoricals** with soft tiers and dark variants: blue `#315FCA` / berry `#C03277` / teal `#289187` / yellow `#B09E00` / purple `#954ECD`. **Series count → colors is fixed** (ΔE-derived): 1 = blue alone / 2 = blue + yellow / 3 = + berry / 4 = + teal / 5 = teal, berry, blue, yellow, purple / **6+ = use a table.**
- **The register is sealed both ways.** Viz colors never style UI chrome, badges, or buttons; the UI `--accent` never appears in a legend as a data color.
- **Monitoring is directional, not judgmental.** Above/below a threshold (z-scores, ACWR, chronic load) uses warm `--viz-mon-high` (berry) / cool `--viz-mon-low` (blue) / `--viz-mon-neutral` within range. **Never green/red**: a player under load is not "failing".
- **`--viz-ink`** is the "data, no category implied" mark: sparklines, trendlines, moving averages.
- **Semantic colors are never categoricals**, and warning-amber marks never sit beside `--viz-yellow` in one view.
- **Chart furniture reuses the system neutrals** (no third gray system): gridlines `--viz-grid` (= hairline) at 0.5px/40%, axis + zero baseline `--viz-axis` (= hairline-strong) at 1px (the zero line is always visible) tick labels 10–11px Geist Mono in `--viz-tick`. Charts sit on `--canvas` (white), not soft surfaces. No 3D, no gradient fills, no dual axes, no pies beyond two slices.
- **Soft tier for big areas**: when a chart fills more than ~⅓ of the view, drop marks to the `-soft` values.
- **Sequential (`--viz-seq-1…5`)**: the daily magnitude ramp: blue scale steps 100/300/500/700/900. Heatmaps, choropleths, density. Single hue, monotonic lightness, theme-invariant. Other hues' ramps live in the deep reference; semantic ramps only when meaning matches.
- **Diverging (`--viz-div-low-5 … high-5`)**: rides the chroma-managed scale steps (blue 500→100 / visible neutral `#DCDCDC` centre / berry 100→500) instead of interpolating toward gray, so the arms never go muddy and the zero point stays visible on white. Direction matches monitoring: blue = below, berry = above. Only for data with a meaningful midpoint; otherwise sequential. Daily 5-step: low-4 / low-2 / mid / high-2 / high-4.

### Documents: the print register
A4 briefs, testing reports, article summaries. **Paper retires the screen devices.** The grammar is `.ds-doc` + the document primitives in `colors_and_type.css`, demonstrated end-to-end in `templates/a4-report/`.

- **One cover band; section openers follow document length.** The cover carries the `.ds-hero` band: flat navy, colossal watermark, a small masthead lockup at the top of the band, white Virage title. Multi-section documents (4+ pages: newsletter, roles, guidelines, long reports) open **every section** with a full-bleed navy band (`.ds-hero.ds-doc-band`: eyebrow + Virage title + short white lede; the band suppresses the watermark, which stays cover-only). Short briefs (1–3 pages: memo, two-page report) open sections with an eyebrow + title on white. Structure decides, never taste (decision 05C). The cover lockup is the masthead only (crest + "PSG / Performance"); the badge is never repeated in the body.
- **Cover titles hold their rag.** Virage, sentence case, no terminal period, `text-wrap: balance`, max-width ≈ 16–20ch. Never a manual `<br>`, never justified; if it needs a third line, shorten the title.
- **Stats are horizontal KPI cards** (`.ds-stat-cards` > `.ds-stat-card`, decision 06B, promoted from the newsletter): big ink Geist-600 numeral (42px) left, Virage-light name (`.ds-stat-name`) + Geist note (`.ds-stat-note`) right, at most **one** brand-blue line icon (`.ds-stat-icon`). Hairline border, diagonal corner, 2 columns by default (`--stat-cols` for a single row of 3–4). No coloured top rules, no second icon, one page never mixes cards with bare numerals. The flat `.ds-stat-strip` is retired. **A stat card carries a count or measure of the document's subject — never a date, season, version, or doc ID.** That is governance metadata: it lives once in the doc meta block / folio and is never repeated as a stat. If only three real stats exist, set a row of three; never pad the grid.
- **The document kit** (decision 07A, promoted from the newsletter): `.ds-area` (+ `-head` / `-name` / `-body`) groups one department or topic area under a soft head strip; `.ds-project` rows (+ `.ds-project-head`) carry title + status pill + body copy; `.ds-doc-btn` is the outlined label-face link pill (inline-block so print-to-PDF keeps the link clickable); `.ds-doc-folio` is the slim no-rule footer.
- **Numerals are ink.** The accent is an action colour and a printed stat is not an action; hierarchy comes from size, so the lead stat may simply be bigger. Viz colours touch numbers only when the number is literally a chart label.
- **Mono is retired on paper** (PRINT DE-MONO): `.ds-doc` re-faces table numerals and bar values in Geist tabular figures and table headers in the label face; `.ds-doc-source` footnotes are plain sans. Geist Mono's zero is slashed by glyph default (`"zero" 0` cannot un-slash it), so mono numerals never reach print. Mono survives on paper only for literal code and verbatim IDs.
- **Plain zeros outside the code layer.** The slashed zero belongs to Geist Mono at code scale (≤ 13px, screen). Mono never sets display-scale numerals; `.ds-stat-value` and `.ds-doc-folio` force `font-feature-settings: "zero" 0`.
- **Elevation is retired on paper.** `.ds-doc` strips every shadow; a card that survives onto paper is held by a 1px hairline border.
- **Document charts are horizontal bar blocks** (`.ds-barlist` / `.ds-barrow`): entity label / square-ended bar(s) on a visible 1px axis / mono value directly after the bar. ≤ 2 series are **direct-labelled on the first row: no legend** (2 series = viz-blue + viz-yellow, e.g. PSG vs opponent). Time-axis data may use the viz reference's columns/sparklines; everything else reads better horizontal at A4 column width.
- **Season + dates live in the folio**: mono, "25/26" notation, with the source line (`.ds-doc-source`) under each chart.

**Banned on sight: the tells of a generated document:** coloured top hairlines on cards / drop-shadowed tiles / slashed zeros anywhere in print (they ride in on mono numerals) / accent-blue or mono display numerals / a legend on a 2-series chart / ragged cover titles with orphaned words or manual breaks / a watermark on a section band / rounded bar ends / the flat stat strip in new work / stat-pill chip rows counting a document's own contents / numbered icon-card triptychs / slash-chain eyebrows / lift-on-hover cards.

### Slides: the projection register
16:9 decks (1920×1080) presented live but built to survive async reading. The grammar is demonstrated end-to-end in `templates/deck/`.

- **One navy band per deck: the cover.** Same law as paper: the cover is the only `.ds-hero` (colossal watermark, a small masthead lockup at the top, white Virage title). Every body slide is white. Section dividers sit on `--canvas-soft` with a colossal ink title, never navy, never the watermark.
- **Projection type floor: 24px.** Mono eyebrows and folios 24–26px; slide titles Virage 64–72px; the cover ≈ 128px; body 28–32px capped near 52ch. Hierarchy is still shade + weight, never hue.
- **Slide chrome is the folio number only**: mono, bottom-right, "04 / 10". The cover carries none.
- **Data slides scale the document grammar up, not sideways.** Flat stat strips (ink Geist-600 numerals, plain zeros), horizontal bar blocks on a visible 1px axis with mono values after each bar, mono uppercase table headers on a strong hairline, status pills unchanged in cells. Direct labels; no legend at ≤ 2 series.
- **The closing slide carries the formal lockup** (badge + Virage wordmark + season mark), echoing the cover masthead to bookend the deck.
- **Slides stay static.** No entrance animations in this register: decks must print to PDF (one page per slide) and export to PPTX without a JS pass.

### Screens: the interface register
Internal web-apps and prototypes. The grammar is demonstrated end-to-end in `templates/app-shell/`: a sidebar + topbar shell wrapping a sign-in, a dashboard, and a set of department screens.

- **The shell is chrome; the system supplies everything inside it.** Tokens, the status palette, dark mode, `.img-placeholder` and the type classes all come from the design system: `templates/app-shell/hub.css` only adds app-specific chrome (sidebar/topbar metrics, scrollbars, focus ring).
- **One action blue.** Every primary action, active nav item and selected state uses `--accent` (the navy-derived UI blue). The viz register never styles UI; discipline identity colours ride the five categorical viz tokens because disciplines *are* categories.
- **Dark mode rides the tokens.** `[data-theme="dark"]` on `<html>` is the only switch: no per-screen dark styling. The login band is the one `.ds-hero` (flat navy + watermark), mirroring paper and deck.
- **Density is tighter than print.** Body 13–15px, nav/labels via the mono eyebrow, 44px minimum hit targets. Diagonal card corners (`--radius-*`) and stacked-hairline elevation are kept: this is the same brand at screen scale.

### Elevation
**Stacked shadows, never a single heavy drop.** Five levels, each adding an inset 1px hairline ring so the card edge stays crisp:
- **L1** inset hairline only: default "you can see this card" cue.
- **L2** subtle drop: slightly elevated cards.
- **L3** soft stack: feature cards.
- **L4** float stack: callout panels, emphasised cards.
- **L5** modal: dialogs, dropdowns.

See `--elev-1`…`--elev-5`. Cards sit on the page held by hairline + soft glow, never on a Material-style drop.

### Shapes & radius
The **diagonal card corner** is the signature: `--radius-md/lg/xl` resolve to `0 8px 0 8px` / `0 12px 0 12px` / `0 16px 0 16px` (square TL+BR, rounded TR+BL) and apply at **card scale only**. Small controls stay uniform: `--radius-sm 6px` for in-app nav buttons and inputs, the pill scales for CTAs and tabs. Need a uniform corner at card scale (e.g. an image cap)? Use `--radius-md/lg/xl-uniform`. Two pill scales coexist *deliberately*: **100px pill** (`--radius-pill`) for primary CTAs, **64px** (`--radius-pill-sm`) for tab-ghost pills; icon buttons + ghost nav links use `--radius-full`. Don't mix the 100px and 6px scales on one screen. Full-bleed hero and footer bands are square (`0`).

### Backgrounds & imagery
- **Hero band (`.ds-hero`).** The canonical hero/section-opener surface: a **flat** `--hero-bg` navy band with white type and the watermark. Gradients are retired; a flat fill cannot go muddy. In dark mode `--hero-bg` deepens (`#0c3154`) so the band sits into the dark page instead of glowing on it. No coloured hairlines on or around the band: edges are either the band's own boundary or a neutral `--hero-hairline` (white at 14%) for on-band dividers.
- **Brand watermark (`.ds-hero-mark`).** The canonical decorative motif: the filaire (wireframe) PSG crest set at **colossal scale** (~3× the band height) and faint, anchored so the **fleur-de-lis rises from the band's lower edge** while the crest's flows sweep across as huge arcs bleeding off every side; it reads as ambient background texture, never as a contained logo. Inside `.ds-hero` the mark is automatically inverted to light lines at `--hero-mark-opacity` (≈10% light theme, ≈16% dark). On light bands outside the hero, opacity is `--watermark-opacity` (≈7% light, ≈14% dark; dark mode inverts via `--watermark-filter`). The radial edge-fade is **off by default** (toggle "Fade edges" in the hero Tweaks panel to re-enable it). **Container contract:** the band must be `position:relative` + `overflow:hidden` and foreground content must sit at `z-index ≥ 1` (`.ds-hero` supplies the band part automatically). **Asset contract:** single-tone line art on transparency (the filaire crest with the fleur-de-lis at (50%, 61.6%) of its viewBox, which the class uses as its anchor point): hero/section scale only, never icon scale; always decorative (`alt=""` + `aria-hidden="true"`). Asset: `assets/psg-watermark.svg`.
- **`.img-placeholder`**: small surfaces that need imagery use a 45° hatch + image glyph, never a colour fill or gradient. Mark what should be dropped in.
- **Code-editor mockup**: dark `--primary` rectangle, mono text inside, `md` corners; treated as an image at the layout level.
- **Logos**: monochrome crest, consistent height in a flex row.

### Borders, hover, motion
- Borders are thin, low-contrast, and **brand-silver tinted**: `--hairline #E1E6F0` (Cold Grey) for dividers/cards/inputs, `--hairline-strong #a1a1a1` for stronger separation, `--hero-hairline` (white 14%) on the navy band. **No coloured hairlines**: never a gold rule, never an accent border used decoratively (the accent border exists only as `--accent-line` on accent-soft controls).
- **Hover:** filled accent buttons deepen to `--accent-press`; secondary/ghost surfaces shift to `--canvas-soft-2`; inline links underline. No colour jumps.
- **Motion:** restrained: short neutral transitions (~160ms ease) for state changes. No bounces, no parallax. Calm by design.
- **Transparency/blur:** not part of the language. Surfaces are opaque paint, not frosted glass.

---

## ICONOGRAPHY

The icon language is **minimal, monochrome, thin-stroke line/geometric glyphs** that inherit the surrounding text colour: never multicolor, never filled illustration, never emoji. Icons read at 16–24px in UI chrome.

### Approach
- **Style:** ~1.5px stroke, rounded caps, geometric construction. No fill, no colour: `currentColor` only.
- **No emoji**, ever. **No unicode "icon" characters** (✓, ★) as functional icons.

### Logo & lockup
The department signs its work as **PSG / PERFORMANCE**, built per the club charte's activity-logo system: full spec in `preview/brand-lockup.html`, badge variants in `assets/logos/`.

- **Three configurations.** A / Chrome: badge + stacked "PSG / PERFORMANCE" (the charte's horizontal configuration), for persistent chrome. B / Wordmark: typography only, the charte's Category-3 form for departments, used where PSG identity is already established. C / Formal: badge above, name centered, optional season mark, for covers and splash.
- **Lockup text is Virage only.** "PSG" at weight 700 (the club's sanctioned acronym configuration), "PERFORMANCE" at 400–500, capitals, tracking opened at small sizes. Geist / Geist Mono never appear inside the mark.
- **Placement.** Persistent chrome (app and site headers, footers) carries the lockup. Full-bleed hero and cover openers carry the colossal watermark plus the lockup as a small masthead at the top of the band; the badge is never repeated in the body. One badge per view, maximum.
- **Reduction, outside-in.** Full lockup → drop "PERFORMANCE" → crest alone (≥ 44px). The descriptor never wraps and never hyphenates.
- **Protected area & minimum size.** Clear space = x, the gap between the badge's two white circles (≈ 10% of crest width). Badge minimum 12 mm print / 44px screen; in chrome at 28–36px the crest appears only inside a lockup; below 28px the wordmark stands alone.
- **Colour.** Black crest in light chrome, white crest in dark chrome; the **colour crest is for brand moments only** (hero, splash, formal covers), never a UI icon. No dividing hairline between crest and our own text: that construction is the club's sponsor-composite signature.
- **Season mark.** Paired two-digit years: "25/26" ("Season 25/26" in full, never "Saison"), set in Virage, on covers and formal headers only.

### Icon set
The system does not ship a bundled icon set. **Lucide** (https://lucide.dev) is the recommended set (its thin-stroke geometric construction matches the aesthetic) loaded via CDN with `currentColor` fills. An internal or licensed set may be substituted in one place provided it holds the same ~1.5px stroke, rounded-cap, monochrome construction.

---

*PSG Performance Design System (V1) June 2026*
