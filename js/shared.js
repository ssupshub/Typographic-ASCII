/* shared.js — navigation, cursor, page transitions */

// ─── Cursor ───────────────────────────────────────────────
(function initCursor() {
  const dot = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  if (!dot || !trail) return;

  let mx=0, my=0, tx=0, ty=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  document.addEventListener('mouseenter', () => { dot.style.opacity='1'; trail.style.opacity='0.5'; });
  document.addEventListener('mouseleave', () => { dot.style.opacity='0'; trail.style.opacity='0'; });

  // hover state for links/buttons
  document.querySelectorAll('a, button, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hover'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
  });

  function loop() {
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();

// ─── Active nav link ─────────────────────────────────────
(function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();

// ─── Scroll fade-up ───────────────────────────────────────
(function initFadeUps() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();

// ─── Page indicator ───────────────────────────────────────
(function setPageIndicator() {
  const map = {
    'index.html': 'Home',
    '': 'Home',
    'works.html': 'Works',
    'about.html': 'About',
    'process.html': 'Process',
    'contact.html': 'Contact',
  };
  const page = location.pathname.split('/').pop();
  const el = document.getElementById('nav-indicator');
  if (el) el.textContent = map[page] || '';
})();

// ─── Page enter animation ─────────────────────────────────
document.querySelector('.page-wrap')?.classList.add('page-enter');
