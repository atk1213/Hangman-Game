//word list
var words = ["apple", "orange", "pineapple", "banana"];

//variables defined prior to adjustments
var wins = 0;
var losses = 0;
var chances = 6;
var badGuess = []; //array to show player's bad guesses
var answer = ""; //string of solution for round
var answerArray = []; //array of solution for round
var numberOfBlanks = 0;
var displayedAnswer = []; //the answer seen by the player


function initializeGame() {
    //randomly pick
    answer = words[Math.floor(Math.random() * words.length)];
    //split randomly chosen word 
    answerArray = answer.split("");
    numberOfBlanks = answerArray.length;
    displayedAnswer = [];
    for (var i = 0; i < numberOfBlanks; i++) {
        displayedAnswer.push("_");
    }
    document.getElementById("answerSpace").innerHTML = displayedAnswer.join(" ");
    badGuess = [];
    document.getElementById("incorrectGuesses").innerHTML = badGuess.join(" ");
    chances = 6;
    document.getElementById("chances").innerHTML = chances;
    console.log(answer);
};

document.addEventListener("DOMContentLoaded", function (event) {
    initializeGame(); 
});