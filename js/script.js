// ============================================
// DICTO ADY PORTFOLIO — MAIN SCRIPT
// ============================================

'use strict';

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
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobile');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.nav-link') : [];

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

// Hamburger toggle
hamburger && hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNavLink() {
  const scrollMid = window.scrollY + window.innerHeight * 0.45;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollMid >= top && scrollMid < bottom) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.dataset.section === section.id);
      });
    }
  });
}

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

// ---- KEYBOARD NAVIGATION for mobile menu ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }
});
