//this function is used to shorten the whole getElementById method
function $(x) {
  return document.getElementById(x);
}

//display balance
$("pay10").innerText =
  "Current balance:" + Number(localStorage.getItem("balance"));

//when clicked, add 10 to balance and spent and display balance
$("pay10").onclick = () => {
  localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 10);
  localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 10);
  $("pay10").innerText =
    " Current balance:" + Number(localStorage.getItem("balance"));
  $("bank").innerText = Number(localStorage.getItem("balance"));
};
