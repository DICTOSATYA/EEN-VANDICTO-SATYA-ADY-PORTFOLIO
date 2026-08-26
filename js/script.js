// ============================================
// DICTO ADY PORTFOLIO — MAIN SCRIPT
// ============================================

'use strict';

// ============================================================
// LOADING SCREEN
// ============================================================
(function () {
  const loadingScreen = document.getElementById('loadingScreen');
  if (!loadingScreen) return;

  // ---- CONFIG ----
  const MIN_MS = 3800; // hard minimum display time (ms)
  const startTime = performance.now();

  // Prevent scroll while loading
  document.body.classList.add('is-loading');

  // ---- Binary Rain Canvas ----
  const canvas = document.getElementById('binaryCanvas');
  const ctx    = canvas.getContext('2d');
  let   rainRAF;

  // Each column has its own speed so the rain feels organic
  let columns, drops, speeds;

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / 16);
    drops   = Array.from({ length: columns }, () => Math.random() * -(canvas.height / 16));
    speeds  = Array.from({ length: columns }, () => 0.3 + Math.random() * 0.7);
  }

  function drawRain() {
    // Semi-transparent fill creates the fade/trail effect
    ctx.fillStyle = 'rgba(5, 7, 11, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
      const char  = Math.random() > 0.5 ? '1' : '0';
      const x     = i * 16;
      const y     = drops[i] * 16;
      const alpha = 0.25 + Math.random() * 0.75;

      ctx.font      = `bold ${12 + Math.floor(Math.random() * 4)}px monospace`;
      ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
      ctx.fillText(char, x, y);

      // Reset drop to top after it exits the bottom
      if (y > canvas.height && Math.random() > 0.97) {
        drops[i] = 0;
      }
      drops[i] += speeds[i];
    }
    rainRAF = requestAnimationFrame(drawRain);
  }

  resizeCanvas();
  drawRain();
  window.addEventListener('resize', resizeCanvas);

  // ---- Language Cycling (JavaScript-driven, guaranteed to work) ----
  const langItems  = Array.from(document.querySelectorAll('.loading-lang'));
  const langDots   = Array.from(document.querySelectorAll('.loading-lang-dot'));
  let   langIndex  = 0;

  // Make sure only first is active at start
  langItems.forEach((el, i) => el.classList.toggle('active', i === 0));
  langDots.forEach((d, i)  => d.classList.toggle('active', i === 0));

  const langInterval = setInterval(() => {
    // Stop after the last language — no loop
    if (langIndex >= langItems.length - 1) {
      clearInterval(langInterval);
      return;
    }

    const current = langItems[langIndex];

    // Slide current out upward
    current.classList.remove('active');
    current.classList.add('leaving');
    langDots[langIndex].classList.remove('active');

    setTimeout(() => {
      current.classList.remove('leaving');
    }, 350); // match CSS transition duration

    langIndex += 1;

    // Slide next in from below
    langItems[langIndex].classList.add('active');
    langDots[langIndex].classList.add('active');
  }, 1200);

  // ---- Bit Randomiser ----
  const bits = document.querySelectorAll('.bit');
  const bitInterval = setInterval(() => {
    bits.forEach(b => { b.textContent = Math.random() > 0.5 ? '1' : '0'; });
  }, 400);

  // ---- Progress Bar (time-based, tied to MIN_MS) ----
  const bar          = document.getElementById('loadingBar');
  const pctEl        = document.getElementById('loadingPct');
  const statusEl     = document.getElementById('loadingStatus');
  const progressWrap = bar ? bar.closest('[role="progressbar"]') : null;

  const statusMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING ASSETS...',
    'COMPILING MODULES...',
    'RENDERING INTERFACE...',
    'ALMOST READY...',
    'COMPLETE.',
  ];

  let lastStatusIdx = -1;

  function updateProgress() {
    const elapsed  = performance.now() - startTime;
    // Cap at 96% during animation — jump to 100 when dismissed
    const rawPct   = Math.min(96, (elapsed / MIN_MS) * 100);
    const pct      = Math.floor(rawPct);

    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    if (progressWrap) progressWrap.setAttribute('aria-valuenow', pct);

    const msgIdx = Math.min(
      statusMessages.length - 2, // reserve last for dismiss
      Math.floor((pct / 96) * (statusMessages.length - 1))
    );
    if (msgIdx !== lastStatusIdx) {
      lastStatusIdx = msgIdx;
      if (statusEl) statusEl.textContent = statusMessages[msgIdx];
    }

    if (elapsed < MIN_MS) {
      setTimeout(updateProgress, 80);
    }
  }
  updateProgress();

  // ---- Dismiss — only after MIN_MS has elapsed ----
  function dismissLoader() {
    if (loadingScreen.classList.contains('fade-out')) return;

    // Snap bar to 100% with a brief pause so user sees it
    if (bar) bar.style.width = '100%';
    if (pctEl) pctEl.textContent = '100%';
    if (statusEl) statusEl.textContent = statusMessages[statusMessages.length - 1];

    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      document.body.classList.remove('is-loading');

      // Start typewriter NOW — as fade begins, hero becomes visible
      startHeroTypewriter();

      loadingScreen.addEventListener('transitionend', () => {
        cancelAnimationFrame(rainRAF);
        clearInterval(langInterval);
        clearInterval(bitInterval);
        loadingScreen.remove();
      }, { once: true });
    }, 500); // 500ms pause at 100% before fade
  }

  // Dismiss after exactly MIN_MS (+ 500ms pause inside)
  setTimeout(dismissLoader, MIN_MS);

}());



