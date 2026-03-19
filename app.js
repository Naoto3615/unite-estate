const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', navLinks.classList.contains('open') ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('#year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const countNodes = document.querySelectorAll('[data-count]');
if (countNodes.length) {
  const startCount = (node) => {
    const target = Number(node.dataset.count);
    const suffix = node.dataset.suffix ?? '';
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(target * eased);
      node.textContent = `${current}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.dataset.started !== 'yes') {
          entry.target.dataset.started = 'yes';
          startCount(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  countNodes.forEach((node) => countObserver.observe(node));
}

const form = document.querySelector('.contact-form');
const toast = document.querySelector('#toast');
if (form && toast) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    toast.classList.add('show');
    form.reset();
    setTimeout(() => toast.classList.remove('show'), 2800);
  });
}
