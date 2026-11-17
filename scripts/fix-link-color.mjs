import fs from 'fs';

for (const file of ['web/styles.css', 'landing/styles.css']) {
  let css = fs.readFileSync(file, 'utf8');
  css = css.replace(
    /a \{\s*color: inherit;\s*text-decoration: none;\s*\}/,
    `a {
  color: var(--link);
  text-decoration: none;
  transition: color 0.25s ease;
}
a:hover {
  color: var(--link-hover);
}`
  );
  fs.writeFileSync(file, css, 'utf8');
  console.log(file, css.includes('color: var(--link)'));
}

for (const f of ['web/index.html', 'landing/index.html']) {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/href="styles\.css(\?[^"]*)?"/, 'href="styles.css?v=20261117d"');
  fs.writeFileSync(f, h, 'utf8');
}
