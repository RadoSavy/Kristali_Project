// Smooth scroll behavior for in-page anchors
// Adds smooth scrolling when clicking on navbar links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-to-Top Button Logic
// Shows the button after scrolling down and scrolls up when clicked
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("d-none");
  } else {
    scrollBtn.classList.add("d-none");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Alert on "Научи повече" click
// Displays a basic alert for demonstration
const learnMoreButtons = document.querySelectorAll('.btn-crystal');
learnMoreButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Очаквайте скоро повече информация за този кристал!");
  });
});