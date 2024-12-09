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
