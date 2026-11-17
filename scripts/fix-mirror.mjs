import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const ASSETS = path.join(SITE, 'assets');

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 8) return reject(new Error('Too many redirects'));
    const lib = url.startsWith('http://') ? http : https;
    const req = lib.get(
      url,
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 60000,
      },
      (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          const next = new URL(res.headers.location, url).href;
          res.resume();
          return resolve(fetchBuffer(next, redirects + 1));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () =>
          resolve({ status: res.statusCode, buffer: Buffer.concat(chunks), headers: res.headers })
        );
      }
    );
    req.on('error', reject);
  });
}

function walk(dir, filter) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p, filter));
    else if (!filter || filter(p)) out.push(p);
  }
  return out;
}

function localFor(remoteUrl) {
  const u = new URL(remoteUrl.split('#')[0]);
  if (u.hostname.includes('googleapis') || u.hostname.includes('gstatic')) {
    const name = Buffer.from(u.href).toString('base64url').slice(0, 60);
    const ext = u.hostname.includes('gstatic') ? path.extname(u.pathname) || '.woff2' : '.css';
    return path.join(ASSETS, 'external', u.hostname.replace(/\./g, '_'), name + ext);
  }
  let p = decodeURIComponent(u.pathname.replace(/^\/+/, ''));
  if (!p) p = 'index.bin';
  return path.join(ASSETS, p);
}

