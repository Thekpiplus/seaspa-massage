import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'site');
const ASSETS = path.join(OUT, 'assets');

const PAGES = [
  { url: 'https://seamassagephuket.com/', file: 'index.html' },
  { url: 'https://seamassagephuket.com/head-spa-phuket/', file: 'head-spa-phuket/index.html' },
  { url: 'https://seamassagephuket.com/facial-massage/', file: 'facial-massage/index.html' },
  { url: 'https://seamassagephuket.com/other-massage/', file: 'other-massage/index.html' },
  { url: 'https://seamassagephuket.com/gallery/', file: 'gallery/index.html' },
  { url: 'https://seamassagephuket.com/reviews/', file: 'reviews/index.html' },
  { url: 'https://seamassagephuket.com/contact/', file: 'contact/index.html' },
  { url: 'https://seamassagephuket.com/about/', file: 'about/index.html' },
];

fs.mkdirSync(ASSETS, { recursive: true });

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 8) return reject(new Error('Too many redirects: ' + url));
    const lib = url.startsWith('http://') ? http : https;
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: '*/*',
        },
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
          resolve({
            status: res.statusCode,
            headers: res.headers,
            buffer: Buffer.concat(chunks),
            finalUrl: url,
          })
        );
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout: ' + url));
    });
  });
}

