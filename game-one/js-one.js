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

let playerpick, rand, computerpick, choices, score;

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
    ["Your paper refutes the Spock. Take that!",+1],
    ["Your paper is cut to shreds by the scissors.",-1],
    ["Your paper is eaten by the lizard.",-1]
]
scissorsarray = [
    ["Your scissors cut the paper.",+1],
    ["Your scissors are hit hard by mr. Spock.",-1],
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

score = 0;
function compare() {
    rand = Math.floor(Math.random() * 5);
    computerpick = choices[rand];
    $("computerpick").innerText = computerpick;
    $("playerpick").innerText = playerpick;

    switch (playerpick) {
        case "rock":
            $("winnermsg").innerText = rockarray[rand][0]; score += rockarray[rand][1];
            break;
        case "paper":
            $("winnermsg").innerText = paperarray[rand][0]; score += paperarray[rand][1];
            break;
        case "scissors":
            $("winnermsg").innerText = scissorsarray[rand][0]; score += scissorsarray[rand][1];
            break;
        case "lizard":
            $("winnermsg").innerText = lizardarray[rand][0]; score += lizardarray[rand][1];
            break;
        case "spock":
            $("winnermsg").innerText = spockarray[rand][0]; score += spockarray[rand][1];
            break;
        }
        $("score").innerText = "Score:" + score;
}