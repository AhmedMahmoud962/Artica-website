// header menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

// to chande image using size
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

// Back to top
// Back to top button
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $(".back-to-top").fadeIn("slow");
  } else {
    $(".back-to-top").fadeOut("slow");
  }
});
$(".back-to-top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
  return false;
});
