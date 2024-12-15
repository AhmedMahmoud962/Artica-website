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

// calender to book appointment
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

// calender to make an appointment
// const daysTag = document.querySelector(".days"),
//   currentDate = document.querySelector(".current-date"),
//   prevNextIcon = document.querySelectorAll(".icons span");

// // getting new date, current year and month
// let date = new Date(),
//   currYear = date.getFullYear(),
//   currMonth = date.getMonth();

// // storing full name of all months in array
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const renderCalendar = () => {
//   let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
//     lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
//     lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
//     lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
//   let liTag = "";

//   for (let i = firstDayofMonth; i > 0; i--) {
//     // creating li of previous month last days
//     liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
//   }

//   for (let i = 1; i <= lastDateofMonth; i++) {
//     // creating li of all days of current month
//     // adding active class to li if the current day, month, and year matched
//     let isToday =
//       i === date.getDate() &&
//       currMonth === new Date().getMonth() &&
//       currYear === new Date().getFullYear()
//         ? "active"
//         : "";
//     liTag += `<li class="${isToday}" data-day="${i}">${i}</li>`;
//   }

//   for (let i = lastDayofMonth; i < 6; i++) {
//     // creating li of next month first days
//     liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
//   }
//   currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
//   daysTag.innerHTML = liTag;

//   const allDays = daysTag.querySelectorAll("li:not(.inactive)"); // select active days only
//   allDays.forEach((day) => {
//     day.addEventListener("click", (e) => {
//       // Remove 'active' class from all days
//       allDays.forEach((d) => d.classList.remove("active"));
//       // Add 'active' class to the clicked day
//       e.target.classList.add("active");
//     });
//   });
// };

// renderCalendar();

// prevNextIcon.forEach((icon) => {
//   // getting prev and next icons
//   icon.addEventListener("click", () => {
//     // adding click event on both icons
//     // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
//     currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

//     if (currMonth < 0 || currMonth > 11) {
//       // if current month is less than 0 or greater than 11
//       // creating a new date of current year & month and pass it as date value
//       date = new Date(currYear, currMonth, new Date().getDate());
//       currYear = date.getFullYear(); // updating current year with new date year
//       currMonth = date.getMonth(); // updating current month with new date month
//     } else {
//       date = new Date(); // pass the current date as date value
//     }
//     renderCalendar(); // calling renderCalendar function
//   });
// });
