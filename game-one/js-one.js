/*
Game: Rock, Paper, Scissors, Lizard, Spock
The Mission

Make a Rock, Paper, Scissors, Lizard, Spock game. It's like Rock, Paper, Scissors, but more fun!
Must-have features

    Have five buttons that the player can press to change their pick
    Have another button to let the computer pick one
    Show the winner
    Let the player know if they won or not (no alert box)
    Have a reset button

Nice-to-have features

    Nice graphics
    Simulate the computer thinking/working by using a timeout
    Let the player input using a text field
    Show what the player picked by highlighting the correct button
    Add more options (but avoid using 100 if statements)
    Add complex rules
*/
/*Scissors cuts Paper
Paper covers Rock
Rock crushes Lizard
Lizard poisons Spock
Spock smashes Scissors
Scissors decapitates Lizard
Lizard eats Paper
Paper disproves Spock
Spock vaporizes Rock
(and as it always has) Rock crushes Scissors*/


//used variables on this page. also uses localstorage variables 'spent' and 'balance'

let playerpick, rand, computerpick, choices, score, stakes;

score = 0;

$("balance").innerText = "Balance:" + Number(localStorage.getItem("balance"));


//this function is used to shorten the whole getElementById method
function $(x) {return document.getElementById(x);}

//hide the element to buy more coins at first

$("pay10").hidden = 1

//playerpick buttons

$('rock').onclick = () => {
    reset();
    playerpick = "rock";
    $('rock').setAttribute("class", "picked")
}
$('paper').onclick = () => {
    reset();
    playerpick = "paper";
    $('paper').setAttribute("class", "picked")
}
$('scissors').onclick = () => {
    reset();
    playerpick = "scissors";
    $('scissors').setAttribute("class", "picked")
}
$('lizard').onclick = () => {
    reset();
    playerpick = "lizard";
    $('lizard').setAttribute("class", "picked")
}
$('spock').onclick = () => {
    reset();
    playerpick = "spock";
    $('spock').setAttribute("class", "picked")
}

$('play1').onclick = () => {
    if (Number(localStorage.getItem("balance")) >= 1)
    {if (playerpick != undefined) {
        stakes = 1;
        compare()
    } else {
        $("playerpick").innerText = "Please make your pick."}}
    else
    {$("playerpick").innerText = "Not enough balance.";
    $("pay10").hidden = 0
    }
}

$('play5').onclick = () => {
    if (Number(localStorage.getItem("balance")) >= 5)
    {if (playerpick != undefined) {
        stakes = 5;
        compare()
    } else {
        $("playerpick").innerText = "Please make your pick."}}
    else
    {$("playerpick").innerText = "Not enough balance.";
    $("pay10").hidden = 0
    }
}

//visible if balance is low. Adds coins (and also tracks amount spent).

$('pay10').onclick = () => {
localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 10);
localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 10);
$("balance").innerText = "Balance:" + Number(localStorage.getItem("balance"));
$("playerpick").innerText = "Added 10 coins to balance.";
$("pay10").hidden = 1}

//resets the score of the game

$('reset').onclick = () => {
    score = 0;
    $("score").innerText = "Score reset to 0";
    reset()
}

function reset() {
    $('rock').removeAttribute("class");
    $('paper').removeAttribute("class");
    $('scissors').removeAttribute("class");
    $('lizard').removeAttribute("class");
    $('spock').removeAttribute("class");
    playerpick = 0
}

//the possible combinations
//rock: 0 paper: 1 scissors: 2 lizard: 3 spock: 4

choices = ["rock", "paper", "scissors", "lizard", "spock"]
rockarray = [
    ["The two rocks hit eachother and nothing happens.",0],
    ["Your rock is wrapped in paper and suffocates. It's a special rock, with lungs.",-1],
    ["Your rock smashes the scissors.",+1],
    ["Your rock stone-cold squashes the lizard to a pulp.",+1],
    ["Your rock is vaporized by Spock.",-1]
]
paperarray = [
    ["Your paper covers the rock. It gets published in a leading geology journal.",+1],
    ["Two papers. That's a brochure. I mean a tie.",0],
    ["Your paper is cut to shreds by the scissors.",-1],
    ["Your paper is eaten by the lizard.",-1]
    ["Your paper refutes the Spock. Take that!",+1],
]
scissorsarray = [
    ["Your scissors are smashed by the rock.",-1],
    ["Your scissors cut up the paper.",+1],
    ["Have you ever made a tie with two scissors? You have now.",0],
    ["Your scissors decapitated the lizard!",+1],
    ["Your scissors are crushed by the Spock.",-1]
]
lizardarray = [
    ["Ssss. Your lizard is sssquashed by a big rock.",-1],
    ["Yummy. Your lizard ate the paper :).",+1],
    ["Swish! Your lizard is cut in half by the scissors. Can lizards grow back half their body or only their tails?",-1],
    ["Oh nice! Another lizard. Hello fellow lizard. It's a tie.",0],
    ["Hehe >:) Your lizard poisoned the spock.",+1]
]
spockarray = [
    ["Your Spock vaporizes the rock! Don't fock with the Spock, rock.",+1],
    ["Your Spock is disproven by the paper. You wither away in shame.",-1],
    ["Your Spock smashes the scissors! Spocktastic!",+1],
    ["Spock was poisoned by the computer's lizard. Who knew reptiles were its weakness?",-1],
    ["Spocks don't take issue with eachother. It's a tie.",0]
]

//wait then see who wins and adds to score and balance

timeout = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}

async function compare() {
    $("computerpick").innerText = "Ready...";
    $("playerpick").innerText = "Ready...";
    await timeout(500);

    $("computerpick").innerText = "Set...";
    $("playerpick").innerText = "Set...";
    await timeout(500);

    rand = Math.floor(Math.random() * 5);

    //if the player's balance and the stakes are high, rig the game a little bit
    if (localStorage.getItem("balance") > (Math.random() * 100 - stakes*10))
    {switch(playerpick)
        {case "rock": if (rand == 2 || rand == 3){Math.floor(Math.random() * 5)}; break;
         case "paper": if (rand == 0 || rand == 4){Math.floor(Math.random() * 5)}; break;
         case "scissors": if (rand == 1 || rand == 3){Math.floor(Math.random() * 5)}; break;
         case "lizard": if (rand == 1 || rand == 4){Math.floor(Math.random() * 5)}; break;
         case "spock": if (rand == 0 || rand == 2){Math.floor(Math.random() * 5)}; break;            
        }

    }

    computerpick = choices[rand];
    $("computerpick").innerText = computerpick;
    $("playerpick").innerText = playerpick;
    await timeout(500);
    
    switch (playerpick) {
        case "rock":

            $("winnermsg").innerText = rockarray[rand][0]; score += rockarray[rand][1]*stakes; 
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + rockarray[rand][1]*stakes);
            break;
        case "paper":
            $("winnermsg").innerText = paperarray[rand][0]; score += paperarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + paperarray[rand][1]*stakes);
            break;
        case "scissors":
            $("winnermsg").innerText = scissorsarray[rand][0]; score += scissorsarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + scissorsarray[rand][1]*stakes);
            break;
        case "lizard":
            $("winnermsg").innerText = lizardarray[rand][0]; score += lizardarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + lizardarray[rand][1]*stakes);
            break;
        case "spock":
            $("winnermsg").innerText = spockarray[rand][0]; score += spockarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + spockarray[rand][1]*stakes);
            break;
        }
    
        $("score").innerText = "Score:" + score;
        $("balance").innerText = "Balance:" + Number(localStorage.getItem("balance"));
}