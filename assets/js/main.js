/* Kebab 37 — main.js */
(function () {
  'use strict';

  // ---------- Mobile nav ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primaryNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
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
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Footer year ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Swiper: Food carousel ----------
  var foodEl = document.querySelector('.food-swiper');
  if (foodEl && typeof Swiper !== 'undefined') {
    new Swiper('.food-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: '.food-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.food-swiper .swiper-button-next', prevEl: '.food-swiper .swiper-button-prev' },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  // ---------- Swiper: Testimonials ----------
  var testiEl = document.querySelector('.testimonial-swiper');
  if (testiEl && typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.testimonial-swiper .swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  // ---------- Reveal on scroll ----------
  var revealEls = document.querySelectorAll(
    '.feature-card, .info-card, .testimonial-card, .about-img, .menu-page-img, .hero-text, .menu-text'
  );
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---------- Contact form ----------
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.classList.remove('success', 'error');
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var message = (data.get('message') || '').toString().trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
      setTimeout(function () {
        status.textContent = 'Merci ! Votre message a bien été envoyé.';
        status.classList.add('success');
        form.reset();
      }, 700);
    });
  }
})();
