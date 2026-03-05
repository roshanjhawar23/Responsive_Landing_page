# ✦ Luminary — Responsive Landing Page

A production-ready, fully responsive landing page built with vanilla HTML, CSS, and JavaScript. Designed with a refined dark-luxury aesthetic — deep blacks, warm gold accents, and silky animations — as a portfolio-grade demonstration of modern front-end fundamentals.

---

## 📸 Screenshots

> _Add screenshots after opening the project in a browser._
>
> **Suggested shots:**
> - Desktop hero section
> - Mobile nav (open)
> - Services grid on tablet
> - Contact form with validation

---

## ✨ Features

| Category | Details |
|---|---|
| **Navigation** | Sticky navbar · Transparent-to-frosted-glass scroll transition · Active link highlighting · Animated mobile hamburger menu |
| **Animations** | Scroll-reveal fade-up on every section · Staggered entrance delays · Counter animation on stats · CSS keyframe orb float |
| **Sections** | Hero · About (with stats) · Services (6 cards) · Contact (with form validation) · Footer |
| **Forms** | Client-side validation · Per-field error messages · Success confirmation state |
| **UX** | Smooth scroll with navbar-offset · Back-to-top button · Keyboard accessible · `prefers-reduced-motion` friendly via CSS transitions |
| **Responsive** | Mobile-first · Breakpoints at 480px, 768px, 1024px, 1400px |

---

## 🛠 Technologies Used

- **HTML5** — Semantic markup (`<section>`, `<article>`, `<nav>`, `<footer>`)
- **CSS3** — Custom Properties, Flexbox, CSS Grid, Keyframe Animations, `clamp()` fluid typography
- **Vanilla JavaScript (ES2020+)** — `IntersectionObserver`, `requestAnimationFrame`, event delegation
- **Google Fonts** — Cormorant Garamond (display) + DM Sans (body)

No frameworks. No build tools. No dependencies. Just clean, portable code.

---

## 🗂 Project Structure

```
responsive-landing-page/
│
├── index.html          # Page markup — all sections & components
├── style.css           # All styles — variables, layout, animations, responsive
├── script.js           # All JS — scroll effects, menu, counter, form validation
├── assets/
│   └── images/         # Place your project images here
└── README.md
```

---

## 🚀 How to Run Locally

**Option A — Open directly in browser (quickest)**

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/responsive-landing-page.git

# Navigate into the project folder
cd responsive-landing-page

# Open in your default browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

**Option B — Serve with VS Code Live Server (recommended)**

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Open the project folder in VS Code
3. Right-click `index.html` → **Open with Live Server**
4. Browser opens at `http://127.0.0.1:5500`

**Option C — Python HTTP server**

```bash
cd responsive-landing-page

# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

---

## 🧩 Key Code Concepts Explained

### Sticky + Scroll-Aware Navbar
```js
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });
```
The `.scrolled` class triggers a CSS transition from `transparent` to `backdrop-filter: blur(20px)`.

### Scroll-Reveal with IntersectionObserver
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // fire once only
    }
  });
}, { threshold: 0.12 });
```
Elements with `.reveal` start at `opacity: 0; transform: translateY(28px)` in CSS. Adding `.is-visible` transitions them in.

### Animated Counters
```js
const animateCounter = (el, target) => {
  // Ease-out cubic interpolation over 1500ms
  const tick = () => {
    const progress = Math.min((Date.now() - start) / 1500, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
```

---

## 🔌 Connecting the Contact Form to a Backend

The form currently simulates submission with a `setTimeout`. To make it functional, replace the simulation block in `script.js` with a real fetch call:

```js
// Formspree (free tier available)
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(contactForm),
});

if (response.ok) {
  contactForm.hidden = true;
  formSuccess.hidden = false;
}
```

---

## 💡 Suggestions to Improve the Project

### Design & UX
- [ ] Add a **Portfolio / Work** section with project cards and image hover effects
- [ ] Implement a **dark / light mode toggle** using CSS custom properties and `localStorage`
- [ ] Add a **custom cursor** for an elevated premium feel
- [ ] Use `prefers-reduced-motion` media query to respect user accessibility settings

### Performance
- [ ] Convert images to **WebP** format and add `loading="lazy"` attributes
- [ ] Add `rel="preload"` hints for critical fonts
- [ ] Minify CSS and JS for production with a build tool (e.g. Vite, Parcel)
- [ ] Implement a **Service Worker** for offline support / PWA

### Functionality
- [ ] Hook the contact form to **Formspree**, **Netlify Forms**, or your own API
- [ ] Add a **blog section** with cards pulled from an API (e.g. Dev.to, Contentful)
- [ ] Implement **page transitions** between sections using the View Transitions API
- [ ] Add **Google Analytics** or Plausible for visitor tracking

### Code Quality
- [ ] Add a `sitemap.xml` and `robots.txt` for SEO
- [ ] Improve `<meta>` tags (Open Graph, Twitter Card) for rich social previews
- [ ] Write unit tests for the JS validation logic with Jest
- [ ] Migrate to a component-based framework (React / Vue / Svelte) as the project grows

---

## 📄 License

MIT — free to use, modify, and distribute for personal and commercial projects.

---

<div align="center">
  <strong>✦ Built with care by Luminary Studio</strong><br />
  <a href="#home">Back to top ↑</a>
</div>