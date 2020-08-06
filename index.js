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

//Mobile Menu
const mobMenClosed = document.getElementById("mobileMenuClosed");

const mobMenu = document.getElementById("mobMenu");
function toggleMobMenu() {
  mobMenu.classList.remove("hidden");
}

mobMenClosed.addEventListener("click", toggleMobMenu);

/** 
 * function toggleMobMenu() {
  flyoutmenu.classList.remove("fg"");
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

<svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>  */

// Username

function displayUsername() {
  let username = document.getElementById("usernameInput").value;
  console.log(username);
  let usernameShow = document.getElementById("username");
  localStorage.setItem("myUsername", `${username}`);
  usernameShow.textContent = `Username: ${localStorage.getItem("myUsername")}`;
}

document
  .getElementById("usernameBtn")
  .addEventListener("click", displayUsername);
