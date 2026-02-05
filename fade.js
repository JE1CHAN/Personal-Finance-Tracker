const welcomeSection = document.getElementById("welcome-section");
const contentSection = document.getElementById("content-section");
const nextBtn = document.getElementById("btn-next");
const backBtn = document.getElementById("btn-back");

// Event Listener: Move Forward
nextBtn.addEventListener("click", () => {
  // Add class to move welcome UP and OUT
  welcomeSection.classList.add("slide-up");

  // Add class to move content UP and IN
  contentSection.classList.add("active");
});

// Event Listener: Move Backward
backBtn.addEventListener("click", () => {
  // Remove class to bring welcome BACK DOWN
  welcomeSection.classList.remove("slide-up");

  // Remove class to send content BACK DOWN
  contentSection.classList.remove("active");
});