// ============================================================
// TYPEWRITER — Hero Name
// =================================================
function startHeroTypewriter() {
  const nameEl = document.querySelector('.hero-heading .highlight');
  if (!nameEl) return;

  const fullText = nameEl.textContent.trim();
  if (!fullText) return;

  // ── Lock the element's width BEFORE clearing so heading doesn't shift ──
  const naturalWidth = nameEl.getBoundingClientRect().width;
  nameEl.style.display   = 'inline-block';
  nameEl.style.minWidth  = naturalWidth + 'px';

  // Create a standalone cursor span OUTSIDE .highlight
  // (avoids interference from background-clip: text on the parent)
  const cursor = document.createElement('span');
  cursor.className = 'hero-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  nameEl.insertAdjacentElement('afterend', cursor);

  // Clear text — layout is held by minWidth above
  nameEl.textContent = '';

  let index = 0;

  function typeNextChar() {
    if (index < fullText.length) {
      nameEl.textContent += fullText.charAt(index);
      index++;

      // Variable speed — slight pause on spaces and punctuation
      const ch      = fullText.charAt(index - 1);
      const isPause = ch === ' ' || ch === '.' || ch === ',';
      const delay   = isPause
        ? 90 + Math.random() * 40
        : 55 + Math.random() * 30;

      setTimeout(typeNextChar, delay);
    } else {
      // Typing done — release the locked width (text is full now)
      nameEl.style.minWidth = '';
      nameEl.style.display  = '';

      // Blink cursor then hide (visibility:hidden keeps its space, no shift)
      cursor.classList.add('typing-done');
      setTimeout(() => { cursor.style.visibility = 'hidden'; }, 3800);
    }
  }

  // Start immediately as loading fades
  typeNextChar();
}



// ---- THEME TOGGLE (Dark / Light Mode) ----
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Apply saved theme immediately (prevent flash)
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
    themeToggle.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
  }
}

applyTheme(savedTheme);

themeToggle && themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});



// ---- NAVBAR ----
const navbar = document.getElementById('navbar');

function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Throttle scroll handler for performance
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      updateNavbar();
      updateActiveNavLink();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

updateNavbar();

// ---- ACTIVE NAV LINK + BOTTOM NAV ----
const sections     = document.querySelectorAll('section[id], footer[id]');
const navLinks     = document.querySelectorAll('.nav-link[data-section]');
const bottomItems  = document.querySelectorAll('.bottom-nav-item[data-section]');

function updateActiveNavLink() {
  const scrollMid = window.scrollY + window.innerHeight * 0.45;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollMid >= top && scrollMid < bottom) {
      // Desktop nav links
      navLinks.forEach(l => {
        l.classList.toggle('active', l.dataset.section === section.id);
      });
      // Mobile bottom nav items
      bottomItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === section.id);
      });
    }
  });
}

