/* L'Étoile Clermont — main.js */
(function () {
  'use strict';

  // Mobile toggle
  var toggle = document.querySelector('.mobile-toggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Header scroll
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Scroll to top
  var btn = document.getElementById('scrollTop');
  if (btn) {
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Hero Swiper
  if (document.querySelector('.hero-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 6000, disableOnInteraction: false },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.hero-swiper .swiper-button-next', prevEl: '.hero-swiper .swiper-button-prev' }
    });
  }

  // Gallery Swiper
  if (document.querySelector('.gallery-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: '.gallery-swiper .swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
})();
