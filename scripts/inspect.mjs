import fs from 'fs';

const h = fs.readFileSync('site/index.html', 'utf8');
const css = h.match(/href=["']([^"']+\.css[^"']*)["']/g) || [];
console.log(css.slice(0, 25).join('\n'));
console.log('---');
console.log((h.match(/https:\/\/seamassagephuket/g) || []).length, 'remote refs');
const i = h.indexOf('2.jpg');
console.log(h.slice(Math.max(0, i - 100), i + 100));
console.log('---base---');
console.log((h.match(/<base[^>]*>/i) || [])[0]);
console.log('---logo---');
const logo = h.match(/src=["']([^"']*Logo[^"']*)["']/i);
console.log(logo && logo[1]);
