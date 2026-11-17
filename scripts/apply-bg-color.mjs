import fs from 'fs';

const files = ['web/styles.css', 'landing/styles.css'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let css = fs.readFileSync(file, 'utf8');

  // If UTF-16, convert
  const raw = fs.readFileSync(file);
  if (raw[1] === 0) css = raw.toString('utf16le');

  css = css
    .replace(
      /:root \{[\s\S]*?--font-ui: "Syne", system-ui, sans-serif;\n\}/,
      `:root {
  --bg: #F5F1EE;
  --bg-content: #F5F1EE;
  --sea-deep: #F5F1EE;
  --sea: #0d4a57;
  --sea-mid: #1a6b78;
  --foam: #1c2a2e;
  --sand: #8a6b3d;
  --gold: #b8955a;
  --ink: #1c2a2e;
  --muted: rgba(28, 42, 46, 0.72);
  --line: rgba(28, 42, 46, 0.12);
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-ui: "Syne", system-ui, sans-serif;
}`
    )
    .replace(/background: var\(--sea-deep\);/, 'background: var(--bg);')
    .replace(
      /\.about \{\n  padding: clamp\(3\.5rem, 8vw, 6rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: linear-gradient\(160deg, #0a3844 0%, #072a33 60%, #0b3f4c 100%\);\n\}/,
      `.about {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-content);
}`
    )
    .replace(
      /\.treatments \{\n  padding: clamp\(3\.5rem, 8vw, 6rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: #051f26;\n\}/,
      `.treatments {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-content);
}`
    )
    .replace(
      /\.pricing \{\n  padding: clamp\(3\.5rem, 8vw, 5\.5rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: linear-gradient\(180deg, #08343f, #072a33\);\n\}/,
      `.pricing {
  padding: clamp(3.5rem, 8vw, 5.5rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-content);
}`
    )
    .replace(
      /  background: var\(--sea-deep\);\n\}\n\.moment \{/,
      `  background: var(--bg-content);
}
.moment {`
    )
    .replace(
      /\.reviews \{\n  padding: clamp\(3\.5rem, 8vw, 6rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: #051920;\n\}/,
      `.reviews {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-content);
}`
    )
    .replace(
      /\.visit \{\n  display: grid;\n  grid-template-columns: 1fr 1\.1fr;\n  gap: 1\.5rem;\n  padding: clamp\(3rem, 7vw, 5rem\) clamp\(1\.5rem, 5vw, 4rem\);\n  background: linear-gradient\(135deg, #0a3844, #06252d\);\n\}/,
      `.visit {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 1.5rem;
  padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-content);
}`
    )
    .replace(
      /\.finale \{\n  text-align: center;\n  padding: clamp\(4rem, 10vw, 6\.5rem\) 1\.5rem;\n  background:\n    radial-gradient\(ellipse 70% 80% at 50% 0%, rgba\(26,107,120,\.32\), transparent 55%\),\n    linear-gradient\(180deg, #08343f, #051f26\);\n\}/,
      `.finale {
  text-align: center;
  padding: clamp(4rem, 10vw, 6.5rem) 1.5rem;
  background: var(--bg-content);
}`
    )
    .replace(
      /  background: #04151a;\n\}\n\.foot a:hover/,
      `  background: var(--bg-content);
  border-top-color: var(--line);
}
.foot a:hover`
    )
    .replace(
      /h2 \{\n  margin: 0;\n  font-family: var\(--font-display\);\n  font-weight: 400;\n  font-size: clamp\(2rem, 4\.5vw, 3\.1rem\);\n  line-height: 1\.12;\n  color: #fff;\n\}/,
      `h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2rem, 4.5vw, 3.1rem);
  line-height: 1.12;
  color: var(--ink);
}`
    )
    .replace(
      /\.price \{ margin: 0; font-size: 1\.05rem; color: var\(--foam\); \}/,
      `.price { margin: 0; font-size: 1.05rem; color: var(--ink); }`
    )
    .replace(
      /\.visit-copy a \{ color: var\(--foam\); border-bottom: 1px solid rgba\(232,242,241,\.25\); \}/,
      `.visit-copy a { color: var(--sea); border-bottom: 1px solid rgba(13,74,87,.25); }`
    )
    .replace(
      /blockquote p \{\n  margin: 0;\n  font-family: var\(--font-display\);\n  font-size: clamp\(1\.25rem, 2\.5vw, 1\.6rem\);\n  font-style: italic;\n  line-height: 1\.45;\n  color: rgba\(244,247,246,\.88\);\n\}/,
      `blockquote p {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.5vw, 1.6rem);
  font-style: italic;
  line-height: 1.45;
  color: rgba(28, 42, 46, 0.88);
}`
    )
    .replace(
      /\.cta--ghost \{\n  background: transparent;\n  color: var\(--foam\);\n  border-color: rgba\(232,242,241,\.35\);\n  box-shadow: none;\n\}\n\.cta--ghost:hover \{\n  background: rgba\(232,242,241,\.08\);\n  box-shadow: none;\n  transform: translateY\(-1px\);\n\}/,
      `.cta--ghost {
  background: transparent;
  color: var(--ink);
  border-color: rgba(28, 42, 46, 0.22);
  box-shadow: none;
}
.cta--ghost:hover {
  background: rgba(28, 42, 46, 0.05);
  box-shadow: none;
  transform: translateY(-1px);
}
.hero .cta--ghost {
  color: #f4f7f6;
  border-color: rgba(232, 242, 241, 0.45);
}
.hero .cta--ghost:hover {
  background: rgba(232, 242, 241, 0.1);
}`
    )
    .replace(
      /\.grain \{[\s\S]*?\}\n\n\.top \{/,
      `.grain { display: none; }

.top {`
    );

  // Keep hero text light on photo
  if (!css.includes('.hero .brand')) {
    css += `
.hero .brand { color: #fff; }
.hero .lede,
.hero .hero-meta { color: rgba(244, 247, 246, 0.78); }
.hero .eyebrow { color: #d7c4a3; }
.hero .top-nav a,
.top-nav a { color: rgba(244, 247, 246, 0.78); }
.top-nav a:hover { color: #d7c4a3; }
.top-link { color: #d7c4a3; }
.finale-brand { color: var(--ink); }
.price-list strong { color: var(--ink); }
.treatment h3 { color: var(--ink); }
.foot { color: rgba(28, 42, 46, 0.5); }
`;
  }

  fs.writeFileSync(file, css, 'utf8');
  console.log('updated', file);
}
