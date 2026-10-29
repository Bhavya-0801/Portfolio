/**
 * BHAVYA — Motion System
 * Scroll-reveal, scroll progress indicator, header shrink, project card highlights,
 * subtle typography depth, and smooth anchor navigation.
 */

(function () {
  'use strict';

  /* =====================================================================
     1. Page Loader — dismiss cleanly after assets are ready
     ===================================================================== */
  function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    const dismiss = () => {
      loader.classList.add('hidden');
      setTimeout(triggerHeroEntrance, 120);
    };

    if (document.readyState === 'complete') {
      setTimeout(dismiss, 700);
    } else {
      window.addEventListener('load', () => setTimeout(dismiss, 700));
    }
  }

  /* =====================================================================
     2. Hero Entrance — staggered reveal on page load
     ===================================================================== */
  function triggerHeroEntrance() {
    const heroReveals = document.querySelectorAll(
      '.hero-badge-row[data-reveal], .hero-title[data-reveal], .hero-lead[data-reveal], .hero-actions[data-reveal], .hero-stats-strip[data-reveal], .hero-visual-wrapper[data-reveal]'
    );
    heroReveals.forEach(el => el.classList.add('is-revealed'));
  }

  /* =====================================================================
     3. Scroll Progress Indicator (Creative Header Line)
     ===================================================================== */
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-line');
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const percent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        progressBar.style.width = percent + '%';
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* =====================================================================
     4. Scroll-Reveal with IntersectionObserver
     ===================================================================== */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length) return;

    // Filter out hero elements (they have their own entrance animation)
    const scrollEls = Array.from(revealEls).filter(el =>
      !el.closest('.hero-section')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    scrollEls.forEach(el => observer.observe(el));
  }

  /* =====================================================================
     5. Project Cards Viewport Highlight on Scroll
     ===================================================================== */
  function initScrollProjectCards() {
    const projectArticles = document.querySelectorAll('.project-article');
    if (!projectArticles.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport');
          } else {
            entry.target.classList.remove('in-viewport');
          }
        });
      },
      { threshold: 0.25 }
    );

    projectArticles.forEach(card => observer.observe(card));
  }

  /* =====================================================================
     6. Header Compress on Scroll
     ===================================================================== */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* =====================================================================
     7. Subtle Typographic Watermark Depth on Scroll
     ===================================================================== */
  function initScrollWatermarkDepth() {
    const watermark = document.querySelector('.hero-watermark');
    if (!watermark) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          if (sy < 700) {
            // Subtle vertical drift behind Bhavya's portrait
            watermark.style.transform = `translateX(-50%) translateY(${sy * 0.08}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* =====================================================================
     8. Smooth Scroll for Anchor Navigation
     ===================================================================== */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();

        const headerH = document.querySelector('.site-header')?.offsetHeight || 70;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH - 12;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

  /* =====================================================================
     9. Stagger Capability Cards on Viewport Entry
     ===================================================================== */
  function initCapabilityStagger() {
    const cards = document.querySelectorAll('.capability-card, .ethos-block');
    cards.forEach((card, i) => {
      card.setAttribute('data-reveal', 'fade-up');
      card.setAttribute('data-delay', String((i + 1) * 120));
    });
  }

  /* =====================================================================
     Boot All Motion Features
     ===================================================================== */
  function boot() {
    initLoader();
    initScrollProgress();
    initScrollReveal();
    initScrollProjectCards();
    initHeaderScroll();
    initScrollWatermarkDepth();
    initSmoothAnchors();
    initCapabilityStagger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
