<?php
/**
 * tools/dev-router.php
 * ------------------------------------------------------------
 * Local development only. PHP's built-in server ignores .htaccess, so
 * this router mirrors the clean-URL rules in the root .htaccess:
 *
 *   php -S localhost:8000 tools/dev-router.php      (run from the repo root)
 *
 * /about is served from html/about.html, old /html/... and *.html
 * addresses redirect to the clean ones, and everything else (css, js,
 * images, server/*.php) is left to the built-in server.
 */

$root = dirname(__DIR__);
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');
$query = $_SERVER['QUERY_STRING'] ?? '';

function dev_redirect($to, $query) {
    header('Location: ' . $to . ($query !== '' ? '?' . $query : ''), true, 302);
    exit();
}

function dev_page($root, $slug) {
    $file = $root . '/html/' . $slug . '.html';
    return preg_match('/^[a-z0-9-]+$/i', $slug) && is_file($file) ? $file : null;
}

// 1. /index.html, /html, /html/, /html/index(.html) -> /
if (preg_match('#^/+(?:index\.html|html/?|html/index(?:\.html)?)$#i', $path)) {
    dev_redirect('/', $query);
}

// 2. Renamed pages and aliases
if (preg_match('#^/+(?:html/)?partner(?:\.html)?/?$#i', $path)) {
    dev_redirect('/alliances', $query);
}
if (preg_match('#^/+careers/?$#i', $path)) {
    dev_redirect('/career', $query);
}

// 3. /html/about or /html/about.html -> /about
if (preg_match('#^/+html/([a-z0-9-]+?)(?:\.html)?/?$#i', $path, $m)) {
    dev_redirect('/' . $m[1], $query);
}

// 4. /about.html -> /about
if (preg_match('#^/+([a-z0-9-]+)\.html$#i', $path, $m) && dev_page($root, $m[1])) {
    dev_redirect('/' . $m[1], $query);
}

// 5–6. / and /about -> the page in html/
$slug = null;
if ($path === '/') {
    $slug = 'index';
} elseif (preg_match('#^/([a-z0-9-]+)/?$#i', $path, $m) && !file_exists($root . '/' . $m[1])) {
    $slug = $m[1];
}
if ($slug !== null && ($file = dev_page($root, $slug))) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($file);
    return true;
}

return false;
