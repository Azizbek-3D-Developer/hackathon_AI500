const cards = document.querySelectorAll(".demo-card");
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");
const modalDesc = document.getElementById("modal-description");
const closeBtn = document.getElementById("modal-close");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const iframe = card.querySelector('iframe');
        modalVideo.src = iframe.src;
        modalDesc.textContent = card.dataset.desc;
        modal.classList.remove("hidden");
    });
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalVideo.src = ""; // stop video playback
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
        modalVideo.src = "";
    }
});

