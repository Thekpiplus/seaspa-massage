import fs from 'fs';

function ensureUtf8Script(path) {
  const b = fs.readFileSync(path);
  if (b.length > 1 && b[1] === 0) {
    fs.writeFileSync(path, b.toString('utf16le'), 'utf8');
  }
}

ensureUtf8Script('scripts/patch-landing-spa-links.mjs');

// Run patch inline (same logic)
{
  const file = 'web/index.html';
  let html = fs.readFileSync(file, 'utf8');

  if (!html.includes('href="/spa/"')) {
    html = html.replace(
      '<a href="#visit">Visit</a>\n    </nav>',
      '<a href="#visit">Visit</a>\n      <a href="/spa/">Full site</a>\n    </nav>'
    );

    html = html.replace(
      '<a class="cta cta--ghost" href="#treatments"><span>Explore treatments</span></a>',
      `<a class="cta cta--ghost" href="#treatments"><span>Explore treatments</span></a>
          <a class="cta cta--ghost" href="/spa/"><span>Open full website</span></a>`
    );

    html = html.replace(
      'Plan your visit on seaspaphuket.com →</a>',
      `Plan your visit on seaspaphuket.com →</a>
      <a class="text-link" href="/spa/">Browse the full local site →</a>`
    );

    html = html.replace(
      `<footer class="foot">
    <span>© 2026 SEA Massage & Head Spa</span>
    <a href="https://seaspaphuket.com" target="_blank" rel="noopener">seaspaphuket.com</a>
  </footer>`,
      `<footer class="foot">
    <span>© 2026 SEA Massage & Head Spa</span>
    <div class="foot-links">
      <a href="/spa/">Full website</a>
      <a href="https://seaspaphuket.com" target="_blank" rel="noopener">seaspaphuket.com</a>
    </div>
  </footer>`
    );

    fs.writeFileSync(file, html, 'utf8');
  }

  let css = fs.readFileSync('web/styles.css', 'utf8');
  if (!css.includes('.foot-links')) {
    css += `
.foot-links { display: flex; gap: 1rem; flex-wrap: wrap; }
`;
    fs.writeFileSync('web/styles.css', css, 'utf8');
  }

  console.log('landing /spa/ links', (html.match(/\/spa\//g) || []).length);
}

{
  const file = 'web/spa/index.html';
  let spa = fs.readFileSync(file, 'utf8');
  if (!spa.includes('back-to-landing')) {
    const bar =
      '<a id="back-to-landing" href="/" style="position:fixed;left:12px;bottom:12px;z-index:9999;padding:10px 14px;background:#0d4a57;color:#fff;font:600 12px/1 Syne,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.3)">← Landing</a>';
    spa = spa.replace(/<body([^>]*)>/i, `<body$1>${bar}`);
    fs.writeFileSync(file, spa, 'utf8');
    console.log('spa back link added');
  } else {
    console.log('spa back link exists');
  }
}

// Update hostinger path hint file if present
const siteJson = {
  domain: 'merciful-darkseagreen-stingray-28.hostingersite.com',
  kind: 'website',
  orderId: 1009834597,
  path: 'web',
  source: 'upload',
  type: 'static',
  username: 'u514529065',
};
fs.mkdirSync('.hostinger', { recursive: true });
fs.writeFileSync('.hostinger/site.json', JSON.stringify(siteJson, null, 2));
console.log('updated .hostinger/site.json path=web');
