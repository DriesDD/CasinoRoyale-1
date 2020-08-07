/*
--> Game: Memory

--> The Mission
We want to recreate the game Memory. It is a game where you have a bunch of cards. Each card contains an image. Of each image there are exactly two cards. The cards are placed in a random order. You get to turn them around two at a time. Once you turned around two cards, they either turn back if they did not match, or they stay visible if they did match.

--> Must-have features
Clicking cards turns them around (max 2 at a time!)
Randomly position the cards in a grid
Reset button

--> Nice-to-have features
Make it playable by keyboard
Let a user define custom image urls
Make it pleasing to look at
Multiplayer (local)
*/

//cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]; //spliting up the list card in it seperate items
let paid = 0;
let balance;
function showBalance() {
  balance = localStorage.getItem("balance") * 1;
  document.getElementById("balance").innerHTML = "Current balance: " + balance;
}
console.log(document.getElementById("balance").innerHTML);

//change if: only when card is clicked
// loop to add event listeners to each card
//document.querySelector(".memory-game").classList.remove("disabled");
for (let i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard); //rotates the cards
  card.addEventListener("click", cardOpen); // checks if 2 cards matching or not
  if (paid == 0) {
    card.addEventListener("click", checkPaid);
  }
  card.addEventListener("click", congrats); //checks if all cards are matched
}

// displayCard is a function I'll define below.
//It will say all the things happen when I'll click the cards
//In the code block above, the cards' array[1] was created and the for loop helps to loop through each card till the full length of cards array is covered.
// Each loop will add an event listener which listens for a click on the card and runs the displayCard function on click.

//below: creation of function "displayCard
//this function is called when a card is clicked
//it adds or removes classes to the cards which therefore changes its styling
// "this. means only the card I click will be change
//classList is calling all the classes from HTML for this card
//toggle means add or remove the class
function displayCard() {
  this.classList.toggle("open"); //change the style to an "open" "shown" card
  this.getElementsByTagName("img")[0].classList.toggle("open"); //add class to the img to rotate it
  this.getElementsByTagName("img")[1].classList.toggle("open");
  this.classList.toggle("disabled"); //disables the card. You cannot click on it anymore.

  // console.log(this.getElementsByTagName("img"));
}
//classes to be defined in CSS
// Fisher-Yates (aka Knuth) Shuffle has invented the below function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

let interval;
let moves = 0; // variables always have to be defined before they are used
let second = 0,
  minute = 0;
const carddeck = document.querySelector(".memory-game");
function startGame() {
  let shuffleCards = shuffle(cards);
  for (let i = 0; i < shuffleCards.length; i++) {
    carddeck.appendChild(shuffleCards[i]); // pushing back the shuffled cards to HTML by adding them as a child to the parent div
    cards[i].classList.remove("match", "open"); //reset cards
    cards[i].getElementsByTagName("img")[0].classList.remove("open");
    cards[i].getElementsByTagName("img")[1].classList.remove("open");
    cards[i].classList.remove("disabled");
    // reset img put logo back to the front
  }
  //reset moves
  moves = 0;
  document.getElementById("counterText").innerHTML = "Move(s): " + moves;
  //reset timing
  clearInterval(interval); //stops the clock every second running
  minute = 0;
  second = 0;
  document.getElementById("counterTime").innerHTML =
    "Time: " + minute + "' " + second + "''";
}
//In the code above is the startGame function and it will shuffle cards and display each card in the deck on game board.
//Since we know the startGame function shuffles the card in order to shuffle the cards on load, we add this to our JS:

document.getElementById("pay").onclick = () => {
  if (localStorage.getItem("balance") >= 20 && paid == 0) {
    paid += 1; // 1 = true
    localStorage.setItem("balance", localStorage.getItem("balance") - 20);
    showBalance();
  } else if (paid != 0) {
    //if you have paid already
    alert("You have paid already, let the game begin!");
  } else if (balance < 20) {
    alert("You need more balance to join the party!");
  }
};
// localStorage.setItem("balance", 1000);

//add opened cards to openedCards list and check if cards are match or not
let openedCards = []; // created empty array
function cardOpen() {
  openedCards.push(this); //it adds the cards which is opened to an array list openedCards
  console.log(openedCards);
  if (openedCards.length == 2) {
    moveCounter();
    let source1 = openedCards[0]
      .getElementsByTagName("img")[0]
      .getAttribute("src");
    let source2 = openedCards[1]
      .getElementsByTagName("img")[0]
      .getAttribute("src");
    // console.log(source1, source2);
    if (source1 == source2) {
      matched();
    } else {
      unmatched();
    }
  }
}

