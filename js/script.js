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
  const MIN_MS = 7000; // hard minimum display time (ms)
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
    const current = langItems[langIndex];

    // Slide current out upward
    current.classList.remove('active');
    current.classList.add('leaving');
    langDots[langIndex].classList.remove('active');

    setTimeout(() => {
      current.classList.remove('leaving');
    }, 350); // match CSS transition duration

    langIndex = (langIndex + 1) % langItems.length;

    // Slide next in from below
    langItems[langIndex].classList.add('active');
    langDots[langIndex].classList.add('active');
  }, 2000);

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
