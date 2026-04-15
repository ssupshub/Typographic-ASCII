/* shared.js — navigation, cursor, page transitions (optimized) */
'use strict';

/* ── Cursor: uses CSS transform (compositor-only, no layout) ── */
(function initCursor() {
  const dot   = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  if (!dot || !trail) return;

  // Detect touch — hide cursor on touch devices
  if ('ontouchstart' in window) {
    dot.style.display = 'none';
    trail.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mx=0, my=0, tx=0, ty=0;
  // Passive listener = browser never blocks scroll waiting for handler
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  document.querySelectorAll('a, button, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hover'),  { passive: true });
    el.addEventListener('mouseleave', () => dot.classList.remove('hover'), { passive: true });
  });

  // Use transform instead of left/top — stays on compositor thread
  function loop() {
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    dot.style.transform   = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    trail.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── Active nav ── */
(function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href').split('/').pop() === path) a.classList.add('active');
  });
})();

/* ── Fade-up on scroll ── */
(function initFadeUps() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();

/* ── Page indicator ── */
(function setPageIndicator() {
  const map = {
    'index.html': 'Home', '': 'Home',
    'works.html': 'Works', 'about.html': 'About',
    'process.html': 'Process', 'contact.html': 'Contact'
  };
  const el = document.getElementById('nav-indicator');
  if (el) el.textContent = map[location.pathname.split('/').pop()] || '';
})();

document.querySelector('.page-wrap')?.classList.add('page-enter');