//for when cards match
function matched() {
  openedCards[0].classList.add("match"); //adding a new style to the 2 cards: green + animation
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("open"); // removing the old style in this case blue
  openedCards[1].classList.remove("open");
  openedCards = []; // it is emptying the array of opened cards
}
//for when cards don't match
function unmatched() {
  openedCards[0].classList.add("unmatch"); //adding a new style to the 2 cards: red + animation
  openedCards[1].classList.add("unmatch");
  //make it impossible to click to card while the time out is running otherwise it gives a bug
  disable();
  //1sec later turn around the cards back to the original logo
  setTimeout(function () {
    openedCards[0].classList.remove("open", "unmatch"); //remove the added styles from the cards
    openedCards[1].classList.remove("open", "unmatch");
    openedCards[0].getElementsByTagName("img")[0].classList.remove("open"); //remove the added styles from the imgs 0=front 1=backimg
    openedCards[1].getElementsByTagName("img")[1].classList.remove("open");
    openedCards[1].getElementsByTagName("img")[0].classList.remove("open");
    openedCards[0].getElementsByTagName("img")[1].classList.remove("open");
    //make the cards clickable again except for the matched ones
    enable();
    openedCards = []; //after the match and unmatched check empthy the array again for the next 2 cards
  }, 1100);
}
//disable the cards temporarily
function disable() {
  for (i = 0; i < cards.length; i++) {
    cards[i].classList.add("disabled");
  }
}
//enable all cards again, then disable the matched ones
let matchedCards = document.getElementsByClassName("match");
function enable() {
  for (i = 0; i < cards.length; i++) {
    cards[i].classList.remove("disabled");
  }

  for (i = 0; i < matchedCards.length; i++) {
    matchedCards[i].classList.add("disabled");
  }
}

function moveCounter() {
  moves++;
  document.getElementById("counterText").innerHTML = "Move(s): " + moves;
  if (moves == 1) {
    second = 0;
    minute = 0;
    startTimer();
  }
}
//document.getElementsByClassName("moves").innerHTML = moves;
//console.log(document.getElementsByClassName("moves").inner);
//console.log(document.getElementsByClassName("movescounter").innerHTML);
//let counterText = document.getElementsByClassName("counterText")[0].innerHTML;

function startTimer() {
  interval = setInterval(() => {
    document.getElementById("counterTime").innerHTML =
      "Time: " + minute + "' " + second + "''";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

//create a modal

let modal = document.getElementById("popup1");
//close icon in modal
let closeicon = document.querySelector(".close");

//congratulations when all cards match, show modal and moves, time and rating
let finalTime;
function congrats() {
  if (matchedCards.length == 12) {
    clearInterval(interval);
    finalTime = counterTime.innerHTML;
    //show congrats modal
    modal.classList.add("show");
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeicon on modal
    closeModal();
    if (moves <= 10 && second <= 30 && minute < 1) {
      document.getElementById("content-3").innerHTML =
        "Well done! You earned 50 coins!";
      localStorage.setItem("balance", localStorage.getItem("balance") * 1 + 50);
      showBalance();
      localStorage.setItem("game3unlock", 1);
      badgeupdate();
    }
    resetPay();
  }
}
//localStorage.setItem("balance", 1000);
//close icon on modal
function closeModal() {
  closeicon.addEventListener("click", function () {
    //The parameter (e) is automatically passed from javascript to you function when you add an event listener.
    //It represents the element that was affected, an example would be the button element that was clicked.
    modal.classList.remove("show");
  });
}
//for player to play Again

function playAgain() {
  modal.classList.remove("show");
  startGame();
}

function resetPay() {
  paid = 0;
}
//Simply saying once this window (page) is loaded, run the startGame function.
window.onload = startGame();
window.onload = showBalance();

function checkPaid() {
  if (paid == 0) {
    alert("You haven't paid yet!");
    openedCards = [];
    startGame();
  }
}

document.getElementById("refresh").onclick = () => {
  let answer = confirm(
    "if you click OK then you start a new game.20 coins will be paid. If you click cancel, you will go back to your current game"
  );
  if (answer) {
    localStorage.setItem("balance", localStorage.getItem("balance") - 20);
    showBalance();
    openedCards = []; //empty array of opened cards; when refreshed after clicking a card, otherwise still 1 card is open.
    startGame();
  }
};
// display badges
