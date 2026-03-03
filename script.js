/**
 * script.js — Interactive behaviours for liamw.fyi portfolio
 *
 * 1. Scroll-progress gradient line (left edge, max 4/5 viewport height)
 * 2. Reveal-on-scroll for sections using IntersectionObserver
 */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     1. Scroll-progress gradient line
     The <div class="scroll-line"> is fixed to the left edge.
     Its height grows proportionally with scroll progress, capped at 80 vh.
     ------------------------------------------------------------------------- */
  const scrollLine = document.getElementById('scrollLine');

  function updateScrollLine() {
    if (!scrollLine) return;

    const scrollTop    = window.scrollY || document.documentElement.scrollTop;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio  = docHeight > 0 ? scrollTop / docHeight : 0;

    // Height travels from 0 to maxPx (80 vh = 4/5 of viewport) as user scrolls 0→100 %
    const maxPx    = window.innerHeight * 0.8;
    const heightPx = scrollRatio * maxPx;

    scrollLine.style.height = heightPx + 'px';
  }

  window.addEventListener('scroll', updateScrollLine, { passive: true });
  window.addEventListener('resize', updateScrollLine, { passive: true });
  updateScrollLine(); // initial call


  /* -------------------------------------------------------------------------
     2. Reveal sections on scroll via IntersectionObserver
     Adds `.is-visible` to each `.section` when it enters the viewport.
     ------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('.section');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.1,    // trigger when 10 % of section is visible
        rootMargin: '0px 0px -60px 0px',
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    // Fallback: reveal all sections immediately for older browsers
    sections.forEach(function (section) {
      section.classList.add('is-visible');
    });
  }

})();
