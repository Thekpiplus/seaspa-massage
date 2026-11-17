import fs from 'fs';
import path from 'path';

const root = path.resolve('landing');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SEA Spa Phuket — Head Spa & Massage</title>
  <meta name="description" content="SEA Spa Phuket — Shirodhara and Vietnamese head spa, Thai massage, and more on Dibuk Road, Phuket Old Town. Open daily 10:00–23:00." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Syne:wght@500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="assets/logo.png" />
</head>
<body>
  <div class="grain" aria-hidden="true"></div>

  <header class="top">
    <a class="brand-mark" href="#top" aria-label="SEA Spa Phuket">
      <img src="assets/logo.png" alt="SEA Massage & Head Spa" width="56" height="56" />
    </a>
    <nav class="top-nav" aria-label="Page">
      <a href="#treatments">Treatments</a>
      <a href="#pricing">Pricing</a>
      <a href="#reviews">Reviews</a>
      <a href="#visit">Visit</a>
    </nav>
    <a class="top-link" href="https://seaspaphuket.com" target="_blank" rel="noopener">Book on site</a>
  </header>

  <main id="top">
    <section class="hero" aria-label="Welcome">
      <div class="hero-media" aria-hidden="true">
        <img class="hero-img hero-img--a" src="assets/hero.jpg" alt="" />
        <img class="hero-img hero-img--b" src="assets/hero-alt.jpg" alt="" />
        <div class="hero-veil"></div>
      </div>

      <div class="hero-copy">
        <p class="eyebrow reveal">Head spa & Thai massage · Phuket Old Town</p>
        <h1 class="brand reveal reveal-delay-1">SEA Spa Phuket</h1>
        <p class="lede reveal reveal-delay-2">Rest your head, restore your calm — Shirodhara, Vietnamese head spa, and mindful massage on Dibuk Road.</p>
        <div class="cta-row reveal reveal-delay-3">
          <a class="cta" href="https://seaspaphuket.com" target="_blank" rel="noopener">
            <span>Book now</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a class="cta cta--ghost" href="#treatments"><span>Explore treatments</span></a>
        </div>
        <p class="hero-meta reveal reveal-delay-4">10:00–23:00 · Open every day · ★ 4.9 · 2,398+ Google reviews</p>
      </div>

      <div class="scroll-hint reveal reveal-delay-4" aria-hidden="true"><span></span></div>
    </section>

    <section class="about fade-block" id="about">
      <p class="section-label">About SEA</p>
      <h2>A calm place to slow down in Phuket Old Town.</h2>
      <div class="about-grid">
        <p>SEA Massage & Head Spa puts the head spa at the heart of the visit — Shirodhara, where warm herbal oil is poured slowly over the forehead, and Vietnamese head therapy, with pressure-point work on the scalp and neck. We choose natural products with care for your hair and scalp.</p>
        <p>Beyond the head spa, you will find Thai, foot and hot stone massage, facial massage, body scrubs and rituals, and a menu made for kids. Open every day, 10:00–23:00 — book online or message us on WhatsApp.</p>
      </div>
      <a class="text-link" href="https://seaspaphuket.com" target="_blank" rel="noopener">Plan your visit on seaspaphuket.com →</a>
    </section>

    <section class="treatments fade-block" id="treatments">
      <div class="section-head">
        <p class="section-label">Services</p>
        <h2>Every treatment, unhurried.</h2>
      </div>

      <div class="treatment-list">
        <article class="treatment">
          <img src="assets/shirodhara.jpg" alt="Shirodhara head spa" loading="lazy" />
          <div class="treatment-body">
            <p class="tag">Most popular</p>
            <h3>Shirodhara Deep Relaxation Ritual</h3>
            <p>A steady stream of warm oil over the forehead quiets a busy mind and supports deep, clear-headed relaxation.</p>
            <p class="duration">70 · 100 · 130 min</p>
            <div class="treatment-foot">
              <p class="price">From ฿1,590</p>
              <a href="https://seaspaphuket.com" target="_blank" rel="noopener">Book →</a>
            </div>
          </div>
        </article>

        <article class="treatment">
          <img src="assets/treatment.jpg" alt="Vietnamese head therapy" loading="lazy" />
          <div class="treatment-body">
            <p class="tag">Most popular</p>
            <h3>Vietnamese Scalp Detox Head Therapy</h3>
            <p>A cleansing Vietnamese head spa refreshes the scalp, releases tension and leaves your head feeling lighter.</p>
            <p class="duration">70 · 100 · 130 min</p>
            <div class="treatment-foot">
              <p class="price">From ฿1,490</p>
              <a href="https://seaspaphuket.com" target="_blank" rel="noopener">Book →</a>
            </div>
          </div>
        </article>

        <article class="treatment">
          <img src="assets/thai.jpg" alt="Thai yoga relax massage" loading="lazy" />
          <div class="treatment-body">
            <p class="tag">Best seller</p>
            <h3>Thai Yoga Relax Massage</h3>
            <p>Traditional Thai stretching and focused pressure ease stiffness and help you move more freely.</p>
            <p class="duration">60 · 90 · 120 min</p>
            <div class="treatment-foot">
              <p class="price">From ฿790</p>
              <a href="https://seaspaphuket.com" target="_blank" rel="noopener">Book →</a>
            </div>
          </div>
        </article>
      </div>

      <a class="text-link" href="https://seaspaphuket.com" target="_blank" rel="noopener">View full menu →</a>
    </section>

    <section class="pricing fade-block" id="pricing">
      <div class="section-head">
        <p class="section-label">Pricing</p>
        <h2>Simple, clear pricing.</h2>
      </div>
      <ul class="price-list">
        <li>
          <div>
            <strong>Hot Stone Foot Ritual</strong>
            <span>30 · 60 · 90 min</span>
          </div>
          <em>From ฿450</em>
        </li>
        <li>
          <div>
            <strong>Thai Yoga Relax Massage</strong>
            <span>60 · 90 · 120 min</span>
          </div>
          <em>From ฿790</em>
        </li>
        <li>
          <div>
            <strong>Indian Head Ritual with Oil</strong>
            <span>40 · 70 min</span>
          </div>
          <em>From ฿890</em>
        </li>
        <li>
          <div>
            <strong>Vietnamese Scalp Detox</strong>
            <span>70 · 100 · 130 min</span>
          </div>
          <em>From ฿1,490</em>
        </li>
        <li>
          <div>
            <strong>Shirodhara Deep Relaxation</strong>
            <span>70 · 100 · 130 min</span>
          </div>
          <em>From ฿1,590</em>
        </li>
      </ul>
      <a class="cta cta--ghost" href="https://seaspaphuket.com" target="_blank" rel="noopener"><span>See all pricing</span></a>
    </section>

    <section class="moments fade-block" aria-label="Gallery">
      <figure class="moment moment--wide">
        <img src="assets/treatment.jpg" alt="Head spa ritual at SEA Spa Phuket" loading="lazy" />
        <figcaption>Head spa rituals</figcaption>
      </figure>
      <figure class="moment">
        <img src="assets/shop.jpg" alt="SEA Spa Phuket shop" loading="lazy" />
        <figcaption>Our space on Dibuk Road</figcaption>
      </figure>
    </section>

    <section class="reviews fade-block" id="reviews">
      <p class="section-label">Reviews</p>
      <h2>What guests say.</h2>
      <div class="review-score">
        <p class="score">4.9</p>
        <div>
          <p class="stars" aria-label="5 stars">★★★★★</p>
          <p>Google rating · 2,398+ verified reviews</p>
        </div>
      </div>
      <blockquote>
        <p>Step into a world of tranquility where every touch is designed to melt away your stress — soothing aromas, gentle sounds, and expert therapists ready to rejuvenate body and mind.</p>
      </blockquote>
      <a class="text-link" href="https://seaspaphuket.com" target="_blank" rel="noopener">Read reviews and book →</a>
    </section>

    <section class="visit fade-block" id="visit">
      <div class="visit-copy">
        <p class="section-label">Find us</p>
        <h2>Reserve your time.</h2>
        <p>11 Dibuk Rd, Tambon Talat Yai, Mueang 83000, Thailand</p>
        <p>Open every day · 10:00–23:00</p>
        <p><a href="tel:+66962266465">+66 96 226 6465</a></p>
        <div class="visit-actions">
          <a class="cta" href="https://seaspaphuket.com" target="_blank" rel="noopener"><span>Book now</span></a>
          <a class="cta cta--ghost" href="https://wa.me/66962266465" target="_blank" rel="noopener"><span>WhatsApp</span></a>
        </div>
      </div>
      <div class="visit-map">
        <iframe title="SEA Spa Phuket map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=11+Dibuk+Rd,+Talat+Yai,+Mueang+Phuket&output=embed"></iframe>
      </div>
    </section>

    <section class="finale fade-block">
      <p class="finale-brand">SEA Spa Phuket</p>
      <p class="finale-line">Your oasis of calm awaits.</p>
      <a class="cta" href="https://seaspaphuket.com" target="_blank" rel="noopener">
        <span>Go to seaspaphuket.com</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </section>
  </main>

  <footer class="foot">
    <span>© 2026 SEA Massage & Head Spa</span>
    <a href="https://seaspaphuket.com" target="_blank" rel="noopener">seaspaphuket.com</a>
  </footer>

  <script>
    const imgs = document.querySelectorAll('.hero-img');
    let i = 0;
    imgs[0].classList.add('is-active');
    setInterval(() => {
      imgs[i].classList.remove('is-active');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('is-active');
    }, 7000);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); });
      }, { threshold: 0.12 });
      document.querySelectorAll('.fade-block, .moment').forEach((el) => io.observe(el));
    } else {
      document.querySelectorAll('.fade-block, .moment, .reveal').forEach((el) => el.classList.add('in-view'));
    }
  </script>
