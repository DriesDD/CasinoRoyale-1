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

//rock: 1 paper: 2 scissors: 3 lizard: 4 spock: 5

let playerpick, rand, computerpick, choices;

function $(x) {
    return document.getElementById(x);
}

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

$('play').onclick = () => {
    if (playerpick != 0) {
        compare()
    } else {
        $("playerpick").innerText = "Please make your pick.";
    }
}
$('reset').onclick = () => {
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

choices = ["rock", "paper", "scissors", "lizard", "spock"]
rockarray = [
    "The two rocks hit eachother and nothing happens.",
    "Your rock is wrapped in paper and suffocates. It's a special rock, with lungs.",
    "Your rock smashes the scissors.",
    "Your rock stone-cold squashes the lizard to a pulp.",
    "Your rock is vaporized by Spock."
]
paperarray = [
    "Your paper covers the rock. It gets published in a leading geology Jjurnal.",
    "Two papers. That's a brochure. I mean a tie.",
    "Your paper refutes the Spock. Take that!",
    "Your paper is cut to shreds by the scissors.",
    "Your paper is eaten by the lizard."
]
scissorsarray = [
    "Your scissors cut the paper.",
    "Your scissors are hit hard by mr. Spock.",
    "Have you ever made a tie with two scissors? You have now.",
    "Your scissors decapitated the lizard!",
    "Your scissors are crushed by the Spock."
]
lizardarray = [
    "Ssss. Your lizard is sssquashed by a big rock.",
    "Yummy. Your lizard ate the paper :).",
    "Swish! Your lizard is cut in half by the scissors. Can lizards grow back half their body or only their tails?",
    "Oh nice! Another lizard. Hello fellow lizard. It's a tie.",
    "Hehe >:) Your lizard poisoned the spock."
]
spockarray = [
    "Your Spock vaporizes the rock! Don't fock with the Spock, rock.",
    "Your Spock is disproved by the paper. You wither away in shame.",
    "Your Spock smashes the scissors! Spocktastic!",
    "Spock was poisoned by the computer's lizard. Who knew reptiles were its weakness?",
    "Spocks don't take issue with eachother. It's a tie."
]

function compare() {
    rand = Math.floor(Math.random() * 5);
    computerpick = choices[rand];
    $("computerpick").innerText = computerpick;
    $("playerpick").innerText = playerpick;

    switch (playerpick) {
        case "rock":
            $("winnermsg").innerText = rockarray[rand];
            break;
        case "paper":
            $("winnermsg").innerText = paperarray[rand];
            break;
        case "scissors":
            $("winnermsg").innerText = scissorsarray[rand];
            break;
        case "lizard":
            $("winnermsg").innerText = lizardarray[rand];
            break;
        case "spock":
            $("winnermsg").innerText = spockarray[rand];
            break;
    }
}