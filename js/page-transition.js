/**
 * Transitions inter-pages — Metronomia
 *
 * Intercepte les liens internes, affiche un calque bleu (#d4d9ec) à la sortie
 * puis à l'entrée, pour éviter le flash blanc du navigateur entre deux HTML.
 *
 * Dépendances : classes CSS dans css/style.css + CSS critique inline dans le <head>.
 * Clé sessionStorage : metronomia-page-enter
 */
(function () {
  var STORAGE_KEY = 'metronomia-page-enter';
  var MIN_COVER_MS = 40;   // Durée minimale du calque à l'entrée
  var MAX_COVER_MS = 2500; // Sécurité si window.load ne se déclenche pas
  var root = document.documentElement;
  var coverStart = Date.now();

  /** Respecte la préférence système « réduire les animations ». */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Vrai si le lien mène à une autre page du même site. */
  function isInternalNavLink(anchor) {
    if (anchor.target === '_blank' || anchor.hasAttribute('download')) return false;

    var href = anchor.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) {
      return false;
    }

    try {
      var url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return false;
      if (url.pathname === window.location.pathname && url.hash) return false;
      return true;
    } catch (err) {
      return false;
    }
  }

  var isLeaving = false;

  /** Marque la page suivante et navigue. */
  function navigateTo(url) {
    sessionStorage.setItem(STORAGE_KEY, '1');
    window.location.assign(url);
  }

  /** Calque bleu instantané, puis redirection. */
  function playExitThenNavigate(url) {
    if (isLeaving) return;
    if (prefersReducedMotion()) {
      navigateTo(url);
      return;
    }

    isLeaving = true;
    root.classList.add('page-transition-exit');
    root.offsetHeight; // Force le recalcul du style avant navigation
    navigateTo(url);
  }

  /** Retire le calque d'entrée avec un fondu court. */
  function revealPage() {
    if (!root.classList.contains('page-transition-enter')) return;

    sessionStorage.removeItem(STORAGE_KEY);

    if (prefersReducedMotion()) {
      root.classList.remove('page-transition-enter');
      return;
    }

    var elapsed = Date.now() - coverStart;
    var delay = Math.max(0, MIN_COVER_MS - elapsed);

    window.setTimeout(function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          root.classList.remove('page-transition-enter');
        });
      });
    }, delay);
  }

  /** Attend le chargement complet avant de révéler la page. */
  function playEnter() {
    if (!root.classList.contains('page-transition-enter')) return;

    if (document.readyState === 'complete') {
      revealPage();
      return;
    }

    window.addEventListener('load', revealPage, { once: true });
    window.setTimeout(revealPage, MAX_COVER_MS);
  }

  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a');
    if (!anchor || !isInternalNavLink(anchor)) return;
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    playExitThenNavigate(anchor.href);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', playEnter);
  } else {
    playEnter();
  }
})();