const cache = new Map();
async function ensure(remoteUrl) {
  const clean = remoteUrl.replace(/\\+/g, '/').replace(/&amp;/g, '&').replace(/&#038;/g, '&');
  if (!/^https?:/i.test(clean)) return null;
  if (cache.has(clean)) return cache.get(clean);
  const local = localFor(clean);
  cache.set(clean, local);
  if (fs.existsSync(local) && fs.statSync(local).size > 0) return local;
  fs.mkdirSync(path.dirname(local), { recursive: true });
  try {
    const { status, buffer } = await fetchBuffer(clean);
    if (status >= 400) {
      console.warn('FAIL', status, clean);
      cache.delete(clean);
      return null;
    }
    fs.writeFileSync(local, buffer);
    console.log('DL', buffer.length, clean);
    return local;
  } catch (e) {
    console.warn('ERR', clean, e.message);
    cache.delete(clean);
    return null;
  }
}

function toRel(fromFile, absFile) {
  let rel = path.relative(path.dirname(fromFile), absFile).split(path.sep).join('/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

const MUST = [
  'https://seamassagephuket.com/wp-content/uploads/2024/09/2.jpg',
  'https://seamassagephuket.com/wp-content/uploads/2024/09/Head-Spa.jpg',
  'https://seamassagephuket.com/wp-content/uploads/2024/09/head-massage-phuket.jpg',
  'https://seamassagephuket.com/wp-content/plugins/elementor/assets/css/conditionals/dialog.min.css?ver=4.3.6',
  'https://fonts.googleapis.com/css?family=Urbanist:400|Montserrat:700&display=swap',
  'https://fonts.googleapis.com/css?family=Roboto:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap',
  'https://fonts.googleapis.com/css?family=Roboto+Slab:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap',
];

async function processGoogleCss(localCss, remoteCss) {
  let css = fs.readFileSync(localCss, 'utf8');
  const urls = [...css.matchAll(/url\((['"]?)([^'")]+)\1\)/g)].map((m) => {
    try {
      return new URL(m[2], remoteCss).href;
    } catch {
      return null;
    }
  }).filter(Boolean);
  for (const u of urls) {
    const local = await ensure(u);
    if (!local) continue;
    const rel = path.relative(path.dirname(localCss), local).split(path.sep).join('/');
    css = css.split(u).join(rel);
  }
  fs.writeFileSync(localCss, css);
}

async function main() {
  for (const u of MUST) await ensure(u);

  // Download fonts referenced by google css
  for (const [remote, local] of [...cache.entries()]) {
    if (local && remote.includes('fonts.googleapis.com')) {
      await processGoogleCss(local, remote);
    }
  }

  const htmlFiles = walk(SITE, (p) => p.endsWith('.html'));
  const remotes = new Set();

  for (const file of htmlFiles) {
    let html = fs.readFileSync(file, 'utf8');
    const matches = [
      ...(html.match(/https?:\\\/\\\/seamassagephuket\.com\\\/[^"'\\\s)]+/g) || []),
      ...(html.match(/https?:\/\/seamassagephuket\.com\/[^"'\\\s)]+/g) || []),
      ...(html.match(/https?:\/\/fonts\.googleapis\.com\/[^"'\\\s)]+/g) || []),
      ...(html.match(/https?:\/\/fonts\.gstatic\.com\/[^"'\\\s)]+/g) || []),
    ];
    for (const raw of matches) {
      const unescaped = raw.replace(/\\\//g, '/').replace(/&amp;/g, '&').replace(/&#038;/g, '&');
      remotes.add(unescaped.split('#')[0]);
    }
  }

  console.log('Found remotes', remotes.size);
  for (const u of remotes) {
    if (/\.(css|js|png|jpe?g|webp|gif|svg|woff2?|ttf|eot|ico)(\?|$)/i.test(u) || u.includes('/wp-content/') || u.includes('fonts.')) {
      await ensure(u);
    }
  }

  // Rewrite all HTML files
  for (const file of htmlFiles) {
    let html = fs.readFileSync(file, 'utf8');

    // Map known assets
    for (const [remote, local] of cache.entries()) {
      if (!local) continue;
      const rel = toRel(file, local);
      // normal
      html = html.split(remote).join(rel);
      // JSON escaped
      const jsonEsc = remote.replace(/\//g, '\\/');
      html = html.split(jsonEsc).join(rel.replace(/\//g, '\\/'));
      // HTML entity query
      html = html.split(remote.replace(/&/g, '&#038;')).join(rel);
      html = html.split(remote.replace(/&/g, '&amp;')).join(rel);
    }

    // Force google font CSS links to local Urbanist/Montserrat
    const urban = [...cache.entries()].find(([r]) => r.includes('Urbanist'));
    if (urban?.[1]) {
      const rel = toRel(file, urban[1]);
      html = html.replace(
        /https:\/\/fonts\.googleapis\.com\/css\?family=Urbanist[^"']*/g,
        rel
      );
      html = html.replace(
        /https:\/\/fonts\.googleapis\.com\/css\?family=Urbanist[^"']*&#038;[^"']*/g,
        rel
      );
    }

    // Root-relative assets
    const depth = path.relative(SITE, path.dirname(file)).split(path.sep).filter(Boolean).length;
    const prefix = depth ? '../'.repeat(depth) : './';
    html = html.replace(/(["'])\/wp-content\//g, `$1${prefix}assets/wp-content/`);
    html = html.replace(/(["'])\/wp-includes\//g, `$1${prefix}assets/wp-includes/`);

    // Fix internal nav for nested pages: links like ./head-spa-phuket/ from nested dirs
    if (depth > 0) {
      html = html.replace(/href="\.\/head-spa-phuket\//g, `href="${prefix}head-spa-phuket/`);
      html = html.replace(/href="\.\/facial-massage\//g, `href="${prefix}facial-massage/`);
      html = html.replace(/href="\.\/other-massage\//g, `href="${prefix}other-massage/`);
      html = html.replace(/href="\.\/gallery\//g, `href="${prefix}gallery/`);
      html = html.replace(/href="\.\/reviews\//g, `href="${prefix}reviews/`);
      html = html.replace(/href="\.\/contact\//g, `href="${prefix}contact/`);
      html = html.replace(/href="\.\/about\//g, `href="${prefix}about/`);
      html = html.replace(/href="\.\/"/g, `href="${prefix}"`);
      html = html.replace(/href='\.\//g, `href='${prefix}`);
      // homepage-only relative that became wrong
      html = html.replace(/href="\.\/#(.*?)"/g, `href="${prefix}#$1"`);
    }

    // Point remaining seamassage domain page links locally
    html = html.replace(/https:\/\/seamassagephuket\.com\/head-spa-phuket\/?/g, `${prefix}head-spa-phuket/`);
    html = html.replace(/https:\/\/seamassagephuket\.com\/facial-massage\/?/g, `${prefix}facial-massage/`);
    html = html.replace(/https:\/\/seamassagephuket\.com\/other-massage\/?/g, `${prefix}other-massage/`);
    html = html.replace(/https:\/\/seamassagephuket\.com\/gallery\/?/g, `${prefix}gallery/`);
    html = html.replace(/https:\/\/seamassagephuket\.com\/reviews\/?/g, `${prefix}reviews/`);
    html = html.replace(/https:\/\/seamassagephuket\.com\/contact\/?/g, `${prefix}contact/`);
    html = html.replace(/https:\/\/seamassagephuket\.com\/about\/?/g, `${prefix}about/`);
    html = html.replace(/https:\/\/seamassagephuket\.com\/?/g, prefix);

    // Inject fonts CSS if missing local
    if (urban?.[1] && !html.includes(path.basename(urban[1]))) {
      const rel = toRel(file, urban[1]);
      html = html.replace('</head>', `<link rel="stylesheet" href="${rel}"></head>`);
    }

    // Remove broken base tag if present and inject correct one
    html = html.replace(/<base[^>]*>/i, '');
    html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${prefix}">`);

    fs.writeFileSync(file, html, 'utf8');
    console.log('fixed', path.relative(SITE, file));
  }

  // Also rewrite CSS under assets for url(https://seamassage...)
  const cssFiles = walk(ASSETS, (p) => p.endsWith('.css'));
  for (const file of cssFiles) {
    let css = fs.readFileSync(file, 'utf8');
    let changed = false;
    const urls = [...css.matchAll(/https?:\/\/seamassagephuket\.com\/[^"')\s]+/g)].map((m) => m[0]);
    for (const u of urls) {
      const local = await ensure(u);
      if (!local) continue;
      const rel = path.relative(path.dirname(file), local).split(path.sep).join('/');
      css = css.split(u).join(rel);
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(file, css);
      console.log('css fixed', path.relative(SITE, file));
    }
  }

  console.log('Done fix');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
