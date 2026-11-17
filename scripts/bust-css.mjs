import fs from 'fs';

for (const f of ['web/index.html', 'landing/index.html']) {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/href="styles\.css(\?[^"]*)?"/, 'href="styles.css?v=20261117b"');
  fs.writeFileSync(f, h, 'utf8');
  console.log(f, h.includes('styles.css?v=20261117b'));
}
