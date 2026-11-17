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

const map = {
  'https://seamassagephuket.com/wp-content/plugins/elementor/assets/css/conditionals/dialog.min.css?ver=4.3.6':
    'assets/wp-content/plugins/elementor/assets/css/conditionals/dialog.min.css',
  'https://seamassagephuket.com/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.min.css?ver=8.4.5':
    'assets/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.min.css',
  'https://seamassagephuket.com/wp-content/plugins/elementor/assets/css/conditionals/lightbox.min.css?ver=4.3.6':
    'assets/wp-content/plugins/elementor/assets/css/conditionals/lightbox.min.css',
  'https://seamassagephuket.com/wp-content/plugins/elementor/assets/css/conditionals/e-swiper.min.css?ver=4.3.6':
    'assets/wp-content/plugins/elementor/assets/css/conditionals/e-swiper.min.css',
};

for (const file of walk(SITE)) {
  let html = fs.readFileSync(file, 'utf8');
  const depth = path.relative(SITE, path.dirname(file)).split(path.sep).filter(Boolean).length;
  const prefix = depth ? '../'.repeat(depth) : './';
  let changed = false;
  for (const [remote, local] of Object.entries(map)) {
    if (html.includes(remote)) {
      html = html.split(remote).join(prefix + local);
      changed = true;
    }
  }
  // any leftover seamassage asset urls
  html = html.replace(
    /https:\/\/seamassagephuket\.com\/(wp-content\/[^"'\\\s]+)/g,
    (_, p) => prefix + 'assets/' + p
  );
  if (changed || html.includes('seamassagephuket.com/wp-content')) {
    fs.writeFileSync(file, html);
    console.log('updated', path.relative(SITE, file));
  }
}
