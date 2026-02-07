document.addEventListener("DOMContentLoaded", () => {
const cards = document.querySelectorAll(".video-card");

function stopAll(exceptVideo) {
  cards.forEach(card => {
    const video = card.querySelector(".work-video");
    const btn = card.querySelector(".video-btn");

    if (video !== exceptVideo) {
      video.pause();
      video.currentTime = 0;
      btn.classList.remove("is-playing");
    }
  });
}

// click: play/pause
cards.forEach(card => {
  const btn = card.querySelector(".video-btn");
  const video = card.querySelector(".work-video");

  btn.addEventListener("click", async () => {
    if (video.paused) {
      stopAll(video);
      try {
        await video.play();
        btn.classList.add("is-playing");
      } catch (e) {
        // autoplay policies or other issues
        console.log("Play blocked:", e);
      }
    } else {
      video.pause();
      btn.classList.remove("is-playing");
    }
  });

  // hover preview (desktop)
  card.addEventListener("mouseenter", async () => {
    if (window.matchMedia("(hover: hover)").matches) {
      stopAll(video);
      video.muted = true;
      try {
        await video.play();
        btn.classList.add("is-playing");
      } catch (e) {}
    }
  });

  card.addEventListener("mouseleave", () => {
    if (window.matchMedia("(hover: hover)").matches) {
      video.pause();
      video.currentTime = 0;
      btn.classList.remove("is-playing");
    }
  });
});

});
