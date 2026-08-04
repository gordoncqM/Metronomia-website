/**
 * Metronomia — interactions communes
 * Menu mobile, année du footer, formulaire de contact
 */
(function () {
  'use strict';

  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');
  var yearEl = document.getElementById('year');
  var contactForm = document.getElementById('contact-form');
  var formFeedback = document.getElementById('form-feedback');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        formFeedback.textContent = 'Veuillez remplir tous les champs correctement.';
        formFeedback.className = 'form__feedback form__feedback--error';
        return;
      }

      formFeedback.textContent = 'Message envoyé ! Nous vous répondrons rapidement.';
      formFeedback.className = 'form__feedback form__feedback--success';
      contactForm.reset();
    });
  }
})();
