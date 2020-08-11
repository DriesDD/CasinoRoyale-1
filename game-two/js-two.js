//-------------------//

//--> Game: Twenty-One

//-------------------//

//Cards suits, rank and weight arrays. Deck is generated using these arrays.
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];

const weight = [
  { type: "2", value: 2 },
  { type: "3", value: 3 },
  { type: "4", value: 4 },
  { type: "5", value: 5 },
  { type: "6", value: 6 },
  { type: "7", value: 7 },
  { type: "8", value: 8 },
  { type: "9", value: 9 },
  { type: "1", value: 10 },
  { type: "J", value: 10 },
  { type: "Q", value: 10 },
  { type: "K", value: 10 },
  { type: "A", value: 11 },
];

//DOM elements involve for this game
const display = document.getElementById("deck");
const play = document.getElementById("dealBtn");
const stand = document.getElementById("standBtn");
const hit = document.getElementById("hitBtn");
const computer = document.getElementById("computer");
const player = document.getElementById("player");
const computerCards = document.getElementById("computerCards");
const playerCards = document.getElementById("playerCards");
const computerScore = document.getElementById("computerScore");
const playerScore = document.getElementById("playerScore");
const playAgain = document.getElementById("play");
const modal = document.getElementById("modal");
const result = document.getElementById("result");
const body = document.getElementById("body");
const close = document.getElementById("closeOther");
const coins = document.getElementById("coins");
const bank = document.getElementById("bank");
const chip1 = document.getElementById("chip1");
const chip5 = document.getElementById("chip5");
const chip10 = document.getElementById("chip10");
const chip25 = document.getElementById("chip25");
const bet = document.getElementById("bet");
const balance = document.getElementById("balance");
const coinwon = document.getElementById("coinwon");
const badgeDisplay = document.getElementById("badgeDisplay");
const gamerules = document.getElementById("gamerules");
const modalWidth = document.getElementById("modalwidth");
const rulesheader = document.getElementById("rulesheader");
const info = document.getElementById("info");
const closeInfo = document.getElementById("closeInfo");

//Variables declaration
let deck = [],
  playerCard,
  computerCard,
  rand1,
  rand2,
  firstSum,
  hitPlayer,
  hitSum,
  standSum,
  hiddenCard,
  sumPlayer = 0,
  betAmount = 0,
  count = 0,
  numOfBadge = 0,
  playerWin = 0,
  aIsOne = false,
  aAreTwo = false,
  sum;
// Coin bank and bet updater function
function betUpdate(coin, minCoin, coinSVG) {
  if (betAmount == 0) bet.classList.remove("hidden");
  if (
    Number(localStorage.getItem("balance")) > coin &&
    Number(localStorage.getItem("balance")) - minCoin >= 0
  ) {
    betAmount += minCoin;
    bet.innerText = betAmount;
    localStorage.setItem(
      "balance",
      Number(localStorage.getItem("balance")) - minCoin
    );
    bank.innerText = Number(localStorage.getItem("balance"));
    balance.innerText =
      "Current balance: " + Number(localStorage.getItem("balance"));
    coins.innerHTML += `<img class="w-8 sm:w-10 md:w-10 mr-2" src="coins/${coinSVG}.svg"
    />`;
  }
}
// Chip 1 listener
chip1.addEventListener("click", () => {
  betUpdate(0, 1, "coin-1");
});

// Chip 5 listener
chip5.addEventListener("click", () => {
  betUpdate(4, 5, "coin-5");
});

// Chip 10 listener
chip10.addEventListener("click", () => {
  betUpdate(9, 10, "coin-10");
});

// Chip 25 listener
chip25.addEventListener("click", () => {
  betUpdate(24, 25, "coin-25");
});

// Close button listener. Closes the popup modal box.
close.addEventListener("click", () => {
  modal.classList.add("hidden");
  bet.classList.add("hidden");
  playerScore.classList.add("hidden");
  coinwon.classList.add("hidden");
  computerScore.classList.add("hidden");
  body.classList.remove("opacity-25");
  close.classList.add("hidden");
  playerScore.innerHTML = "";
  computerScore.innerHTML = "";
  playerCards.innerHTML = "";
  computerCards.innerHTML = "";
  coins.innerHTML = "";
  bet.innerHTML = "";
  deck = [];
  betAmount = 0;
  behaviourBtn(play, "on");
  behaviourBtn(stand, "off");
  behaviourBtn(hit, "off");
  behaviourChip(chip1, "on");
  behaviourChip(chip5, "on");
  behaviourChip(chip10, "on");
  behaviourChip(chip25, "on");
});
// Close info button listener, onclick closes the game rules popup
closeInfo.addEventListener("click", () => {
  rulesheader.classList.add("hidden");
  modalWidth.classList.add("max-w-xs");
  gamerules.classList.add("hidden");
  modal.classList.add("hidden");
  closeInfo.classList.add("hidden");
  body.classList.remove("opacity-25");
});

