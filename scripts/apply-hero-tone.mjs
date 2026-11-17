import fs from 'fs';

const files = ['web/styles.css', 'landing/styles.css'];

for (const file of files) {
  let css = fs.readFileSync(file, 'utf8');
  const raw = fs.readFileSync(file);
  if (raw[1] === 0) css = raw.toString('utf16le');

  css = css.replace(
    /\.hero-img \{\n  position: absolute; inset: 0;\n  width: 100%; height: 100%;\n  object-fit: cover; object-position: center 30%;\n  opacity: 0; transform: scale\(1\.08\);\n  transition: opacity 1\.6s var\(--ease\), transform 8s linear;\n\}/,
    `.hero-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 30%;
  opacity: 0; transform: scale(1.08);
  transition: opacity 1.6s var(--ease), transform 8s linear;
  filter: sepia(0.18) saturate(0.92) brightness(0.96) contrast(1.04);
}`
  );

  css = css.replace(
    /\.hero-veil \{\n  position: absolute; inset: 0;\n  background:\n    linear-gradient\(180deg, rgba\(7,42,51,\.48\) 0%, rgba\(7,42,51,\.3\) 42%, rgba\(7,42,51,\.78\) 100%\),\n    radial-gradient\(ellipse 80% 60% at 50% 20%, rgba\(26,107,120,\.22\), transparent 60%\);\n\}/,
    `.hero-veil {
  position: absolute; inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(78, 40, 17, 0.38) 0%,
      rgba(78, 40, 17, 0.16) 34%,
      rgba(245, 241, 238, 0.12) 58%,
      rgba(245, 241, 238, 0.82) 86%,
      #F5F1EE 100%
    ),
    radial-gradient(
      ellipse 90% 70% at 50% 22%,
      rgba(232, 213, 192, 0.2),
      transparent 60%
    );
}`
  );

  // Soften eyebrow on hero to warm sand on the new overlay
  css = css.replace(
    /\.eyebrow \{\n  margin: 0 0 1rem;\n  font-size: 0\.7rem; font-weight: 600;\n  letter-spacing: 0\.26em; text-transform: uppercase;\n  color: var\(--sand\);\n\}/,
    `.eyebrow {
  margin: 0 0 1rem;
  font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.26em; text-transform: uppercase;
  color: #E8D5C0;
}`
  );

  // Hero meta/lede stay light for readability
  if (!css.includes('.hero .lede {')) {
    css += `
.hero .lede {
  color: rgba(245, 241, 238, 0.9);
}
.hero .hero-meta {
  color: rgba(232, 213, 192, 0.85);
}
.hero .brand {
  color: #F5F1EE;
  text-shadow: 0 10px 36px rgba(61, 32, 14, 0.45);
}
`;
  }

  fs.writeFileSync(file, css, 'utf8');
  console.log('updated', file);
}

for (const f of ['web/index.html', 'landing/index.html']) {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/href="styles\.css(\?[^"]*)?"/, 'href="styles.css?v=20261117f"');
  fs.writeFileSync(f, h, 'utf8');
}
console.log('done');
