import fs from 'fs';

const files = ['web/styles.css', 'landing/styles.css'];

for (const file of files) {
  let css = fs.readFileSync(file, 'utf8');
  const raw = fs.readFileSync(file);
  if (raw[1] === 0) css = raw.toString('utf16le');

  // Section palette around #F5F1EE
  if (!css.includes('--bg-soft:')) {
    css = css.replace(
      '--bg-content: #F5F1EE;',
      `--bg-content: #F5F1EE;
  --bg-soft: #FAF7F4;
  --bg-warm: #EFE8E2;
  --bg-mist: #E9E4DF;
  --bg-deep: #E4DDD6;`
    );
  } else {
    css = css
      .replace(/--bg-soft: [^;]+;/, '--bg-soft: #FAF7F4;')
      .replace(/--bg-warm: [^;]+;/, '--bg-warm: #EFE8E2;')
      .replace(/--bg-mist: [^;]+;/, '--bg-mist: #E9E4DF;')
      .replace(/--bg-deep: [^;]+;/, '--bg-deep: #E4DDD6;');
  }

  css = css
    .replace(
      /\.about \{\n  padding: clamp\(3\.5rem, 8vw, 6rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: var\(--bg-content\);\n\}/,
      `.about {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-soft);
}`
    )
    .replace(
      /\.treatments \{\n  padding: clamp\(3\.5rem, 8vw, 6rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: var\(--bg-content\);\n\}/,
      `.treatments {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-warm);
}`
    )
    .replace(
      /\.pricing \{\n  padding: clamp\(3\.5rem, 8vw, 5\.5rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: var\(--bg-content\);\n\}/,
      `.pricing {
  padding: clamp(3.5rem, 8vw, 5.5rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-content);
}`
    )
    .replace(
      /\.moments \{\n  display: grid;\n  grid-template-columns: 1\.35fr 1fr;\n  gap: \.6rem;\n  padding: \.6rem;\n  background: var\(--bg-content\);\n\}/,
      `.moments {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: .6rem;
  padding: .85rem;
  background: var(--bg-mist);
}`
    )
    .replace(
      /\.reviews \{\n  padding: clamp\(3\.5rem, 8vw, 6rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: var\(--bg-content\);\n\}/,
      `.reviews {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-soft);
}`
    )
    .replace(
      /\.visit \{\n  display: grid;\n  grid-template-columns: 1fr 1\.1fr;\n  gap: 1\.5rem;\n  padding: clamp\(3rem, 7vw, 5rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: var\(--bg-content\);\n\}/,
      `.visit {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 1.5rem;
  padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-warm);
}`
    )
    .replace(
      /\.finale \{\n  text-align: center;\n  padding: clamp\(4rem, 10vw, 6\.5rem\) 1\.5rem;\n  background: var\(--bg-content\);\n\}/,
      `.finale {
  text-align: center;
  padding: clamp(4rem, 10vw, 6.5rem) 1.5rem;
  background:
    linear-gradient(180deg, var(--bg-soft) 0%, var(--bg-deep) 100%);
}`
    )
    .replace(
      /  background: var\(--bg-content\);\n  border-top-color: var\(--line\);\n\}\n\.foot a/,
      `  background: var(--bg-deep);
  border-top-color: var(--line);
}
.foot a`
    );

  fs.writeFileSync(file, css, 'utf8');
  console.log('updated', file);
}

for (const f of ['web/index.html', 'landing/index.html']) {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/href="styles\.css(\?[^"]*)?"/, 'href="styles.css?v=20261117e"');
  fs.writeFileSync(f, h, 'utf8');
}
console.log('cache busted');
