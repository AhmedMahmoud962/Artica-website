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
    if (!toggleButton) return; // تجنب الخطأ إذا كان الزر غير موجود

    const body = document.body;

    const toggleDarkMode = () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
    };

    if (localStorage.getItem("darkMode") === "true") {
        body.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", toggleDarkMode);
});

// // Wizard image
// document.addEventListener("DOMContentLoaded", function () {
//     const img = document.getElementById("wizard-image");
//     const smallImage = "img/wizard-small.png";
//     const defaultImage = "img/wizard.png";

//     function updateImage(e) {
//         img.src = e.matches ? smallImage : defaultImage;
//     }

//     const mediaQuery = window.matchMedia("(max-width: 770px)");
//     updateImage(mediaQuery); // Set initial image
//     mediaQuery.addEventListener("change", updateImage); // Listen for changes
// });

// header
const menu = document.querySelector(".menu");
const menuMain = menu.querySelector(".menu-main");
const goBack = menu.querySelector(".go-back");
const menuTrigger = document.querySelector(".mobile-menu-trigger");
const closeMenu = menu.querySelector(".mobile-menu-close");
let subMenu;
menuMain.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) {
        return;
    }
    if (e.target.closest(".menu-item-has-children")) {
        const hasChildren = e.target.closest(".menu-item-has-children");
        showSubMenu(hasChildren);
    }
});
goBack.addEventListener("click", () => {
    hideSubMenu();
});
menuTrigger.addEventListener("click", () => {
    toggleMenu();
});
closeMenu.addEventListener("click", () => {
    toggleMenu();
});
document.querySelector(".menu-overlay").addEventListener("click", () => {
    toggleMenu();
});
function toggleMenu() {
    menu.classList.toggle("active");
    document.querySelector(".menu-overlay").classList.toggle("active");
}
function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector(".sub-menu");
    subMenu.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    const menuTitle =
        hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
    menu.querySelector(".current-menu-title").innerHTML = menuTitle;
    menu.querySelector(".mobile-menu-head").classList.add("active");
}

function hideSubMenu() {
    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
        subMenu.classList.remove("active");
    }, 300);
    menu.querySelector(".current-menu-title").innerHTML = "";
    menu.querySelector(".mobile-menu-head").classList.remove("active");
}

window.onresize = function () {
    if (this.innerWidth > 991) {
        if (menu.classList.contains("active")) {
            toggleMenu();
        }
    }
};

// header scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        // Adjust scroll distance as needed
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
