const nav = document.querySelector('[data-navbar]');
const toggle = document.querySelector('[data-nav-toggle]');
const panel = document.querySelector('[data-nav-panel]');

if (nav) {
  const brand = nav.querySelector('[data-nav-brand]');
  const menuLinks = nav.querySelectorAll('[data-nav-link]');
  const mobileLinks = nav.querySelectorAll('[data-nav-mobile-link]');

  const onScroll = () => {
    const isScrolled = window.scrollY > 24;
    nav.classList.toggle('is-scrolled', isScrolled);

    // The Tailwind text utilities outrank the component-layer color rules,
    // so swap the utility classes when the header changes to its light surface.
    brand?.classList.toggle('text-cream', !isScrolled);
    brand?.classList.toggle('text-ink', isScrolled);
    toggle?.classList.toggle('text-cream', !isScrolled);
    toggle?.classList.toggle('text-ink', isScrolled);
    toggle?.classList.toggle('border-cream/25', !isScrolled);
    toggle?.classList.toggle('border-ink/15', isScrolled);

    menuLinks.forEach((link) => {
      link.classList.toggle('text-cream/80', !isScrolled);
      link.classList.toggle('text-ink-soft', isScrolled);
    });
    mobileLinks.forEach((link) => {
      link.classList.toggle('text-cream/85', !isScrolled);
      link.classList.toggle('text-ink-soft', isScrolled);
    });
    panel?.classList.toggle('bg-terracotta-deep', !isScrolled);
    panel?.classList.toggle('bg-cream', isScrolled);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

if (toggle && panel) {
  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
