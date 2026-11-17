import fs from 'fs';

const file = 'web/index.html';
let html = fs.readFileSync(file, 'utf8');

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

if (!html.includes('.foot-links')) {
  // CSS addition note handled separately
}

fs.writeFileSync(file, html, 'utf8');
console.log('spa links', (html.match(/\/spa\//g) || []).length);

let css = fs.readFileSync('web/styles.css', 'utf8');
if (!css.includes('.foot-links')) {
  css += `
.foot-links { display: flex; gap: 1rem; flex-wrap: wrap; }
.cta-row .cta--ghost { backdrop-filter: blur(4px); }
`;
  fs.writeFileSync('web/styles.css', css, 'utf8');
  console.log('css updated');
}
