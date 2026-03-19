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
if (year) year.textContent = String(new Date().getFullYear());

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const countNodes = document.querySelectorAll('[data-count]');
if (countNodes.length) {
  const animateCount = (node) => {
    const target = Number(node.dataset.count);
    const suffix = node.dataset.suffix ?? '';
    const start = performance.now();
    const duration = 1200;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      node.textContent = `${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.dataset.started !== 'yes') {
          entry.target.dataset.started = 'yes';
          animateCount(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  countNodes.forEach((node) => counterObserver.observe(node));
}

const forms = document.querySelectorAll('.contact-form');
const toast = document.querySelector('#toast');
if (forms.length && toast) {
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      toast.classList.add('show');
      form.reset();
      setTimeout(() => toast.classList.remove('show'), 2600);
    });
  });
}

const pricingModes = document.querySelectorAll('.mode-btn[data-mode]');
const priceNodes = document.querySelectorAll('[data-price]');
if (pricingModes.length && priceNodes.length) {
  const updatePrices = (mode) => {
    priceNodes.forEach((node) => {
      const value = Number(mode === 'yearly' ? node.dataset.yearly : node.dataset.monthly);
      node.textContent = Number.isFinite(value) ? value.toLocaleString('ja-JP') : '-';
    });

    pricingModes.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  };

  pricingModes.forEach((btn) => {
    btn.addEventListener('click', () => updatePrices(btn.dataset.mode || 'monthly'));
  });

  updatePrices('monthly');
}

const calcForm = document.querySelector('.calc-form');
const calcResult = document.querySelector('.calc-result');
if (calcForm && calcResult) {
  calcForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(calcForm);

    const unitPrice = Number(formData.get('unit_price'));
    const quantity = Number(formData.get('quantity'));
    const months = Number(formData.get('months'));

    if (!Number.isFinite(unitPrice) || !Number.isFinite(quantity) || !Number.isFinite(months)) {
      calcResult.textContent = '見積もり結果: 入力値を確認してください';
      calcResult.classList.add('show');
      return;
    }

    const subtotal = unitPrice * quantity * months;
    const supportFee = Math.round(subtotal * 0.08);
    const total = subtotal + supportFee;

    calcResult.textContent = `見積もり結果: ¥${total.toLocaleString('ja-JP')} (内サポート費 ¥${supportFee.toLocaleString('ja-JP')})`;
    calcResult.classList.add('show');
  });
}

const faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    if (!item) return;

    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    item.classList.toggle('open', !expanded);
  });
});