</body>
</html>
`;

const css = `:root {
  --sea-deep: #072a33;
  --sea: #0d4a57;
  --sea-mid: #1a6b78;
  --foam: #e8f2f1;
  --sand: #d7c4a3;
  --gold: #b8955a;
  --ink: #f4f7f6;
  --muted: rgba(244, 247, 246, 0.72);
  --line: rgba(232, 242, 241, 0.14);
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-ui: "Syne", system-ui, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  color: var(--ink);
  font-family: var(--font-ui);
  background: var(--sea-deep);
  -webkit-font-smoothing: antialiased;
}
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }

.grain {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 40;
  opacity: 0.07;
  mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.top {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.5rem;
}
.brand-mark img {
  width: 48px; height: 48px; object-fit: contain;
  filter: drop-shadow(0 6px 18px rgba(0,0,0,.35));
}
.top-nav {
  display: flex; gap: 1.25rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.top-nav a { color: var(--muted); transition: color .3s ease; }
.top-nav a:hover { color: var(--sand); }
.top-link {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sand);
  border-bottom: 1px solid rgba(215,196,163,.45);
}

.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.hero-media { position: absolute; inset: 0; }
.hero-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 30%;
  opacity: 0; transform: scale(1.08);
  transition: opacity 1.6s var(--ease), transform 8s linear;
}
.hero-img.is-active { opacity: 1; transform: scale(1); }
.hero-veil {
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(7,42,51,.48) 0%, rgba(7,42,51,.3) 42%, rgba(7,42,51,.78) 100%),
    radial-gradient(ellipse 80% 60% at 50% 20%, rgba(26,107,120,.22), transparent 60%);
}
.hero-copy {
  position: relative; z-index: 2;
  width: min(920px, calc(100% - 2.5rem));
  text-align: center;
  padding: 5.5rem 0 4rem;
}
.eyebrow {
  margin: 0 0 1rem;
  font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.26em; text-transform: uppercase;
  color: var(--sand);
}
.brand {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(3rem, 9vw, 6.2rem);
  line-height: .95; letter-spacing: .02em;
  color: #fff;
  text-shadow: 0 12px 40px rgba(0,0,0,.35);
}
.lede {
  margin: 1.25rem auto 0;
  max-width: 34rem;
  font-size: clamp(1rem, 2.1vw, 1.12rem);
  font-weight: 500; line-height: 1.55;
  color: var(--muted);
}
.cta-row {
  margin-top: 2rem;
  display: flex; flex-wrap: wrap; gap: .8rem;
  justify-content: center;
}
.hero-meta {
  margin: 1.4rem 0 0;
  font-size: .75rem;
  letter-spacing: .08em;
  color: rgba(232,242,241,.55);
}
.cta {
  display: inline-flex; align-items: center; gap: .65rem;
  padding: .9rem 1.45rem;
  border: 1px solid rgba(215,196,163,.55);
  background: linear-gradient(135deg, rgba(184,149,90,.95), rgba(168,130,72,.9));
  color: #1a140c;
  font-size: .78rem; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase;
  transition: transform .45s var(--ease), box-shadow .45s var(--ease), background .35s ease;
  box-shadow: 0 14px 40px rgba(0,0,0,.28);
}
.cta:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #d0b078, #b8955a);
}
.cta svg { transition: transform .4s var(--ease); }
.cta:hover svg { transform: translateX(3px); }
.cta--ghost {
  background: transparent;
  color: var(--foam);
  border-color: rgba(232,242,241,.35);
  box-shadow: none;
}
.cta--ghost:hover {
  background: rgba(232,242,241,.08);
  box-shadow: none;
  transform: translateY(-1px);
}

