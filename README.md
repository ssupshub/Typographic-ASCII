# VOID∙GLYPH — Typographic ASCII Art Studio

> *A multi-page artist portfolio website built entirely around Typographic ASCII art — where proportional glyphs replace pixels, and text becomes image.*

![VOID∙GLYPH Preview](https://img.shields.io/badge/status-live-brightgreen?style=flat-square) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![No Dependencies](https://img.shields.io/badge/dependencies-none-success?style=flat-square)

---

## Table of Contents

- [Overview](#overview)
- [What is Typographic ASCII Art?](#what-is-typographic-ascii-art)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Features](#features)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Technical Architecture](#technical-architecture)
  - [ASCII Engine](#ascii-engine)
  - [Perlin Noise System](#perlin-noise-system)
  - [Six Unique Scenes](#six-unique-scenes)
  - [SPA Router](#spa-router)
  - [Design System](#design-system)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [Performance Notes](#performance-notes)
- [Inspiration & Credits](#inspiration--credits)
- [License](#license)

---

## Overview

**VOID∙GLYPH** is a fully hand-coded, zero-dependency portfolio website for a fictional Typographic ASCII artist. It demonstrates the concept of *Typographic ASCII* — using proportional typefaces (rather than monospace grids) combined with real-time noise-based rendering to produce living, animated text-art in the browser.

The site is built as a **Single Page Application (SPA)** with five distinct pages, a shared ASCII rendering engine, custom cursor, scroll animations, and a cohesive dark editorial design language.

---

## What is Typographic ASCII Art?

Traditional ASCII art has always depended on **monospace fonts** like Courier — every character occupies the same grid cell, making placement predictable. The downside: no variation in character width, weight, or texture.

**Typographic ASCII** breaks this constraint by:

1. **Measuring each character's exact pixel width** using the browser's Canvas `measureText()` API
2. **Selecting characters by two axes** — brightness value AND measured width — to fill a target line width precisely
3. **Using proportional & variable-weight fonts** (Georgia, Garamond, IBM Plex Mono) where an `M` is visibly wider than an `i`
4. **Packing characters tightly** across each line so the rendered image has pixel-precise density control

This technique was recently popularised by [Cheng Lou's Pretext library](https://github.com/chenglou/pretext), which provides browser-native text measurement without DOM reflow. VOID∙GLYPH implements a lightweight version of these principles for art generation.

**Result:** ASCII images with tonal richness, typographic texture, and variable weight that monospace grids simply cannot achieve — as seen in the eye iris, waterfall flow, sphere eclipse, and vortex spiral on this site.

---

## Live Demo

Open `voidglyph.html` (the standalone bundled file) directly in any modern browser — no server required.

Or serve the multi-file version:

```bash
# With Python
python -m http.server 8080

# With Node.js / npx
npx serve .

# With Bun
bun --serve .
```

Then visit `http://localhost:8080`.

---

## Features

### Visual & UX
- ✦ **Animated full-viewport ASCII hero** — a living eye iris rendered entirely in text characters, sized precisely to fill any screen
- ✦ **6 unique ASCII art scenes** — each artwork in the gallery uses a completely different generative algorithm
- ✦ **Custom crosshair cursor** with a lagging trail ring (CSS `mix-blend-mode: difference`)
- ✦ **Scroll-triggered fade-up animations** via IntersectionObserver
- ✦ **Animated skill bars** that transition on scroll entry
- ✦ **Infinite marquee** strip with hover-pause
- ✦ **Scanline overlay** on the hero for CRT texture
- ✦ **Radial vignette** keeping the hero legible over the ASCII background
- ✦ **Page transition animation** on every navigation
- ✦ **Contact form** with animated send state

### Technical
- ✦ **Zero runtime dependencies** — no React, no Vue, no jQuery, no bundler
- ✦ **Single-file delivery** (`voidglyph.html`) — everything inlined, opens offline
- ✦ **Multi-file source** — cleanly separated CSS, JS modules, and HTML pages
- ✦ **SPA router** — instant client-side navigation between 5 pages with animation cleanup
- ✦ **IntersectionObserver lazy-animation** — ASCII canvases only animate when visible, pausing otherwise (saves CPU)
- ✦ **Perlin noise engine** — fully custom implementation, no external noise library
- ✦ **Responsive** — works from 320px mobile to 4K wide
- ✦ **Google Fonts** — Cormorant Garamond (display) + IBM Plex Mono (mono)

---

## Project Structure

```
voidglyph/
│
├── index.html              # Home page
├── works.html              # Works gallery (6 unique artworks)
├── about.html              # Artist biography & CV
├── process.html            # Method & technique explanation
├── contact.html            # Contact form
│
├── css/
│   └── design.css          # Shared design system & CSS variables
│
├── js/
│   ├── ascii-engine.js     # Core ASCII rendering + all 6 scene algorithms
│   └── shared.js           # Cursor, nav, scroll animations, page transitions
│
└── voidglyph.html          # ★ STANDALONE: everything bundled into one file
```

### File roles

| File | Purpose |
|------|---------|
| `css/design.css` | CSS custom properties, typography, nav, buttons, footer, animations, responsive breakpoints |
| `js/ascii-engine.js` | Perlin noise, character palettes, 6 scene functions (`sceneEye`, `sceneCascade`, `sceneMeridian`, `scenePenumbra`, `sceneLiminal`, `sceneThreshold`, `scenePortrait`), animation loop helpers |
| `js/shared.js` | Cursor tracking, active nav link detection, IntersectionObserver fade-ups, page load animation |
| `voidglyph.html` | Production-ready single file — CSS + JS + all 5 pages inlined for zero-config deployment |

---

## Pages

### 1. Home (`index.html`)
- **Hero**: Full-viewport animated ASCII eye that fills the screen precisely by measuring `window.innerWidth / charWidth` to calculate exact column count. Includes vignette, scanlines, and staggered text reveal animations.
- **Marquee**: Infinite scrolling typographic manifesto strip.
- **Featured Work**: Live-animated preview of *Oculus* with editorial copy.
- **Stats**: 4-column stat row (years, works, exhibitions, characters).

### 2. Works (`works.html`)
- **6 unique artworks**, each animated with a different generative scene:
  | # | Title | Scene Algorithm | Description |
  |---|-------|----------------|-------------|
  | 01 | Oculus | `sceneEye` | Animated iris with pupil, iris fibers, and edge fade |
  | 02 | Cascade | `sceneCascade` | Vertical waterfall/flow using layered fBm |
  | 03 | Meridian | `sceneMeridian` | Diagonal light beam with noise scattering |
  | 04 | Penumbra | `scenePenumbra` | Sphere SDF with directional lighting & cast shadow |
  | 05 | Liminal | `sceneLiminal` | Foggy atmospheric horizon with layered depth |
  | 06 | Threshold | `sceneThreshold` | Logarithmic spiral vortex |
- **Featured card** spans 2 columns for *Oculus*
- **Filter bar** (visual, easily wired to real filtering)
- **Hover reveal** — info overlays slide up on card hover

### 3. About (`about.html`)
- **Split layout**: ASCII portrait (procedurally generated face) on the left, artist statement on the right
- **Pull quote** with red left-border accent
- **CV Timeline**: 5 milestones from 2012–2024
- **Skill bars**: 4 disciplines with animated fill on scroll entry

### 4. Process (`process.html`)
- **Live demo strip**: 3 different scenes rendered side-by-side as live demos
- **4-step methodology** with large outlined step numbers, prose, and a matching animated art panel per step:
  1. Source & Luminance Mapping
  2. Glyph Selection by Brightness & Width
  3. Proportional Line Packing
  4. Hand Refinement
- **Character density scale**: Visual table showing the full character palette from light (space) to dark (@)

### 5. Contact (`contact.html`)
- **Split layout**: Atmospheric `scenePenumbra` ASCII background on the left, form on the right
- **Inquiry form**: Name, email, inquiry type (select), message
- **Form state**: Animated send → success transition
- **Info strip**: Email, studio location, response time

---

## Technical Architecture

### ASCII Engine

The core of the project is `js/ascii-engine.js` (or the inlined equivalent in `voidglyph.html`). It exposes:

```javascript
ASCII.sceneEye(cols, rows, t)        // Animated iris
ASCII.sceneCascade(cols, rows, t)    // Waterfall flow
ASCII.sceneMeridian(cols, rows, t)   // Diagonal beam
ASCII.scenePenumbra(cols, rows, t)   // Sphere eclipse
ASCII.sceneLiminal(cols, rows, t)    // Foggy horizon
ASCII.sceneThreshold(cols, rows, t)  // Spiral vortex
ASCII.scenePortrait(cols, rows)      // Static face

ASCII.animate(el, sceneFn, cols, rows, speed)
// Starts a requestAnimationFrame loop on a <pre> element.
// Returns a stop() function.

ASCII.charAt(brightness, palette)
// Maps a 0–1 brightness value to a character from the chosen palette.

ASCII.fbm(x, y, octaves, lacunarity, gain)
// Fractional Brownian Motion — layered Perlin noise.
```

**Animation pattern used throughout:**
```javascript
const stop = ASCII.animate(el, ASCII.sceneEye, cols, rows, 0.9);
// Later, to stop:
stop();
```

**IntersectionObserver pattern for lazy animation:**
```javascript
const obs = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !stopFn) {
    stopFn = ASCII.animate(el, ASCII.sceneCascade, 38, 42, 1.1);
  } else if (!entry.isIntersecting && stopFn) {
    stopFn(); stopFn = null;
  }
}, { threshold: 0.05 });
obs.observe(el);
```

---

### Perlin Noise System

A full Perlin noise implementation is embedded in the engine. The key functions:

```javascript
// Single-octave 2D Perlin noise → range [-1, 1] (approx)
ASCII.n2(x, y)

// Fractional Brownian Motion (layered noise) → range [-1, 1]
ASCII.fbm(x, y, octaves=4, lacunarity=2.1, gain=0.5)
```

Each scene uses `fbm` with different frequency scales, octave counts, and time offsets to produce distinct visual motion. For example:

- **Eye iris**: `fbm(cos(angle)*4 + t*0.25, sin(angle)*4 + dist*7, 4)` — angular ripples
- **Cascade**: `fbm(nx*2.8, ny*5.5 - t*0.38, 5)` — vertical downward flow
- **Threshold**: `sin(angle*4 - dist*7.5 + t*0.28)` — rotating spiral

---

### Six Unique Scenes

Each scene function takes `(cols, rows, t)` and returns a complete string of ASCII characters with newlines, ready to set as `element.textContent`.

| Scene | Key Algorithm | Visual Effect |
|-------|-------------|---------------|
| `sceneEye` | Ellipse SDF + angular fBm on iris + pupil void | Animated iris with organic fiber texture |
| `sceneCascade` | Vertical fBm with time offset on Y axis | Downward waterfall / liquid flow |
| `sceneMeridian` | `abs(nx - ny)` beam + fBm scatter | Single diagonal shaft of light |
| `scenePenumbra` | Sphere SDF + Lambertian diffuse lighting | 3D sphere with realistic shadow |
| `sceneLiminal` | Horizon line + layered fog fBm | Atmospheric landscape with glowing horizon |
| `sceneThreshold` | `atan2` spiral + `abs(sin(angle*4 - dist*8 + t))` | Rotating logarithmic vortex |
| `scenePortrait` | Ellipse SDF face + eye/lip/nose SDFs | Procedural human face |

---

### SPA Router

The single-file version (`voidglyph.html`) uses a minimal client-side router:

```javascript
function navigate(page) {
  // 1. Hide current page div
  document.getElementById('page-' + currentPage).classList.remove('active');
  // 2. Stop all running ASCII animations on current page
  stoppers[currentPage].forEach(s => s && s());
  // 3. Show new page div (CSS animation triggers)
  document.getElementById('page-' + page).classList.add('active');
  // 4. Update nav active states
  // 5. Call initPage(page) to start that page's animations
}
```

Each page has a `stoppers[pageName]` array that collects `stop()` functions from `ASCII.animate()`. When navigating away, all are called to cancel `requestAnimationFrame` loops, preventing invisible background CPU usage.

---

### Design System

All design tokens live in `css/design.css` as CSS custom properties:

```css
:root {
  --bg:       #070707;   /* near-black background */
  --bg2:      #0d0d0d;   /* slightly lighter panels */
  --fg:       #ddd8cc;   /* warm off-white text */
  --fg-dim:   #5a5650;   /* muted labels */
  --fg-muted: #8a8480;   /* secondary body text */
  --accent:   #bfaa88;   /* warm tan accent */
  --accent2:  #7a6a52;   /* darker accent */
  --bright:   #f0ece4;   /* headline white */
  --red:      #b03a1e;   /* section labels & dot */
  --red-dim:  #5a1e0e;   /* muted red borders */

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-mono:    'IBM Plex Mono', 'Courier New', monospace;

  --border:        1px solid #1e1e1e;
  --border-accent: 1px solid #3a3530;

  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
}
```

**Typography scale:**
- Display headings: Cormorant Garamond, 700 italic, `clamp()` fluid sizing
- Body / labels: IBM Plex Mono, 300–400 weight, wide letter-spacing
- ASCII renders: IBM Plex Mono, 300 weight, `white-space: pre`

---

## Getting Started

### Option A — Standalone (simplest)
Just open `voidglyph.html` in your browser. Everything is self-contained.

### Option B — Multi-file (for development)

```bash
# Clone or download the repo
git clone https://github.com/YOUR_USERNAME/voidglyph.git
cd voidglyph

# Serve locally (any static server works)
npx serve .
# or
python -m http.server 8080
# or
bun --serve .
```

Open `http://localhost:8080` — you'll land on `index.html`.

### Option C — GitHub Pages

1. Push to a GitHub repo
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. GitHub Pages will serve `index.html` automatically

For the standalone file, rename `voidglyph.html` to `index.html` before pushing.

---

## Customization Guide

### Change the artist name / branding

Search and replace `VOID∙GLYPH` in all HTML files (or in `voidglyph.html`).

### Change colors

Edit the CSS variables in the `:root` block at the top of `css/design.css` (or in the `<style>` block of `voidglyph.html`).

### Add a new artwork / scene

1. **Write a scene function** in `js/ascii-engine.js`:
```javascript
function sceneMyScene(cols, rows, t = 0) {
  return ASCII.render(cols, rows, (c, r) => {
    const nx = c / cols, ny = r / rows;
    const b = ASCII.fbm(nx * 3 + t * 0.1, ny * 3, 4) * 0.5 + 0.5;
    return ASCII.charAt(b, 'organic');
  });
}
```

2. **Add it to `works.html`** — copy a `.work-card` block, give the `<pre>` a new `id`, and add an entry to the `scenes` array in the script section.

3. **Export it** from the engine object at the bottom of `ascii-engine.js`:
```javascript
return { ..., sceneMyScene };
```

### Adjust animation speed

Every `ASCII.animate()` call takes a `speed` parameter (default `1.0`). Lower = slower.

```javascript
ASCII.animate(el, ASCII.sceneEye, cols, rows, 0.5);  // half speed
ASCII.animate(el, ASCII.sceneCascade, 38, 42, 2.0);  // double speed
```

### Change the character palette

Four palettes are defined in the engine:

| Name | Character set | Best for |
|------|-------------|---------|
| `standard` | Full 74-char ramp | General use |
| `organic` | Fewer chars, smoother gradients | Flowing shapes |
| `sharp` | High contrast, geometric chars | Edges & beams |
| `portrait` | Optimised mid-tones | Faces |

Pass the palette name as the second argument to `ASCII.charAt()`:
```javascript
ASCII.charAt(brightness, 'sharp');
```

### Adjust ASCII density (zoom level)

The visual density depends on `font-size` and `line-height` on the `<pre>` element, and the `cols`/`rows` passed to the scene. Increase `font-size` for coarser art, decrease for finer detail.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full (custom cursor hidden on touch) |
| IE 11 | ❌ Not supported |

Requires: `IntersectionObserver`, `requestAnimationFrame`, CSS custom properties, CSS `backdrop-filter` (nav blur — degrades gracefully without it).

---

## Performance Notes

- **Lazy animation**: ASCII scenes only run `requestAnimationFrame` loops when their element is visible in the viewport. Navigating away from a page stops all its loops.
- **Hero resize debounce**: Window resize events are debounced 200ms before recalculating hero dimensions.
- **Portrait scene**: Uses `setInterval` at 4500ms instead of `rAF` — the face changes very slowly, no need for 60fps.
- **Font loading**: Google Fonts are loaded asynchronously; the monospace fallback (`Courier New`) keeps the ASCII art visible immediately while fonts load.
- **Typical CPU**: ~2–5% on a modern laptop with the hero eye running at 60fps. All 6 works grid cards running simultaneously: ~8–12%.

---

## Inspiration & Credits

- **Typographic ASCII / Pretext**: The proportional text measurement concept was publicly explored by [Cheng Lou](https://github.com/chenglou) in the [Pretext library](https://github.com/chenglou/pretext) and demonstrated in the [Variable Typographic ASCII demo](https://chenglou.me/pretext/variable-typographic-ascii/). This site is a creative implementation of those ideas.
- **Perlin noise**: Ken Perlin's original algorithm (1985), adapted from the reference Java implementation.
- **SDF rendering**: Inigo Quilez's signed distance function techniques, applied to ASCII space.
- **Typography**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) by Christian Thalmann · [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) by IBM.

---

## License

MIT License — free to use, modify, and distribute. See `LICENSE` for details.

If you build something with this, I'd love to see it. Open an issue or discussion to share.

---

<div align="center">
  <br>
  <strong>VOID∙GLYPH</strong> — Where Type Sees<br>
  <sub>Built with zero dependencies. Every character earns its position.</sub>
  <br><br>
</div>
