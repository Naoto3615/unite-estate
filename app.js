document.querySelector('#year').textContent = String(new Date().getFullYear());

const items = document.querySelectorAll('.property article');
items.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-4px)';
    item.style.transition = '220ms ease';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0)';
  });
});
