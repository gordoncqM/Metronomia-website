(function () {
  var STORAGE_KEY = 'metronomia-page-enter';
  var MIN_COVER_MS = 40;
  var MAX_COVER_MS = 2500;
  var root = document.documentElement;
  var coverStart = Date.now();

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

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

  function navigateTo(url) {
    sessionStorage.setItem(STORAGE_KEY, '1');
    window.location.assign(url);
  }

  function playExitThenNavigate(url) {
    if (isLeaving) return;
    if (prefersReducedMotion()) {
      navigateTo(url);
      return;
    }

    isLeaving = true;
    root.classList.add('page-transition-exit');
    root.offsetHeight;
    navigateTo(url);
  }

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