.scroll-hint {
  position: absolute; bottom: 1.4rem; left: 50%;
  z-index: 2; width: 1px; height: 48px;
  transform: translateX(-50%);
  overflow: hidden; background: rgba(255,255,255,.15);
}
.scroll-hint span {
  display: block; width: 100%; height: 40%;
  background: var(--sand);
  animation: drip 2.2s var(--ease) infinite;
}
@keyframes drip {
  0% { transform: translateY(-120%); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(280%); opacity: 0; }
}

.reveal { opacity: 0; transform: translateY(18px); animation: rise 1s var(--ease) forwards; }
.reveal-delay-1 { animation-delay: .15s; }
.reveal-delay-2 { animation-delay: .3s; }
.reveal-delay-3 { animation-delay: .45s; }
.reveal-delay-4 { animation-delay: .7s; }
@keyframes rise { to { opacity: 1; transform: translateY(0); } }

.fade-block {
  opacity: 0; transform: translateY(24px);
  transition: opacity .9s var(--ease), transform .9s var(--ease);
}
.fade-block.in-view { opacity: 1; transform: none; }

.section-label {
  margin: 0 0 .7rem;
  font-size: .68rem; font-weight: 600;
  letter-spacing: .24em; text-transform: uppercase;
  color: var(--sand);
}
.section-head { margin-bottom: 2rem; }
h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2rem, 4.5vw, 3.1rem);
  line-height: 1.12;
  color: #fff;
}
.text-link {
  display: inline-block;
  margin-top: 1.75rem;
  font-size: .82rem;
  letter-spacing: .06em;
  color: var(--sand);
  border-bottom: 1px solid rgba(215,196,163,.4);
}