// Bottom nav smooth scroll
bottomItems.forEach(item => {
  item.addEventListener('click', e => {
    const href = item.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ---- SCROLL REVEAL (IntersectionObserver) ----
const revealElements     = document.querySelectorAll('[data-reveal]');
const staggerContainers  = document.querySelectorAll('[data-stagger-children]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target); // Reveal once
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));

const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        staggerObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

staggerContainers.forEach(el => staggerObserver.observe(el));

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- PROJECT CARD TILT (subtle, desktop only) ----
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const maxTilt = 3; // degrees
      card.style.transform = `translateY(-6px) perspective(800px) rotateY(${dx * maxTilt}deg) rotateX(${-dy * maxTilt}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ---- SKILL CARD hover icon pulse ----
// Already handled by CSS, no extra JS needed.

// ---- TYPED TEXT effect (hero sub heading, subtle) ----
// Minimalist typewriter for a single span — optional, off by default.
// Uncomment if desired.
/*
function typeWriter(element, text, speed = 40) {
  element.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}
const heroSub = document.querySelector('.hero-subheading');
if (heroSub) {
  const originalText = heroSub.textContent.trim();
  heroSub.textContent = '';
  setTimeout(() => typeWriter(heroSub, originalText), 1000);
}
*/

// ---- CURRENT YEAR ----
const yearEls = document.querySelectorAll('.js-year');
yearEls.forEach(el => { el.textContent = new Date().getFullYear(); });



// ============================================================
// SAKURA PETAL — Navbar Hover Effect (desktop only)
// ============================================================
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const NAV_TARGETS = document.querySelectorAll('.nav-link, .nav-cv-btn, .nav-cta');
  const PETAL_COUNT = 5;
  const SPREAD_X    = 0.9;

  function rand(min, max) { return min + Math.random() * (max - min); }

  function spawnPetals(link) {
    const rect = link.getBoundingClientRect();
    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      petal.style.left = `${rect.left + rand(0, rect.width)}px`;
      petal.style.top  = `${rect.top  + rand(0, rect.height * 0.6)}px`;
      petal.style.setProperty('--petal-x',     `${rand(-rect.width * SPREAD_X, rect.width * SPREAD_X)}px`);
      petal.style.setProperty('--petal-y',     `${rand(28, 52)}px`);
      petal.style.setProperty('--petal-rot',   `${rand(0, 360)}deg`);
      petal.style.setProperty('--petal-spin',  `${rand(120, 260) * (Math.random() > 0.5 ? 1 : -1)}deg`);
      petal.style.setProperty('--petal-dur',   `${rand(0.75, 1.15)}s`);
      petal.style.setProperty('--petal-delay', `${rand(0, 0.22)}s`);
      document.body.appendChild(petal);
      const dur = parseFloat(petal.style.getPropertyValue('--petal-dur'));
      const del = parseFloat(petal.style.getPropertyValue('--petal-delay'));
      setTimeout(() => petal.remove(), (dur + del) * 1000 + 100);
    }
  }

  NAV_TARGETS.forEach(link => {
    link.addEventListener('mouseenter', () => spawnPetals(link));
  });
}());



// ============================================================
// PARTICLE CONSTELLATION BACKGROUND
// ============================================================
(function () {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ---- Config ----
  const CONFIG = {
    baseCount  : 85,          // particles on desktop
    mobileCount: 40,          // particles on small screens
    minSpeed   : 0.18,
    maxSpeed   : 0.42,
    minRadius  : 1.2,
    maxRadius  : 2.6,
    linkDist   : 140,         // max px to draw a connecting line
    linkWidth  : 0.7,
    // Colors — matching portfolio blue theme
    dotColor   : '96, 165, 250',   // blue-400
    lineColor  : '59, 130, 246',   // blue-500
    dotAlpha   : 0.75,
    lineAlpha  : 0.18,
  };

  let W, H, particles, raf;

  // ---- Particle class ----
  function Particle() {
    this.reset(true);
  }

  Particle.prototype.reset = function (init) {
    this.x  = Math.random() * W;
    this.y  = init ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
    const angle = Math.random() * Math.PI * 2;
    const speed = CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.r  = CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius);
    this.alpha = 0.4 + Math.random() * 0.6;
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    // Soft-bounce off edges
    if (this.x < 0)  { this.x = 0;  this.vx *= -1; }
    if (this.x > W)  { this.x = W;  this.vx *= -1; }
    if (this.y < 0)  { this.y = 0;  this.vy *= -1; }
    if (this.y > H)  { this.y = H;  this.vy *= -1; }
  };

  // ---- Resize ----
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  }

  // ---- Init particles ----
  function init() {
    const count = W < 768 ? CONFIG.mobileCount : CONFIG.baseCount;
    particles = Array.from({ length: count }, () => new Particle());
  }

  // ---- Draw frame ----
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    particles.forEach(p => p.update());

    // Draw connecting lines first (behind dots)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a  = particles[i];
        const b  = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d < CONFIG.linkDist) {
          const alpha = CONFIG.lineAlpha * (1 - d / CONFIG.linkDist);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${CONFIG.lineColor}, ${alpha})`;
          ctx.lineWidth   = CONFIG.linkWidth;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw dots on top
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.dotColor}, ${p.alpha * CONFIG.dotAlpha})`;
      ctx.fill();

      // Soft glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.dotColor}, ${p.alpha * 0.08})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }

  // ---- Pause when tab hidden (save CPU) ----
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      draw();
    }
  });

  window.addEventListener('resize', resize, { passive: true });

  // ---- Start ----
  resize();
  draw();
}());

