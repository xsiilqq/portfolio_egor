
// main.js

document.addEventListener('DOMContentLoaded', () => {
  // ===== АКТИВНАЯ ССЫЛКА (header + mobile menu) =====
  const currentPath = window.location.pathname;

  document.querySelectorAll('nav a, .modal-nav a').forEach((link) => {
    if (link.pathname === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== БУРГЕР-МЕНЮ =====
  const openBtn = document.querySelector('.mobile-menu-open');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const menu = document.querySelector('.mobile-menu');

  if (!openBtn || !closeBtn || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    openBtn.classList.add('active'); // бургер становится "активным" (цвет)
    document.body.classList.add('no-scroll'); // блокируем скролл
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    openBtn.classList.remove('active'); // возвращаем цвет бургера назад
    document.body.classList.remove('no-scroll');
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // клик по фону модалки
  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
  });

  // ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // закрывать меню при клике по ссылке внутри мобильного меню
  document.querySelectorAll('.modal-nav a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // ===== АНИМАЦИЯ ПЕРЕХОДОВ (page-ready) =====
  document.body.classList.add('page-ready');

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (link.target === '_blank') return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;

    e.preventDefault();

    // если меню открыто — закроем перед переходом
    closeMenu();

    document.body.classList.remove('page-ready');

    setTimeout(() => {
      window.location.href = link.href;
    }, 150);
  });
});