.about {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: linear-gradient(160deg, #0a3844 0%, #072a33 60%, #0b3f4c 100%);
}
.about-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 2.5rem;
  margin-top: 1.4rem;
  max-width: 920px;
}
.about-grid p {
  margin: 0;
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.65;
  font-weight: 500;
}

.treatments {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: #051f26;
}
.treatment-list { display: grid; gap: 1.75rem; }
.treatment {
  display: grid;
  grid-template-columns: minmax(160px, 280px) 1fr;
  gap: 1.25rem 1.75rem;
  align-items: stretch;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--line);
}
.treatment img {
  width: 100%;
  height: 100%;
  min-height: 180px;
  object-fit: cover;
}
.treatment-body { display: flex; flex-direction: column; justify-content: center; }
.tag {
  margin: 0 0 .45rem;
  font-size: .65rem; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--sand);
}
.treatment h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.5vw, 1.9rem);
  font-weight: 400;
}
.treatment-body > p:not(.tag):not(.duration):not(.price) {
  margin: .55rem 0 0;
  color: var(--muted);
  line-height: 1.55;
  font-size: .95rem;
}
.duration {
  margin: .7rem 0 0 !important;
  font-size: .78rem !important;
  letter-spacing: .08em;
  color: rgba(232,242,241,.5) !important;
}
.treatment-foot {
  margin-top: 1rem;
  display: flex; align-items: baseline; justify-content: space-between; gap: 1rem;
}
.price { margin: 0; font-size: 1.05rem; color: var(--foam); }
.treatment-foot a {
  font-size: .78rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--sand);
}

.pricing {
  padding: clamp(3.5rem, 8vw, 5.5rem) clamp(1.5rem, 5vw, 4rem);
  background: linear-gradient(180deg, #08343f, #072a33);
}
.price-list {
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;
  max-width: 760px;
}
.price-list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: baseline;
  padding: 1.05rem 0;
  border-top: 1px solid var(--line);
}
.price-list li:last-child { border-bottom: 1px solid var(--line); }
.price-list strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 400;
}
.price-list span {
  font-size: .75rem;
  letter-spacing: .06em;
  color: rgba(232,242,241,.5);
}
.price-list em {
  font-style: normal;
  font-size: .95rem;
  color: var(--sand);
  white-space: nowrap;
}