// Info button listener, onclick displays the game rules
info.addEventListener("click", () => {
  close.classList.add("hidden");
  closeInfo.classList.remove("hidden");
  modalWidth.classList.remove("max-w-xs");
  body.classList.add("opacity-25");
  modal.classList.remove("hidden");
  rulesheader.classList.remove("hidden");
  gamerules.classList.remove("hidden");
  playAgain.classList.add("hidden");
  result.classList.add("hidden");
  coinwon.classList.add("hidden");
  gamerules.innerHTML = `<ul class="list-disc">
  <li>The goal of Twenty-One games is to beat the computer's hand without going over 21.</li>
  <li>Cards from 2 to 10 are worth their face value. Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.</li>
  <li>To 'Hit' is to ask for another card.</li>
  <li>To 'Stand' is to hold your total and end your turn.</li>
  <li>If you go over 21 you bust, and the computer wins regardless of the computer's hand.</li>
  <li>Computer will hit until its cards total 17 or higher.</li>
  <li>To earn a badge maintain 5 winning streak.</li>
</ul>`;
});

//On windows load, update bank balance. Disable draw and stand button
window.onload = () => {
  balance.innerText =
    "Current balance: " + Number(localStorage.getItem("balance"));
  bank.innerText = Number(localStorage.getItem("balance"));
  behaviourBtn(hit, "off");
  behaviourBtn(stand, "off");
  betAmount = 0;
};

// Play again button listener. Closes the popup modal box and resets the game.
playAgain.addEventListener("click", () => {
  modal.classList.add("hidden");
  bet.classList.add("hidden");
  playerScore.classList.add("hidden");
  coinwon.classList.add("hidden");
  computerScore.classList.add("hidden");
  body.classList.remove("opacity-25");
  playerScore.innerHTML = "";
  computerScore.innerHTML = "";
  playerCards.innerHTML = "";
  computerCards.innerHTML = "";
  coins.innerHTML = "";
  bet.innerHTML = "";
  deck = [];
  betAmount = 0;
  behaviourBtn(play, "on");
  behaviourBtn(stand, "off");
  behaviourBtn(hit, "off");
  behaviourChip(chip1, "on");
  behaviourChip(chip5, "on");
  behaviourChip(chip10, "on");
  behaviourChip(chip25, "on");
});

// Play button listener. Game starts by clicking this button.
play.addEventListener("click", () => {
  if (betAmount > 0) {
    deckMaker();
    deckShuffle();
    deal(playerCard, "playerFirstCard");
    deal(computerCard, "computerFirstCard");
    playAgain.classList.remove("hidden");
    behaviourBtn(play, "off");
    behaviourBtn(hit, "on");
    behaviourBtn(stand, "on");
    behaviourChip(chip1, "off");
    behaviourChip(chip5, "off");
    behaviourChip(chip10, "off");
    behaviourChip(chip25, "off");
  } else {
    setTimeout(() => {
      close.classList.remove("hidden");
      body.classList.add("opacity-25");
      modal.classList.remove("hidden");
      playAgain.classList.add("hidden");
      result.classList.remove("hidden");
      result.innerHTML = `First place a bet`;
    }, 500);
  }
});

// Hit button listener. If player wants to draw more card he/she clicks this button.
hit.addEventListener("click", () => {
  deal(playerCard, "playerHitCard");
  if (firstSum > 21) {
    close.classList.remove("hidden");
    document
      .getElementById("hiddenCard")
      .setAttribute("src", `cards/${hiddenCard}.svg`);
    computerScore.innerHTML = standSum;
    winner("Player bust!", "lose");
  }
});

