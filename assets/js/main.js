/* L'Étoile Clermont — main.js
   - Mobile nav toggle
   - Sticky header shadow on scroll
   - Menu category filters
   - Reveal-on-scroll
   - Contact form (client-side validation + fake submit)
*/

(function () {
  'use strict';

  // ---------- Mobile nav ----------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primaryNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close mobile nav when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---------- Sticky header shadow ----------
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Menu filters ----------
  const filterButtons = document.querySelectorAll('.menu-filters .filter');
  const sections = document.querySelectorAll('.menu-section');

  if (filterButtons.length && sections.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.dataset.filter;

        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        sections.forEach(function (s) {
          if (target === 'all' || s.dataset.cat === target) {
            s.classList.remove('is-hidden');
          } else {
            s.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll(
    '.feature-card, .dish-card, .quote-card, .value-card, .order-card, .timeline li, .gal-item, .story-media, .info-band, .section-head'
  );
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---------- Contact form ----------
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.classList.remove('success', 'error');

      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !email || !message) {
        status.textContent = 'Merci de remplir les champs obligatoires.';
        status.classList.add('error');
        return;
      }
      if (!emailOk) {
        status.textContent = 'Adresse email invalide.';
        status.classList.add('error');
        return;
      }

      status.textContent = 'Envoi en cours…';

      // Simulate request
      setTimeout(function () {
        status.textContent = 'Merci ! Votre message a bien été envoyé. On vous répond très vite.';
        status.classList.add('success');
        form.reset();
      }, 700);
    });
  }
})();
