const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!prefersReducedMotion && elements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-armed');
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
  );

  elements.forEach((el) => {
    el.classList.add('reveal-armed');
    observer.observe(el);
  });
}