// Stand button listener. If player wants to stand and computer play its turn he/she clicks this button.
stand.addEventListener("click", () => {
  close.classList.remove("hidden");
  behaviourBtn(hit, "off");
  document
    .getElementById("hiddenCard")
    .setAttribute("src", `cards/${hiddenCard}.svg`);
  computerScore.innerHTML = standSum;
  while (standSum < 17) {
    deal(computerCard, "computerHitCard");
  }
  if (standSum > 21) {
    winner("Computer bust!", "gain");
  } else if (standSum > firstSum) {
    winner("Computer wins!", "lose");
  } else if (standSum < firstSum) {
    winner("Player wins!", "gain");
  } else if ((standSum = firstSum)) {
    winner("It's a tie!", "tie");
  }

  behaviourBtn(stand, "off");
});
// This function announces the winner
// Uses settimeout to delay function call after 1000ms
// Displays result in popup modal with gain or lose coins
function winner(message, decision) {
  switch (decision) {
    case "gain":
      setTimeout(() => {
        closeInfo.classList.add("hidden");
        body.classList.add("opacity-25");
        modal.classList.add("opacity-100");
        modal.classList.remove("hidden");
        result.classList.remove("hidden");
        localStorage.setItem(
          "balance",
          Number(localStorage.getItem("balance")) + betAmount * 2
        );
        bank.innerText = Number(localStorage.getItem("balance"));
        balance.innerText =
          "Current balance: " + Number(localStorage.getItem("balance"));
        result.innerHTML = `${message}`;
        coinwon.classList.remove("hidden");
        coinwon.innerHTML = `Player gets +${betAmount * 2} coins`;
        playerWin++;
        if (playerWin == 5) {
          numOfBadge++;
          switch (numOfBadge) {
            case numOfBadge == 1:
              badgeEarn("badge2", 2);
              break;
            case numOfBadge == 2:
              badgeMore();
              break;
            case numOfBadge == 3:
              badgeMore();
              break;
            case numOfBadge == 4:
              badgeMore();
              break;
          }
        }
      }, 1000);
      break;
    case "lose":
      setTimeout(() => {
        body.classList.add("opacity-25");
        modal.classList.remove("hidden");
        result.classList.remove("hidden");
        result.innerHTML = `${message}`;
        coinwon.classList.remove("hidden");
        coinwon.innerHTML = `Player lose -${betAmount} coins`;
        playerWin = 0;
      }, 1000);
      break;
    case "tie":
      setTimeout(() => {
        localStorage.setItem(
          "balance",
          Number(localStorage.getItem("balance")) + betAmount
        );
        bank.innerText = Number(localStorage.getItem("balance"));
        balance.innerText =
          "Current balance: " + Number(localStorage.getItem("balance"));
        body.classList.add("opacity-25");
        modal.classList.remove("hidden");
        result.innerHTML = `${message}`;
      }, 1000);
      break;
  }
}
// More than one badge
function badgeMore() {
  badgeDisplay.classList.remove("hidden");
  badgeDisplay.innerHTML = `<h2 class="font-semibold text-xl py-2 px-12 font-titlefont"
>You did great but you already earned the badge</h2>`;
}
// Display badge
function badgeEarn(badgeImg, badgeNum) {
  badgeDisplay.classList.remove("hidden");
  badgeDisplay.innerHTML = `<img class="w-10 mr-2" src="../images/${badgeImg}.svg"
    />`;
  localStorage.setItem(`game${badgeNum}unlock`, 1);
  badgeupdate();
}

