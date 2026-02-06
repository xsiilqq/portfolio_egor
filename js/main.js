
document.querySelectorAll('nav a').forEach((link) => {
  if (link.pathname === window.location.pathname) {
    link.classList.add('active');
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

