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
const mobMenuBtn = document.getElementById("mobMenuBtn");

function toggleMobMenuButton() {
  //Closed icon
  const mobMenuClosed = document.getElementById("mobileMenuClosed");

  function toggleMobMenuBtnClosed() {
    mobMenuClosed.classList.remove("block");
    mobMenuClosed.classList.add("hidden");
  }

  mobMenuBtn.addEventListener("click", toggleMobMenuBtnClosed);

  // Opened icon
  const mobMenuOpen = document.getElementById("mobileMenuOpen");

  function toggleMobMenuBtnOpen() {
    mobMenuOpen.classList.add("block");
    mobMenuOpen.classList.remove("hidden");

    mobMenuBtn.addEventListener("click", function () {
      mobMenu.classList.add("hidden");
      mobMenu.classList.remove("add");
      mobMenuOpen.classList.remove("block");
      mobMenuOpen.classList.add("hidden");
      mobMenuClosed.classList.remove("hidden");
      mobMenuClosed.classList.add("block");
    });
  }

  mobMenuBtn.addEventListener("click", toggleMobMenuBtnOpen);

  // Dropdown Mob Menu
  const mobMenu = document.getElementById("mobMenu");
  // const mobMenuBtn = document.getElementById("mobMenuBtn");

  function toggleMobMenu() {
    mobMenu.classList.remove("hidden");
    mobMenu.classList.add("block", "bg-white", "z-10");
  }

  mobMenuBtn.addEventListener("click", toggleMobMenu);
}

mobMenuBtn.addEventListener("click", toggleMobMenuButton);

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
