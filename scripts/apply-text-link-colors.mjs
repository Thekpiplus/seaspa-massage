import fs from 'fs';

const files = ['web/styles.css', 'landing/styles.css'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let css = fs.readFileSync(file, 'utf8');
  const raw = fs.readFileSync(file);
  if (raw[1] === 0) css = raw.toString('utf16le');

  // Core text tokens
  css = css
    .replace(/--foam: #[0-9a-fA-F]{3,8};/, '--foam: #4E2811;')
    .replace(/--ink: #[0-9a-fA-F]{3,8};/, '--ink: #4E2811;')
    .replace(/--muted: [^;]+;/, '--muted: rgba(78, 40, 17, 0.78);')
    .replace(/--sand: #[0-9a-fA-F]{3,8};/, '--sand: #4E2811;')
    .replace(/--line: [^;]+;/, '--line: rgba(78, 40, 17, 0.14);');

  // Add dedicated link variables if missing
  if (!css.includes('--link:')) {
    css = css.replace(
      '--ease:',
      '--link: #3C3939;\n  --link-hover: #4E2811;\n  --ease:'
    );
  } else {
    css = css
      .replace(/--link: [^;]+;/, '--link: #3C3939;')
      .replace(/--link-hover: [^;]+;/, '--link-hover: #4E2811;');
  }

  // Global link styles
  if (!css.includes('a {\n  color: var(--link);')) {
    css = css.replace(
      /a \{\n  color: inherit;\n  text-decoration: none;\n\}/,
      `a {
  color: var(--link);
  text-decoration: none;
  transition: color 0.25s ease;
}
a:hover {
  color: var(--link-hover);
}`
    );
  }

  // Content text-link / treatment foot links use body-adjacent accents
  css = css
    .replace(
      /\.text-link \{\n  display: inline-block;\n  margin-top: 1\.75rem;\n  font-size: \.82rem;\n  letter-spacing: \.06em;\n  color: var\(--sand\);\n  border-bottom: 1px solid rgba\(215,196,163,\.4\);\n\}/,
      `.text-link {
  display: inline-block;
  margin-top: 1.75rem;
  font-size: .82rem;
  letter-spacing: .06em;
  color: var(--link);
  border-bottom: 1px solid rgba(60, 57, 57, 0.35);
}
.text-link:hover {
  color: var(--link-hover);
  border-bottom-color: rgba(78, 40, 17, 0.55);
}`
    )
    .replace(
      /\.treatment-foot a \{\n  font-size: \.78rem;\n  letter-spacing: \.12em;\n  text-transform: uppercase;\n  color: var\(--sand\);\n\}/,
      `.treatment-foot a {
  font-size: .78rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--link);
}
.treatment-foot a:hover {
  color: var(--link-hover);
}`
    )
    .replace(
      /\.visit-copy a \{ color: var\(--sea\); border-bottom: 1px solid rgba\(13,74,87,\.25\); \}/,
      `.visit-copy a { color: var(--link); border-bottom: 1px solid rgba(60, 57, 57, 0.35); }
.visit-copy a:hover { color: var(--link-hover); border-bottom-color: rgba(78, 40, 17, 0.55); }`
    )
    .replace(
      /\.foot a:hover \{ color: var\(--sand\); \}/,
      `.foot a { color: var(--link); }
.foot a:hover { color: var(--link-hover); }`
    )
    .replace(
      /\.price-list em \{\n  font-style: normal;\n  font-size: \.95rem;\n  color: var\(--sand\);\n  white-space: nowrap;\n\}/,
      `.price-list em {
  font-style: normal;
  font-size: .95rem;
  color: var(--ink);
  white-space: nowrap;
}`
    )
    .replace(
      /\.tag \{\n  margin: 0 0 \.45rem;\n  font-size: \.65rem; font-weight: 600;\n  letter-spacing: \.18em; text-transform: uppercase;\n  color: var\(--sand\);\n\}/,
      `.tag {
  margin: 0 0 .45rem;
  font-size: .65rem; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--ink);
}`
    )
    .replace(
      /\.section-label \{\n  margin: 0 0 \.7rem;\n  font-size: \.68rem; font-weight: 600;\n  letter-spacing: \.24em; text-transform: uppercase;\n  color: var\(--sand\);\n\}/,
      `.section-label {
  margin: 0 0 .7rem;
  font-size: .68rem; font-weight: 600;
  letter-spacing: .24em; text-transform: uppercase;
  color: var(--ink);
}`
    )
    .replace(
      /\.stars \{ margin: 0 0 \.25rem; color: var\(--sand\); letter-spacing: \.12em; \}/,
      `.stars { margin: 0 0 .25rem; color: var(--ink); letter-spacing: .12em; }`
    );

  // Keep hero/nav light on photo; do not inherit dark body link color there
  if (!css.includes('.hero a:not(.cta)')) {
    css += `
.hero a:not(.cta),
.top a:not(.cta) {
  color: rgba(244, 247, 246, 0.86);
}
.hero a:not(.cta):hover,
.top a:not(.cta):hover {
  color: #fff;
}
.top-link {
  color: rgba(244, 247, 246, 0.9) !important;
  border-bottom-color: rgba(244, 247, 246, 0.45);
}
.top-link:hover {
  color: #fff !important;
}
.cta,
.cta:hover {
  color: #1a140c;
}
.hero .cta--ghost,
.hero .cta--ghost:hover {
  color: #f4f7f6;
}
`;
  }

  // Bust cache version in html
  fs.writeFileSync(file, css, 'utf8');
  console.log('updated', file);
}

for (const f of ['web/index.html', 'landing/index.html']) {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/href="styles\.css(\?[^"]*)?"/, 'href="styles.css?v=20261117c"');
  fs.writeFileSync(f, h, 'utf8');
}
console.log('html cache busted');
