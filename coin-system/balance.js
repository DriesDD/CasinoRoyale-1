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
