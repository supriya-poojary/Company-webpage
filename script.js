/* =============================================
   LUMINOS INTERIOR DESIGN — SCRIPT.JS
   ============================================= */

'use strict';

// ---- PRELOADER ----
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => {
    pre.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2400);
});
document.body.style.overflow = 'hidden';

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .pcard, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    follower.style.width = '50px';
    follower.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.width = '32px';
    follower.style.height = '32px';
  });
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ---- MOBILE MENU ----
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  });
});

// ---- HERO PARALLAX ----
const heroImg = document.getElementById('heroImg');
window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const y = window.scrollY;
  heroImg.style.transform = `scale(1) translateY(${y * 0.35}px)`;
}, { passive: true });

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ---- COUNTER ANIMATION ----
function animateCount(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        animateCount(el, parseInt(el.dataset.target));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ---- PORTFOLIO FILTER ----
const ftabs  = document.querySelectorAll('.ftab');
const pcards = document.querySelectorAll('.pcard');

ftabs.forEach(tab => {
  tab.addEventListener('click', () => {
    ftabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;

    pcards.forEach(card => {
      const cat = card.dataset.cat;
      const show = filter === 'all' || cat === filter;
      card.style.transition = 'opacity .4s, transform .4s';
      if (show) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';
        setTimeout(() => { card.style.display = 'none'; }, 400);
      }
    });
  });
});

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.style.opacity = '.7';
    setTimeout(() => {
      btn.textContent = 'Enquiry Sent — We will be in touch.';
      btn.style.background = '#2a7a4b';
      btn.style.color = '#fff';
      contactForm.reset();
    }, 1800);
  });
}

// ---- PILL CHECKBOX HIGHLIGHT ----
document.querySelectorAll('.pill').forEach(pill => {
  const cb = pill.querySelector('input[type="checkbox"]');
  cb.addEventListener('change', () => {
    pill.style.background    = cb.checked ? 'var(--gold)' : '';
    pill.style.color         = cb.checked ? 'var(--dark)' : '';
    pill.style.borderColor   = cb.checked ? 'var(--gold)' : '';
  });
});

// ---- SMOOTH ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--gold)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeSectionObserver.observe(s));

// ---- TILT EFFECT ON CARDS ----
document.querySelectorAll('.tcard, .service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    card.style.transform = `perspective(800px) rotateX(${-y/25}deg) rotateY(${x/25}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- STICKY NAV HIDE ON FAST SCROLL DOWN ----
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY + 6 && y > 300) {
    navbar.style.transform = 'translateY(-100%)';
  } else if (y < lastY - 6) {
    navbar.style.transform = 'translateY(0)';
  }
  lastY = y;
  navbar.style.transition = 'transform .4s cubic-bezier(0.25,0.46,0.45,0.94), background .4s, box-shadow .4s';
}, { passive: true });
