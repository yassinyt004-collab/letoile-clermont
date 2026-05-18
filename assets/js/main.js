/* L'Étoile — main.js */
(function () {
  'use strict';

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
      });
    });
  }

  // Sticky header
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu filters
  var filterButtons = document.querySelectorAll('.menu-filters .filter');
  var sections = document.querySelectorAll('.menu-section');
  if (filterButtons.length && sections.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.filter;
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        sections.forEach(function (s) {
          if (target === 'all' || s.dataset.cat === target) { s.classList.remove('is-hidden'); }
          else { s.classList.add('is-hidden'); }
        });
      });
    });
  }

  // Swiper: Food carousel
  if (document.querySelector('.food-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.food-swiper', {
      slidesPerView: 1, spaceBetween: 16, loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: '.food-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.food-swiper .swiper-button-next', prevEl: '.food-swiper .swiper-button-prev' },
      breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }

  // Swiper: Testimonials
  if (document.querySelector('.testimonial-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1, spaceBetween: 16, loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.testimonial-swiper .swiper-pagination', clickable: true },
      breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.feature-card, .info-card, .testimonial-card, .about-img, .menu-text, .dish-card');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('visible'); }); }

  // Contact form
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.classList.remove('success','error');
      var d = new FormData(form);
      var name = (d.get('name')||'').toString().trim();
      var email = (d.get('email')||'').toString().trim();
      var msg = (d.get('message')||'').toString().trim();
      if (!name||!email||!msg) { status.textContent='Merci de remplir les champs obligatoires.'; status.classList.add('error'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent='Email invalide.'; status.classList.add('error'); return; }
      status.textContent='Envoi en cours…';
      setTimeout(function(){ status.textContent='Merci ! Message envoyé avec succès.'; status.classList.add('success'); form.reset(); }, 700);
    });
  }
})();
