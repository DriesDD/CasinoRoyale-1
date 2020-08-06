// Flyout Menu

const menu = document.getElementById("menuFlyoutBtn");
const flyoutmenu = document.querySelector("#flyoutmenu");

function toggleMenu() {
  flyoutmenu.classList.remove("opacity-0", "translate", "-translate-y-1");
  flyoutmenu.classList.add(
    "transition",
    "ease-out",
    "transition",
    "duration-200",
    "opacity-100",
    "translate",
    "-translate-y-0",
    "z-50"
  );
}

function toggleMenuOff() {
  flyoutmenu.classList.add("opacity-0", "translate", "-translate-y-1");
  flyoutmenu.classList.remove(
    "transition",
    "ease-out",
    "transition",
    "duration-200",
    "opacity-100",
    "translate",
    "-translate-y-0",
    "z-50"
  );
}

menu.addEventListener("mouseenter", toggleMenu);
flyoutmenu.addEventListener("mouseleave", toggleMenuOff);

// Username

function displayUsername() {
  let username = document.getElementById("usernameInput").value;
  console.log(username);
  let usernameShow = document.getElementById("username");
  localStorage.setItem("myUsername", `${username}`);
  usernameShow.textContent = localStorage.getItem("myUsername");
}

document
  .getElementById("usernameBtn")
  .addEventListener("click", displayUsername);
