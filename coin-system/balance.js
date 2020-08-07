//this is to know which page you're on
const path = window.location.pathname.split("/");
const page = path[path.length - 1];
let fileprefix = "../";
if (page == "index.html") {
  fileprefix = "";
}

//this function is used to shorten the whole getElementById method
function $(x) {
  return document.getElementById(x);
}

//display balance
function displaybalance() {
$("balance").innerText =
  "Current balance: " + Number(localStorage.getItem("balance"));

}
displaybalance()

//when clicked, add to balance and spent and display balance
$("pay10").onclick = () => {
  localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 10);
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 10);
  $("balance").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
  $("bank").innerText = Number(localStorage.getItem("balance"));
};

$("pay25").onclick = () => {
  localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 25);
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 25);
  $("balance").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
  $("bank").innerText = Number(localStorage.getItem("balance"));
};

$("pay100").onclick = () => {
  localStorage.setItem(
    "balance",
    Number(localStorage.getItem("balance")) + 100
  );
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 100);
  $("balance").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
  $("bank").innerText = Number(localStorage.getItem("balance"));
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
const mobMenuBtn = $("mobMenuBtn");

function toggleMobMenuButton() {
  const mobMenuClosed = $("mobileMenuClosed");
  const mobMenuOpen = $("mobileMenuOpen");

  mobMenuClosed.classList.toggle("block");
  mobMenuClosed.classList.toggle("hidden");
  mobMenuOpen.classList.toggle("block");
  mobMenuOpen.classList.toggle("hidden");
}

mobMenuBtn.addEventListener("click", toggleMobMenuButton);

// Toggle nav dropdown
function navToggle() {
  const btn = $("mobMenuBtn");
  const nav = $("mobMenu");

  btn.classList.toggle("open");
  nav.classList.toggle("hidden");
}

mobMenuBtn.addEventListener("click", navToggle);

// Username Profile main Page

function displayUsername() {
  let username = $("usernameInput").value;
  let usernameShow = $("username");
  localStorage.setItem("myUsername", `${username}`);
  usernameShow.textContent = `Username: ${localStorage.getItem("myUsername")}`;
}

$("username").textContent = `Username: ${localStorage.getItem("myUsername")}`;

if (typeof $("usernameBtn") != "undefined" && $("usernameBtn") != null) {
  document
    .getElementById("usernameBtn")
    .addEventListener("click", displayUsername);
}

// Username Profile Mobile page

function displayUsername() {
  let username = $("usernameInput").value;
  let usernameShow = $("usernameMob");
  localStorage.setItem("myUsername", `${username}`);
  usernameShow.textContent = `Username: ${localStorage.getItem("myUsername")}`;
}

$("usernameMob").textContent = `Username: ${localStorage.getItem(
  "myUsername"
)}`;

if (typeof $("usernameBtn") != "undefined" && $("usernameBtn") != null) {
  document
    .getElementById("usernameBtn")
    .addEventListener("click", displayUsername);
}

//display balance Mobile nav
$("balanceMob").innerText =
  "Current balance: " + Number(localStorage.getItem("balance"));

//when clicked, add to balance and spent and display balance
$("pay10Mob").onclick = () => {
  localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 10);
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 10);
  $("balanceMob").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
};

$("pay25Mob").onclick = () => {
  localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 25);
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 25);
  $("balanceMob").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
};

$("pay100Mob").onclick = () => {
  localStorage.setItem(
    "balance",
    Number(localStorage.getItem("balance")) + 100
  );
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 100);
  $("balanceMob").innerText =
    " Current balance: " + Number(localStorage.getItem("balance"));
};

// Badge mobile nav
badge1;

// Badges
function badgeupdateMob() {
  if (localStorage.getItem("game1unlock") == null) {
    localStorage.setItem("game1unlock", 0);
  } else if (Number(localStorage.getItem("game1unlock")) > 0) {
    $("badge1Mob").setAttribute("src", fileprefix + "images/badges/badge1.svg");
  }
  if (localStorage.getItem("game2unlock") == null) {
    localStorage.setItem("game2unlock", 0);
  } else if (Number(localStorage.getItem("game2unlock")) > 0) {
    $("badge2Mob").setAttribute("src", fileprefix + "images/badges/badge2.svg");
  }
  if (localStorage.getItem("game3unlock") == null) {
    localStorage.setItem("game3unlock", 0);
  } else if (Number(localStorage.getItem("game3unlock")) > 0) {
    $("badge3Mob").setAttribute("src", fileprefix + "images/badges/badge3.svg");
  }
  if (localStorage.getItem("game4unlock") == null) {
    localStorage.setItem("game4unlock", 0);
  } else if (Number(localStorage.getItem("game4unlock")) > 0) {
    $("badge4Mob").setAttribute("src", fileprefix + "images/badges/badge4.svg");
  }
}
badgeupdateMob();

badge1;

// Badges
function badgeupdate() {
  if (localStorage.getItem("game1unlock") == null) {
    localStorage.setItem("game1unlock", 0);
  } else if (Number(localStorage.getItem("game1unlock")) > 1) {
    $("badge1").setAttribute("src", fileprefix + "images/badges/badge1.svg");
  }
  if (localStorage.getItem("game2unlock") == null) {
    localStorage.setItem("game2unlock", 0);
  } else if (Number(localStorage.getItem("game2unlock")) > 0) {
    $("badge2").setAttribute("src", fileprefix + "images/badges/badge2.svg");
  }
  if (localStorage.getItem("game3unlock") == null) {
    localStorage.setItem("game3unlock", 0);
  } else if (Number(localStorage.getItem("game3unlock")) > 0) {
    $("badge3").setAttribute("src", fileprefix + "images/badges/badge3.svg");
  }
  if (localStorage.getItem("game4unlock") == null) {
    localStorage.setItem("game4unlock", 0);
  } else if (Number(localStorage.getItem("game4unlock")) > 0) {
    $("badge4").setAttribute("src", fileprefix + "images/badges/badge4.svg");
  }
}
badgeupdate();