function localAssetPath(remoteUrl) {
  const u = new URL(remoteUrl);
  let p = decodeURIComponent(u.pathname.replace(/^\/+/, ''));
  if (!p || p.endsWith('/')) p += 'index.html';
  // keep wp-content structure under assets/
  if (p.startsWith('wp-content/') || p.startsWith('wp-includes/')) {
    return path.join(ASSETS, p);
  }
  // fonts/css from other hosts
  const host = u.hostname.replace(/\./g, '_');
  return path.join(ASSETS, 'external', host, p.replace(/[<>:"|?*]/g, '_'));
}

function toSiteRelative(fromHtmlFile, absFile) {
  const fromDir = path.dirname(path.join(OUT, fromHtmlFile));
  let rel = path.relative(fromDir, absFile).split(path.sep).join('/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

const downloaded = new Map(); // remote -> local abs path

async function downloadAsset(remoteUrl) {
  if (!remoteUrl || !/^https?:/i.test(remoteUrl)) return null;
  if (remoteUrl.includes('googletagmanager') || remoteUrl.includes('google-analytics')) return null;
  if (downloaded.has(remoteUrl)) return downloaded.get(remoteUrl);

  const local = localAssetPath(remoteUrl);
  downloaded.set(remoteUrl, local);
  if (fs.existsSync(local) && fs.statSync(local).size > 0) return local;

  fs.mkdirSync(path.dirname(local), { recursive: true });
  try {
    const { status, buffer } = await fetchBuffer(remoteUrl);
    if (status >= 400) {
      console.warn('FAIL', status, remoteUrl);
      downloaded.delete(remoteUrl);
      return null;
    }
    fs.writeFileSync(local, buffer);
    console.log('asset', buffer.length, remoteUrl);
    return local;
  } catch (e) {
    console.warn('ERR', remoteUrl, e.message);
    downloaded.delete(remoteUrl);
    return null;
  }
}

function extractUrls(html, baseUrl) {
  const urls = new Set();
  const re =
    /(?:href|src|srcset|data-src|data-lazy-src|data-bg|content)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1];
    if (raw.includes(',')) {
      // srcset
      raw.split(',').forEach((part) => {
        const u = part.trim().split(/\s+/)[0];
        try {
          urls.add(new URL(u, baseUrl).href);
        } catch {}
      });
    } else {
      try {
        urls.add(new URL(raw, baseUrl).href);
      } catch {}
    }
  }
  const cssUrl = /url\((['"]?)([^'")]+)\1\)/gi;
  while ((m = cssUrl.exec(html))) {
    try {
      urls.add(new URL(m[2], baseUrl).href);
    } catch {}
  }
  return [...urls];
}

function rewriteHtml(html, pageFile, baseUrl, urlMap) {
  let out = html;

  // Remove analytics / GTM noise lightly
  out = out.replace(/<!-- Google Tag Manager[\s\S]*?<!-- End Google Tag Manager -->/gi, '');
  out = out.replace(/<script[^>]*googletagmanager[^>]*>[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<script[^>]*gtm4wp[^>]*>[\s\S]*?<\/script>/gi, '');

  // Rewrite absolute and protocol-relative URLs we downloaded
  for (const [remote, local] of urlMap.entries()) {
    if (!local) continue;
    const rel = toSiteRelative(pageFile, local);
    const escaped = remote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(escaped, 'g'), rel);
  }

  // Internal page links -> local paths
  const pageMap = {
    'https://seamassagephuket.com/': './',
    'https://seamassagephuket.com': './',
    'http://seamassagephuket.com/': './',
    'https://seamassagephuket.com/head-spa-phuket/': './head-spa-phuket/',
    'https://seamassagephuket.com/head-spa-phuket': './head-spa-phuket/',
    'https://seamassagephuket.com/facial-massage/': './facial-massage/',
    'https://seamassagephuket.com/facial-massage': './facial-massage/',
    'https://seamassagephuket.com/other-massage/': './other-massage/',
    'https://seamassagephuket.com/other-massage': './other-massage/',
    'https://seamassagephuket.com/gallery/': './gallery/',
    'https://seamassagephuket.com/gallery': './gallery/',
    'https://seamassagephuket.com/reviews/': './reviews/',
    'https://seamassagephuket.com/reviews': './reviews/',
    'https://seamassagephuket.com/contact/': './contact/',
    'https://seamassagephuket.com/contact': './contact/',
    'https://seamassagephuket.com/about/': './about/',
    'https://seamassagephuket.com/about': './about/',
  };

  // Adjust relative page links based on depth
  const depth = pageFile.split('/').length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : './';

  for (const [remote, localPath] of Object.entries(pageMap)) {
    let target = localPath;
    if (depth > 0) {
      if (localPath === './') target = prefix;
      else target = prefix + localPath.replace(/^\.\//, '');
    }
    const escaped = remote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(escaped, 'g'), target);
  }

  // Fix root-relative /wp-content links that weren't caught
  out = out.replace(/(["'])\/wp-content\//g, `$1${prefix}assets/wp-content/`);
  out = out.replace(/(["'])\/wp-includes\//g, `$1${prefix}assets/wp-includes/`);

  // Base tag for relative resolution fallback
  if (!/<base\s/i.test(out)) {
    out = out.replace(/<head([^>]*)>/i, `<head$1><base href="${prefix}">`);
  }

  return out;
}

async function processCssFile(localCssPath, remoteCssUrl) {
  let css = fs.readFileSync(localCssPath, 'utf8');
  const urls = [];
  const re = /url\((['"]?)([^'")]+)\1\)/gi;
  let m;
  while ((m = re.exec(css))) {
    const raw = m[2].trim();
    if (raw.startsWith('data:')) continue;
    try {
      urls.push(new URL(raw, remoteCssUrl).href);
    } catch {}
  }
  for (const u of urls) {
    const local = await downloadAsset(u);
    if (!local) continue;
    const rel = path.relative(path.dirname(localCssPath), local).split(path.sep).join('/');
    css = css.split(u).join(rel);
    // also replace path-only forms
    try {
      const pathname = new URL(u).pathname;
      const absForm = u;
      const rootForm = pathname;
      // carefully replace url(...) variants already handled by abs
    } catch {}
  }
  fs.writeFileSync(localCssPath, css);
}

async function main() {
  const urlMap = new Map();

  for (const page of PAGES) {
    console.log('\nPAGE', page.url);
    const { status, buffer } = await fetchBuffer(page.url);
    if (status >= 400) {
      console.warn('page fail', status, page.url);
      continue;
    }
    let html = buffer.toString('utf8');
    const urls = extractUrls(html, page.url);

    for (const u of urls) {
      const isAsset =
        /\.(css|js|png|jpe?g|webp|gif|svg|woff2?|ttf|eot|ico|mp4|webm)(\?|$)/i.test(u) ||
        u.includes('/wp-content/') ||
        u.includes('/wp-includes/') ||
        u.includes('fonts.googleapis.com') ||
        u.includes('fonts.gstatic.com');
      if (!isAsset) continue;
      if (u.includes('googletagmanager') || u.includes('google-analytics') || u.includes('facebook.net'))
        continue;
      const local = await downloadAsset(u);
      if (local) urlMap.set(u, local);
    }

    // Process downloaded CSS for nested assets
    for (const [remote, local] of [...urlMap.entries()]) {
      if (local && /\.css(\?|$)/i.test(remote.split('?')[0])) {
        await processCssFile(local, remote);
      }
    }

    html = rewriteHtml(html, page.file, page.url, urlMap);
    const outPath = path.join(OUT, page.file);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('wrote', outPath, html.length);
  }

  // Write a simple local server helper note
  fs.writeFileSync(
    path.join(OUT, 'serve.json'),
    JSON.stringify({ pages: PAGES.map((p) => p.file), assets: downloaded.size }, null, 2)
  );
  console.log('\nDone. Assets:', downloaded.size);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
