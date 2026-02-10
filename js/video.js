document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");

  function stopAll(exceptVideo) {
    cards.forEach(card => {
      const video = card.querySelector(".work-video");
      const btn = card.querySelector(".video-btn");

      if (video && video !== exceptVideo) {
        video.pause();
        video.currentTime = 0;
        video.muted = true; // возвращаем в "preview режим"
        btn?.classList.remove("is-playing");
        btn?.classList.remove("is-click-playing");
      }
    });
  }

  cards.forEach(card => {
    const btn = card.querySelector(".video-btn");
    const video = card.querySelector(".work-video");
    if (!btn || !video) return;

    // стартовое состояние: preview без звука
    video.muted = true;
    video.playsInline = true;

   btn.addEventListener("click", async (e) => {
  e.preventDefault();

  // если видео уже играет, но БЕЗ звука (после hover)
  if (!video.paused && video.muted) {
    video.muted = false;
    video.volume = 0.3;
    btn.classList.add("is-click-playing");
    return;
  }

  // если видео играет со звуком — ставим на паузу
  if (!video.paused && !video.muted) {
    video.pause();
    btn.classList.remove("is-click-playing");
    return;
  }

  // если видео вообще не играет
  stopAll(video);
  video.muted = false;
  video.volume = 0.3;

  try {
    await video.play();
    btn.classList.add("is-click-playing");
  } catch (err) {
    console.log("Play blocked:", err);
  }
});

    // HOVER — только preview без звука (только desktop)
    card.addEventListener("mouseenter", async () => {
      if (!window.matchMedia("(hover: hover)").matches) return;

      // если это видео уже запущено по клику (со звуком) — не трогаем
      if (btn.classList.contains("is-click-playing")) return;

      stopAll(video);
      video.muted = true;

      try {
        await video.play();
        btn.classList.add("is-playing");
      } catch {}
    });

    card.addEventListener("mouseleave", () => {
      if (!window.matchMedia("(hover: hover)").matches) return;

      // если играет по клику — не останавливаем при уходе мышки
      if (btn.classList.contains("is-click-playing")) return;

      video.pause();
      video.currentTime = 0;
      btn.classList.remove("is-playing");
    });

    // когда видео закончилось — сбрасываем кнопки
    video.addEventListener("ended", () => {
      btn.classList.remove("is-playing");
      btn.classList.remove("is-click-playing");
      video.muted = true;
      video.currentTime = 0;
    });
  });
});
