/* ============================================
   L'Étoile Clermont — Premium JS
   Smooth animations, Swiper, scroll effects
   ============================================ */
(function () {
  'use strict';

  // --- Mobile Menu ---
  var burger = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Header Scroll Effect ---
  var header = document.getElementById('header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('scrolled', y > 60);
      lastScroll = y;
    }, { passive: true });
  }

  // --- Scroll To Top ---
  var scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Footer Year ---
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Swiper: Hero ---
  if (document.querySelector('.hero-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.hero-swiper', {
      loop: true,
      speed: 800,
      autoplay: { delay: 5500, disableOnInteraction: false },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.hero-swiper .swiper-button-next', prevEl: '.hero-swiper .swiper-button-prev' }
    });
  }

  // --- Swiper: Gallery ---
  if (document.querySelector('.gallery-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.gallery-swiper', {
      loop: true,
      speed: 600,
      autoplay: { delay: 3000, disableOnInteraction: false },
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: { el: '.gallery-swiper .swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 16 },
        1024: { slidesPerView: 3, spaceBetween: 20 }
      }
    });
  }

  // --- Scroll Reveal (IntersectionObserver) ---
  var animElements = document.querySelectorAll('[data-animate]');
  if (animElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    animElements.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all immediately
    animElements.forEach(function (el) { el.classList.add('visible'); });
  }

  // --- Stagger animation for menu item cards ---
  var menuCats = document.querySelectorAll('.menu-cat');
  if (menuCats.length && 'IntersectionObserver' in window) {
    var menuObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var cards = entry.target.querySelectorAll('.item-card');
          cards.forEach(function (card, i) {
            card.style.transitionDelay = (i * 60) + 'ms';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
          menuObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.02, rootMargin: '0px 0px 100px 0px' });

    menuCats.forEach(function (cat) {
      var cards = cat.querySelectorAll('.item-card');
      cards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity .4s ease, transform .4s ease';
      });
      menuObserver.observe(cat);
    });

    // Fallback: show all after 2s in case observer doesn't fire
    setTimeout(function () {
      document.querySelectorAll('.item-card').forEach(function (card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }, 2000);
  }

  // --- Smooth anchor scroll for menu page ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

})();
