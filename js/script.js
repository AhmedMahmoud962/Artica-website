// Function to toggle dark mode
function toggleDarkMode() {
  const rootElement = document.documentElement;
  const toggleButtonIcon = document.querySelector("#dark-mode-toggle i");

  // Toggle dark mode class
  const isDarkMode = rootElement.classList.toggle("dark-mode");

  // Change the icon dynamically
  if (isDarkMode) {
    toggleButtonIcon.classList.remove("fa-moon");
    toggleButtonIcon.classList.add("fa-sun");
  } else {
    toggleButtonIcon.classList.remove("fa-sun");
    toggleButtonIcon.classList.add("fa-moon");
  }
}

// Initialize dark mode toggle on page load
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("dark-mode-toggle");
  toggleButton.addEventListener("click", toggleDarkMode);
});

// Get the header element
const header = document.querySelector("header");

// Add an event listener to detect scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // Adjust scrollY value as needed
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// header menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

// to change image using size
document.addEventListener("DOMContentLoaded", function () {
  function checkScreenSize() {
    const img = document.getElementById("wizard-image");
    if (window.innerWidth < 770) {
      img.src = "img/wizard-small.png"; // Change this to the path of your small image
    } else {
      img.src = "img/wizard.png"; // Change this to the path of your default image
    }
  }

  // Check the screen size on initial load
  checkScreenSize();

  // Add an event listener to check the screen size on resize
  window.addEventListener("resize", checkScreenSize);
});

// Request demo section
