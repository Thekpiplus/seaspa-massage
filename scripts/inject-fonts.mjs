import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'site');

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

const FONT_LINKS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css?family=Urbanist:400|Montserrat:700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700&display=swap" rel="stylesheet">
`;

for (const file of walk(SITE)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('fonts.googleapis.com/css?family=Urbanist:400|Montserrat:700&display=swap')) {
    html = html.replace('</head>', `${FONT_LINKS}</head>`);
    fs.writeFileSync(file, html);
    console.log('fonts injected', path.relative(SITE, file));
  } else {
    console.log('ok', path.relative(SITE, file));
  }
}
