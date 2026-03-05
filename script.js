/**
 * LUMINARY — RESPONSIVE LANDING PAGE
 * script.js
 *
 * Modules:
 *  1. Sticky / scrolled navbar
 *  2. Active nav-link highlighting (Intersection Observer)
 *  3. Mobile hamburger menu
 *  4. Smooth scroll (polyfill for older browsers)
 *  5. Scroll-reveal animations (Intersection Observer)
 *  6. Animated counter (About section stats)
 *  7. Contact form validation & submit handler
 *  8. Back-to-top button
 */

/* ============================================================
   Utility — run code only after the DOM is fully parsed
============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. STICKY / SCROLLED NAVBAR
     Adds .scrolled to #navbar when the user scrolls past 60px.
     CSS handles the colour/blur transition.
  ────────────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Use passive listener — improves scroll performance
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  // Run once on page load in case user refreshes mid-page
  handleNavbarScroll();


  /* ──────────────────────────────────────────────────────────
     2. ACTIVE NAV-LINK HIGHLIGHTING
     Watches each section; when a section is ≥ 40% visible,
     the corresponding nav link gets the .active class.
  ────────────────────────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove .active from all links
          navLinks.forEach(link => link.classList.remove('active'));

          // Add .active to matching link
          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is centred
      threshold: 0,
    }
  );

  sections.forEach(section => sectionObserver.observe(section));


  /* ──────────────────────────────────────────────────────────
     3. MOBILE HAMBURGER MENU
     Toggles .is-open on both the button and nav links list.
     Clicking a nav link or pressing Escape closes the menu.
  ────────────────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  const openMenu = () => {
    hamburger.classList.add('is-open');
    navLinksEl.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    // Prevent body scroll while menu is open
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('is-open');
    navLinksEl.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when any nav link is clicked
  navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ──────────────────────────────────────────────────────────
     4. SMOOTH SCROLL (polyfill)
     Modern browsers support scroll-behavior: smooth in CSS.
     This JS version handles older Safari / Edge gracefully
     and also accounts for the fixed navbar height offset.
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return; // Ignore bare # links

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight  = navbar.offsetHeight;
      const targetTop  = target.getBoundingClientRect().top + window.scrollY;
      const scrollTo   = targetTop - navHeight - 16; // 16px breathing room

      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    });
  });


  /* ──────────────────────────────────────────────────────────
     5. SCROLL-REVEAL ANIMATIONS
     All elements with .reveal start hidden (CSS handles this).
     When they enter the viewport, .is-visible is added and
     CSS transitions them into view. Stagger classes add delay.
  ────────────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after revealing — no need to watch anymore
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12, // Trigger when 12% of element is visible
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────────────────────────────
     6. ANIMATED COUNTERS (About stats)
     Finds elements with data-target attribute.
     When they become visible, counts up from 0 to target.
  ────────────────────────────────────────────────────────── */
  const counterEls = document.querySelectorAll('.stat-number[data-target]');

  /**
   * Eases a number from 0 to target over ~1.5s.
   * @param {HTMLElement} el      - The element to update
   * @param {number}      target  - Final number value
   */
  const animateCounter = (el, target) => {
    const duration = 1500;   // ms
    const start    = Date.now();

    const tick = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: decelerates near the end
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target; // Ensure exact final value
    };

    requestAnimationFrame(tick);
  };

  // Only start animation when stat section scrolls into view
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target, 10);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach(el => counterObserver.observe(el));


  /* ──────────────────────────────────────────────────────────
     7. CONTACT FORM — VALIDATION & SUBMIT HANDLER
     Client-side validation with per-field error messages.
     On success, hides form and shows confirmation message.

     NOTE: Replace the timeout simulation with a real fetch()
     call to your backend endpoint for production use.
  ────────────────────────────────────────────────────────── */
  const contactForm    = document.getElementById('contactForm');
  const formSuccess    = document.getElementById('formSuccess');

  if (contactForm) {

    /**
     * Validate a single field. Returns true if valid.
     * @param {HTMLInputElement|HTMLTextAreaElement} field
     */
    const validateField = (field) => {
      const errorEl = field.parentElement.querySelector('.field-error');
      let message   = '';

      if (field.required && !field.value.trim()) {
        message = 'This field is required.';
      } else if (field.type === 'email' && field.value.trim()) {
        // Simple email regex
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(field.value)) {
          message = 'Please enter a valid email address.';
        }
      }

      field.classList.toggle('is-error', !!message);
      if (errorEl) errorEl.textContent = message;

      return !message;
    };

    // Validate on blur (when user leaves a field)
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        // Clear error as user types after a failed submit
        if (field.classList.contains('is-error')) validateField(field);
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all required fields
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) return;

      // --- SIMULATE ASYNC FORM SUBMISSION ---
      // In production, replace this block with:
      //
      // const formData = new FormData(contactForm);
      // const response = await fetch('/your-api-endpoint', {
      //   method: 'POST',
      //   body: formData,
      // });
      //
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled    = true;

      setTimeout(() => {
        // Hide form, show success message
        contactForm.hidden  = true;
        formSuccess.hidden  = false;
      }, 1200);
    });

  }


  /* ──────────────────────────────────────────────────────────
     8. BACK-TO-TOP BUTTON
     Shows after user scrolls past the fold.
     Smooth-scrolls to top when clicked.
  ────────────────────────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > window.innerHeight * 0.7) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      },
      { passive: true }
    );

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}); // end DOMContentLoaded