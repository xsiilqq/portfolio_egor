document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".send-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        // замени на свой toast
        alert("Sent ✅ Thanks!");
      } else {
        alert("Error ❌ Try again");
      }
    } catch (err) {
      alert("Network error ❌");
      console.error(err);
    }
  });
});