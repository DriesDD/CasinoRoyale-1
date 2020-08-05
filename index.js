// Flyout Menu

const menu = document.getElementById("menuFlyoutBtn");
const flyoutmenu = document.querySelector("#flyoutmenu");

function toggleMenu() {
  flyoutmenu.classList.remove("opacity-0", "-translate-y-1");
  flyoutmenu.classList.add(
    "transition ease-out",
    "transition duration-200",
    "opacity-100",
    "-translate-y-0",
    "z-50"
  );
}

function toggleMenuOff() {
  flyoutmenu.classList.add("opacity-0", "-translate-y-1");
  flyoutmenu.classList.remove(
    "transition ease-out",
    "transition duration-200",
    "opacity-100",
    "-translate-y-0",
    "z-50"
  );
}

menu.addEventListener("mouseenter", toggleMenu);
flyoutmenu.addEventListener("mouseleave", toggleMenuOff);
