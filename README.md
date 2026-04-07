**A multi-page Typographic ASCII art portfolio — where proportional glyphs replace pixels and text becomes image.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-success?style=flat-square)

---

## What is Typographic ASCII?

Traditional ASCII art uses monospace fonts — every character on a fixed grid. **Typographic ASCII** breaks that by measuring each character's exact pixel width via `canvas.measureText()`, then selecting glyphs across two axes: **brightness** and **width**. Dense characters (`M`, `#`, `@`) anchor shadows; hairline characters (`·`, `|`, `!`) breathe in light. The result is tonal depth that no monospace grid can achieve.

> Inspired by [Cheng Lou's Pretext library](https://github.com/chenglou/pretext).

---

## Pages

| Page | Description |
|------|-------------|
| **Home** | Full-viewport animated ASCII eye hero + featured work |
| **Works** | 6 artworks, each driven by a unique generative scene |
| **About** | ASCII portrait, artist statement, CV timeline, skill bars |
| **Process** | Live demos, 4-step method, character density palette |
| **Contact** | Atmospheric background + commission inquiry form |

### The Six Scenes

| # | Title | Algorithm |
|---|-------|-----------|
| 01 | *Oculus* | Eye iris — ellipse SDF + angular fBm |
| 02 | *Cascade* | Waterfall — vertical fBm with time offset |
| 03 | *Meridian* | Diagonal light beam + noise scatter |
| 04 | *Penumbra* | Sphere SDF with Lambertian shading |
| 05 | *Liminal* | Foggy horizon — layered atmospheric fBm |
| 06 | *Threshold* | Logarithmic spiral vortex |

---

## Structure

```
voidglyph/
├── index.html
├── works.html
├── about.html
├── process.html
├── contact.html
├── voidglyph.html      ← standalone, everything inlined
├── css/
│   └── design.css      ← design tokens, layout, animations
└── js/
    ├── ascii-engine.js ← Perlin noise, scenes, render loop
    └── shared.js       ← cursor, nav, scroll animations
```

---

## Getting Started

**Standalone** — open `voidglyph.html` directly in any browser. No server needed.

**Multi-file dev:**
```bash
npx serve .
# or
python -m http.server 8080
```

**GitHub Pages** — push to a repo, enable Pages from Settings → the `index.html` serves automatically.

---

## Customization

**Colors** — edit CSS variables in `css/design.css`:
```css
:root {
  --bg: #070707;
  --accent: #bfaa88;
  --red: #b03a1e;
  --font-display: 'Cormorant Garamond', serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

**New scene** — add a function to `ascii-engine.js`:
```javascript
function sceneMyScene(cols, rows, t = 0) {
  return ASCII.render(cols, rows, (c, r) => {
    const b = ASCII.fbm(c / cols * 3 + t * 0.1, r / rows * 3, 4) * 0.5 + 0.5;
    return ASCII.charAt(b, 'organic');
  });
}
```

**Animation speed** — third argument to `ASCII.animate()`:
```javascript
ASCII.animate(el, ASCII.sceneEye, cols, rows, 0.5); // 0.5× speed
```

---

## Technical Notes

- **Zero dependencies** — no frameworks, no bundler, no build step
- **SPA router** — instant client-side navigation; animations stop when you leave a page
- **Lazy rendering** — `IntersectionObserver` pauses ASCII loops when off-screen
- **Perlin noise** — custom implementation, no external library
- **Responsive** — 320px mobile to 4K; cursor hidden on touch devices
- **Fonts** — [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts

---

## License

MIT © 2026 VOID∙GLYPH Studio

---

<div align="center">
  <br>
  <strong>VOID∙GLYPH — Where Type Sees</strong><br>
  <sub>Built with zero dependencies. Every character earns its position.</sub>
  <br><br>
</div>
