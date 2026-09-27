# GSS website

Plain HTML, CSS and JavaScript, with a PHP careers feed. No build step is needed.

```text
html/                  Website pages; homepage: html/index.html
css/
  style.css            Entry file; imports modules in cascade order
  base/                Tokens, typography, layout, responsive and motion rules
  components/          Navigation, forms, sections, footer and legal dialogs
  pages/               Styles named after their pages
js/
  core/                Site behavior, initialization, legal dialogs and redirect
  pages/               Careers, contact and clientele behavior
images/
  brand/               GSS logos
  certifications/      Certification and award logos
  clients/             Client logos and their manifest
  home/                Homepage photography
  pages/               Inner-page photography
  backgrounds/         Supporting background artwork
  source/              Original source artwork
server/                PHP careers endpoint and local runtime files
data/                  Optional manual jobs feed
docs/                  Editing guides, setup instructions and cleanup audit
  previews/            Historical design screenshots
tools/                 Logo preparation and site checks
  diagnostics/         Standalone Ceipal diagnostic
tests/                 PHP regression tests
  fixtures/            Captured third-party diagnostic responses
index.html             Fallback root entry (opens html/index.html if rewrites are off)
```

## Editing

- Homepage: `html/index.html`
- Clientele: `html/clientele.html`, `css/pages/clientele.css`, `js/pages/clientele.js`
- Shared navigation and behavior: `css/components/interface.css`, `js/core/site.js`
- Colors and typography: `css/base/global.css`
- Other pages: matching files under `html/` and `css/pages/`

`css/style.css` preserves the original stylesheet order. Some page modules
contain shared editorial helpers, so keep its imports in order. Edit the named
modules instead of adding styles to the entry file.

Pages are served at clean URLs: `/` is `html/index.html` and `/about` is
`html/about.html`. The root `.htaccess` maps them (and redirects old
`/html/about.html`, `/about.html` and `/partner` addresses to the clean ones).
Links between pages use these root-relative clean URLs, e.g. `href="/about"`;
asset paths inside the pages stay relative (`../css/...`).

## Preview and checks

Run the VS Code task **Start website (PHP + live careers)**, or run
`php -S 127.0.0.1:8080 -t . tools/dev-router.php` from the project root
(the router applies the `.htaccess` clean URLs locally). Open
`http://127.0.0.1:8080/`. Static previews display the site, but live careers need PHP.

```text
python tools/check-site.py
php tests/careers-jobs-test.php
```

Deploy `index.html`, `html/`, `css/`, `js/`, the referenced images, and `server/`
together. The careers endpoint is `/server/careers-jobs.php`; provision its
ignored `server/.env.gss_newsite` configuration file on the host. Guides,
previews, source artwork, tools and tests
do not need publishing.

- [Careers integration](docs/CEIPAL-INTEGRATION.md)
- [Careers and Let's Connect email setup](docs/EMAIL-SETUP.md)
- [Editing client logos](docs/CLIENT-LOGOS.md)
- [Unused files audit](docs/UNUSED-FILES.md)