.moments {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: .6rem;
  padding: .6rem;
  background: var(--sea-deep);
}
.moment {
  position: relative; margin: 0; overflow: hidden; min-height: 280px;
  opacity: 0; transform: translateY(28px);
  transition: opacity .9s var(--ease), transform .9s var(--ease);
}
.moment.in-view { opacity: 1; transform: none; }
.moment--wide { min-height: 340px; }
.moment img {
  width: 100%; height: 100%; min-height: inherit;
  object-fit: cover;
  transition: transform 1.2s var(--ease);
}
.moment:hover img { transform: scale(1.04); }
.moment figcaption {
  position: absolute; left: 1rem; bottom: 1rem;
  padding: .4rem .7rem;
  font-size: .72rem; letter-spacing: .14em; text-transform: uppercase;
  color: var(--foam);
  background: rgba(7,42,51,.55);
  backdrop-filter: blur(8px);
}

.reviews {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  background: #051920;
}
.review-score {
  display: flex; align-items: center; gap: 1.25rem;
  margin: 1.5rem 0 1.25rem;
}
.score {
  margin: 0;
  font-family: var(--font-display);
  font-size: 4.5rem;
  line-height: 1;
}
.stars { margin: 0 0 .25rem; color: var(--sand); letter-spacing: .12em; }
.review-score > div > p:last-child {
  margin: 0;
  color: var(--muted);
  font-size: .9rem;
}
blockquote {
  margin: 0;
  max-width: 40rem;
  padding: 0;
  border: 0;
}
blockquote p {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.5vw, 1.6rem);
  font-style: italic;
  line-height: 1.45;
  color: rgba(244,247,246,.88);
}

.visit {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 1.5rem;
  padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem);
  background: linear-gradient(135deg, #0a3844, #06252d);
}
.visit-copy p { margin: .55rem 0 0; color: var(--muted); line-height: 1.5; }
.visit-copy a { color: var(--foam); border-bottom: 1px solid rgba(232,242,241,.25); }
.visit-actions {
  display: flex; flex-wrap: wrap; gap: .75rem;
  margin-top: 1.5rem;
}
.visit-map {
  min-height: 280px;
  border: 1px solid var(--line);
  overflow: hidden;
}
.visit-map iframe {
  width: 100%; height: 100%; min-height: 280px; border: 0;
  filter: grayscale(.25) contrast(1.05);
}

.finale {
  text-align: center;
  padding: clamp(4rem, 10vw, 6.5rem) 1.5rem;
  background:
    radial-gradient(ellipse 70% 80% at 50% 0%, rgba(26,107,120,.32), transparent 55%),
    linear-gradient(180deg, #08343f, #051f26);
}
.finale-brand {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6vw, 4rem);
  letter-spacing: .03em;
}
.finale-line {
  margin: .6rem 0 1.8rem;
  color: var(--muted);
  font-size: 1.05rem;
}
.finale .cta { margin-inline: auto; }

.foot {
  display: flex; flex-wrap: wrap; gap: .75rem 1.5rem;
  justify-content: space-between;
  padding: 1.25rem 1.5rem 1.75rem;
  border-top: 1px solid rgba(232,242,241,.08);
  font-size: .75rem;
  color: rgba(232,242,241,.45);
  background: #04151a;
}
.foot a:hover { color: var(--sand); }

@media (max-width: 860px) {
  .top-nav { display: none; }
  .about-grid, .treatment, .visit { grid-template-columns: 1fr; }
  .moments { grid-template-columns: 1fr; }
  .moment, .moment--wide { min-height: 240px; }
  .treatment img { min-height: 200px; max-height: 240px; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal, .fade-block, .moment {
    opacity: 1 !important; transform: none !important;
    animation: none !important; transition: none !important;
  }
  .hero-img { transition: opacity .4s ease; transform: none !important; }
  .scroll-hint span { animation: none; }
}
`;

function ensureUtf8Write(file, content) {
  fs.writeFileSync(file, content, { encoding: 'utf8' });
}

ensureUtf8Write(path.join(root, 'index.html'), html);
ensureUtf8Write(path.join(root, 'styles.css'), css);
console.log('ok', fs.readFileSync(path.join(root, 'index.html')).slice(0, 5));
