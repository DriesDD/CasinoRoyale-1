//this function is used to shorten the whole getElementById method
function $(x) {
  return document.getElementById(x);
}

//display balance
$("balance").innerText =
  "Current balance: " + Number(localStorage.getItem("balance"));

//when clicked, add to balance and spent and display balance
$("pay10").onclick = () => {
  localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 10);
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 10);
  $("balance").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
};

$("pay25").onclick = () => {
  localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 25);
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 25);
  $("balance").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
};

$("pay100").onclick = () => {
  localStorage.setItem(
    "balance",
    Number(localStorage.getItem("balance")) + 100
  );
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 100);
  $("balance").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
};

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

//Mobile Menu SVG
const mobMenuBtn = document.getElementById("mobMenuBtn");

function toggleMobMenuButton() {
  const mobMenuClosed = document.getElementById("mobileMenuClosed");
  const mobMenuOpen = document.getElementById("mobileMenuOpen");

  mobMenuClosed.classList.toggle("block");
  mobMenuClosed.classList.toggle("hidden");
  mobMenuOpen.classList.toggle("block");
  mobMenuOpen.classList.toggle("hidden");
}

mobMenuBtn.addEventListener("click", toggleMobMenuButton);

// Toggle nav dropdown
function navToggle() {
  const btn = document.getElementById("mobMenuBtn");
  const nav = document.getElementById("mobMenu");

  btn.classList.toggle("open");
  nav.classList.toggle("hidden");
}

mobMenuBtn.addEventListener("click", navToggle);

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
