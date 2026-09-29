// Enable progressive enhancement before the page body is parsed.
document.documentElement.classList.add('js');

// Links use clean URLs (/about), which need the .htaccess rewrites (live) or
// tools/dev-router.php (local PHP server). When a page is opened without
// them — straight from disk, or from a plain static server such as Live
// Server — the address still ends in /html/<page>.html, so point each clean
// link at its file (about.html) just before the click is handled.
(function () {
  'use strict';
  var path = window.location.pathname;
  var noRewrites = window.location.protocol === 'file:' || /\/html\/(?:[a-z0-9-]+\.html)?$/i.test(path);
  if (!noRewrites) return;

  var pages = [
    'about', 'alliances', 'blog', 'business-consulting', 'career', 'clientele',
    'contact', 'data-business-insight', 'global-talent', 'our-focus-area',
    'technology-delivery'
  ];

  function fileLink(e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var m = /^\/([a-z0-9-]*)\/?([?#].*)?$/i.exec(a.getAttribute('href'));
    if (!m) return;
    var page = m[1] === '' ? 'index' : m[1].toLowerCase();
    if (page !== 'index' && pages.indexOf(page) === -1) return;
    a.setAttribute('href', page + '.html' + (m[2] || ''));
  }

  // capture phase, so the page-transition handler in site.js sees the file link
  document.addEventListener('click', fileLink, true);
  document.addEventListener('auxclick', fileLink, true);
}());