// This function is the Brain of the game, it contains pretty much all the algorithm of the game.
// Deal 2 cards for player and computer respectively. When player clicks the play button the first 2 cards are generated in this function.
// Clicking the hit button alway fire this funtion for each draw card.
// Computer also call this funtion to draw its cards.
function deal(cards, check) {
  let firstCard, firstChar, secondCard, secondChar;
  // Switch statement that takes check as parameter and based on that decides which case to execute
  // For player and computer first 2 cards it only execute when it has playerFirstCard and computerFirstCard string as argument
  switch (check) {
    case "playerFirstCard":
    case "computerFirstCard":
      cards = randNumber();
      firstCard = deck[cards[0]];
      firstChar = firstCard.charAt(0);
      ifAce(firstChar);
      secondCard = deck[cards[1]];
      secondChar = secondCard.charAt(0);
      ifAce(secondChar);
      weight.forEach((item) => {
        if (firstChar === secondChar && firstChar === item.type) {
          sumPlayer = item.value * 2;
        } else if (firstChar === item.type || secondChar === item.type) {
          sumPlayer += item.value;
        }
      });
      weight.forEach((item) => {
        if (firstChar === item.type) {
          sum = item.value;
        }
      });
      // Switch inside switch conditional statement to display player and computer first 2 cards
      switch (check) {
        case "playerFirstCard":
          aInPlayerCard = count;
          count = 0;
          firstSum = sumPlayer;
          playerCards.innerHTML += `<img class="mr-1 sm:h-40 h-20" src="cards/${firstCard}.svg" />`;
          playerCards.innerHTML += `<img class="mr-1 sm:h-40 h-20" src="cards/${secondCard}.svg" />`;
          playerScore.classList.remove("hidden");
          playerScore.innerHTML = sumPlayer;
          break;
        case "computerFirstCard":
          aInComputerCard = count;
          count = 0;
          standSum = sumPlayer;
          hiddenCard = firstCard;
          computerCards.innerHTML += `<img id="hiddenCard" class="mr-1 sm:h-40 h-20" src="cards/RED_BACK.svg"  />`;
          computerCards.innerHTML += `<img class=                "mr-1 sm:h-40 h-20" src="cards/${secondCard}.svg" />`;
          computerScore.classList.remove("hidden");
          computerScore.innerHTML = sumPlayer - sum;
          break;
      }
      (sum = 0), (sumPlayer = 0);
      break;
    // If player wishes to draw more cards then it goes through this case
    case "playerHitCard":
      cards = randNumber();
      firstCard = deck[cards[0]];
      firstChar = firstCard.charAt(0);
      ifAce(firstChar);
      aInPlayerCard += count;
      count = 0;
      weight.forEach((item) => {
        if (firstChar === item.type) {
          hitPlayer = item.value;
        }
      });
      firstSum += hitPlayer;
      for (let i = 0; i < aInPlayerCard; i++) {
        if (aInPlayerCard > 0 && firstSum > 21) {
          firstSum -= 10;
          aInPlayerCard -= 1;
        }
      }
      hitSum = firstSum;
      playerCards.innerHTML += `<img class="mr-1 sm:h-40 h-20" src="cards/${firstCard}.svg" />`;
      playerScore.innerHTML = hitSum;
      if (hitSum > 21) {
        behaviourBtn(hit, "off");
      }
      break;
    // Computer auto card draw switch case, it will draw until its cards total 17 or higher.
    case "computerHitCard":
      cards = randNumber();
      firstCard = deck[cards[0]];
      firstChar = firstCard.charAt(0);
      ifAce(firstChar);
      aInComputerCard += count;
      count = 0;
      weight.forEach((item) => {
        if (firstChar === item.type) {
          hitPlayer = item.value;
        }
      });
      standSum += hitPlayer;
      for (let i = 0; i < aInComputerCard; i++) {
        if (aInComputerCard > 0 && firstSum > 21) {
          standSum -= 10;
          aInComputerCard -= 1;
        }
      }
      computerCards.innerHTML += `<img class="mr-1 sm:h-40 h-20" src="cards/${firstCard}.svg" />`;
      computerScore.innerHTML = standSum;
      if (standSum > 21) {
        behaviourBtn(stand, "off");
      }
      break;
  }
}
// Checks the number of Aces in payer and computer cards
function ifAce(char) {
  if (char == "A") {
    count++;
  }
}

// Generates the deck
function deckMaker() {
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(`${value}-${suit}`);
    });
  });
}
// Shuffling the deck
function deckShuffle() {
  for (let i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

// Random array generator with 2 values
function randNumber() {
  do {
    rand1 = Math.floor(Math.random() * 51);
    rand2 = Math.floor(Math.random() * 51);
  } while (rand1 === rand2);
  return [rand1, rand2];
}

// Makes button disabled true or false
function behaviourBtn(button, check) {
  switch (check) {
    case "off":
      button.classList.add("bg-orange-300", "cursor-not-allowed");
      button.classList.remove("bg-orange-500");
      button.disabled = true;
      break;
    case "on":
      button.classList.add("bg-orange-500");
      button.classList.remove("bg-orange-300", "cursor-not-allowed");
      button.disabled = false;
      break;
  }
}
// Makes button disabled true or false
function behaviourChip(button, check) {
  switch (check) {
    case "off":
      button.classList.add("cursor-not-allowed");
      button.disabled = true;
      break;
    case "on":
      button.classList.remove("cursor-not-allowed");
      button.disabled = false;
      break;
  }
}
