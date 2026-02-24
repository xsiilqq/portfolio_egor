
document.querySelectorAll('nav a').forEach((link) => {
  if (link.pathname === window.location.pathname) {
    link.classList.add('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {

  // ===== АКТИВНАЯ ССЫЛКА =====
  const currentPath = window.location.pathname;

  document.querySelectorAll('nav a, .modal-nav a').forEach(link => {
    if (link.pathname === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== БУРГЕР-МЕНЮ =====
  const openBtn = document.querySelector('.mobile-menu-open');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const menu = document.querySelector('.mobile-menu');

  if (!openBtn || !closeBtn || !menu) return;

  // открыть
  openBtn.addEventListener('click', () => {
    menu.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // блокируем скролл
  });

  // закрыть по крестику
  closeBtn.addEventListener('click', () => {
    closeMenu();
  });

  // закрыть по клику вне контента
  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      closeMenu();
    }
  });

  // закрыть по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  function closeMenu() {
    menu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

});
// появление
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");
});

// исчезновение перед переходом
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  if (link.target === "_blank") return;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return;

  e.preventDefault();
  document.body.classList.remove("page-ready");

  setTimeout(() => {
    window.location.href = link.href;
  }, 150);
});

