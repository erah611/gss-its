/* Live chat (tawk.to), bottom-right on every page.

   tawk.to's JavaScript API only shows/hides the widget; its position,
   colours, greeting and offline form are set in the tawk.to dashboard.
   See docs/LIVE-CHAT.md for the settings that match the site's palette.

   The bubble is hidden while the site's own overlays are open (mobile
   menu, Privacy/Disclaimer dialog, Easy Apply), which mark <html> with
   .nav-open or .legal-is-open, so it never floats over them. */
(function () {
  'use strict';

  var EMBED_SRC = 'https://embed.tawk.to/6ac6bde198496b34cde4bd47/1k4c5bect';

  // Must exist before the embed script loads.
  var Tawk_API = window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  var root = document.documentElement;
  var loaded = false;

  function overlayOpen() {
    return root.classList.contains('nav-open') || root.classList.contains('legal-is-open');
  }

  function syncVisibility() {
    if (!loaded) return;
    if (overlayOpen()) {
      // leave an open conversation alone; only tuck the bubble away
      if (!(Tawk_API.isChatMaximized && Tawk_API.isChatMaximized())) Tawk_API.hideWidget();
    } else {
      Tawk_API.showWidget();
    }
  }

  Tawk_API.onLoad = function () {
    loaded = true;
    syncVisibility();
  };

  if (window.MutationObserver) {
    new MutationObserver(syncVisibility).observe(root, { attributes: true, attributeFilter: ['class'] });
  }

  var s = document.createElement('script');
  s.async = true;
  s.src = EMBED_SRC;
  s.charset = 'UTF-8';
  s.setAttribute('crossorigin', '*');
  document.head.appendChild(s);
}());
