# Sea Massage Phuket (local mirror)

Static copy of [seamassagephuket.com](https://seamassagephuket.com/) with the original content, layout, CSS, and images.

## Pages

- `/` — Home
- `/head-spa-phuket/` — Head Spa + prices
- `/facial-massage/` — Facial Massage
- `/other-massage/` — Other Massage
- `/gallery/` — Photo Gallery
- `/reviews/` — Reviews
- `/contact/` — Contact / Reservation
- `/about/` — About

## Run locally

```bash
npm start
```

Then open http://localhost:5173/

Site files live in `site/`.

## Re-mirror from live site

```bash
npm run mirror
npm run fix
node scripts/inject-fonts.mjs
```
