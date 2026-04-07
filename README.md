# VOID∙GLYPH

**A multi-page Typographic ASCII art portfolio — where proportional glyphs replace pixels and text becomes image.**

---

## What's New (v2)

### Works page — enhanced

The works page now features **12 artworks** (up from 6), with 6 new typographic scene studies:

| # | Title | Algorithm |
|---|-------|-----------|
| 07 | *Logotype Wave* | Compound sinusoidal column displacement |
| 08 | *Baseline Drift* | Per-column noise-driven baseline shift |
| 09 | *Glyph Rain* | Per-column phase sinusoidal drop + exponential trail |
| 10 | *Kern Study* | Horizontal density gradient · noise-perturbed kerning bands |
| 11 | *Ascender* | Vertical typographic zone mapping (cap/x/base/descender) |
| 12 | *Moiré* | Dual sinusoidal interference · phase-animated beating |

### New features

- **Work detail modal** — click any card to open a full detail view with technical specs, process notes, algorithm description, and a live ASCII excerpt
- **Grid / List view toggle** — switch between the card grid and a list view with inline descriptions
- **Filter by category** — All / Organic / Geometric / Typographic / Portrait / Abstract
- **Typographic stats section** — counts, measurements, ramp data
- **Type scale / glyph hierarchy** — visual ramp from void to solid

---

## Pages

| Page | Description |
|------|-------------|
| **Home** (`index.html`) | Full-viewport animated ASCII eye hero + featured work |
| **Works** (`works.html`) | 12 artworks with detail modal, filter, and view toggle |
| **About** (`about.html`) | ASCII portrait, artist statement, CV timeline, skill bars |
| **Process** (`process.html`) | Live demos, 4-step method, character density palette |
| **Contact** (`contact.html`) | Atmospheric background + commission inquiry form |

## Getting Started

Open `index.html` directly in any modern browser. No build step, no server required.

For local development with hot-reload:
```bash
npx serve .
# or
python -m http.server 8080
```

## Structure

```
voidglyph/
├── index.html
├── works.html        ← 12 works, modal, filter, view toggle
├── about.html
├── process.html
├── contact.html
├── voidglyph.html    ← redirects to index.html
├── css/
│   └── design.css
└── js/
    ├── ascii-engine.js
    └── shared.js
```

## License

MIT © 2026 VOID∙GLYPH Studio
