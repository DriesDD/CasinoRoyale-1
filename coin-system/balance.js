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
  let usernameShow = document.getElementById("username");
  localStorage.setItem("myUsername", `${username}`);
  usernameShow.textContent = `Username: ${localStorage.getItem("myUsername")}`;
}

document.getElementById(
  "username"
).textContent = `Username: ${localStorage.getItem("myUsername")}`;

if(typeof(document.getElementById("usernameBtn")) != 'undefined' && (document.getElementById("usernameBtn")) != null)
{document
  .getElementById("usernameBtn")
  .addEventListener("click", displayUsername)}
badge1

// Badges
if (localStorage.getItem("game1unlock") == null) {localStorage.setItem("game1unlock",0)}
else if (Number(localStorage.getItem("game1unlock")) > 0) {document.getElementById("badge1").setAttribute("src","../images/badge1.svg") };
if (localStorage.getItem("game2unlock") == null) {localStorage.setItem("game2unlock",0)}
else if (Number(localStorage.getItem("game2unlock")) > 0) {document.getElementById("badge2").setAttribute("src","../images/badge2.svg") };
if (localStorage.getItem("game3unlock") == null) {localStorage.setItem("game3unlock",0)}
else if (Number(localStorage.getItem("game3unlock")) > 0) {document.getElementById("badge3").setAttribute("src","../images/badge3.svg") };
if (localStorage.getItem("game4unlock") == null) {localStorage.setItem("game4unlock",0)}
else if (Number(localStorage.getItem("game4unlock")) > 0) {document.getElementById("badge4").setAttribute("src","../images/badge4.svg") }
