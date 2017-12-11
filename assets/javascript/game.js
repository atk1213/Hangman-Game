//word list
var words = ["zorra", "gerudo", "goron", "deku", "hyrule", "link", "zelda", "ganondorf", "shiek", "triforce", "epona"];

//variables defined prior to adjustments
var wins = 0;
var losses = 0;
var chances = 6;
var correctLetter; //boolean for onkeyup
var badGuess = []; //array to show player's bad guesses
var answer = ""; //string of solution for round
var answerArray = []; //array of solution for round
var numberOfSpaces = 0; //number of spaces for length of answer
var displayedAnswer = []; //the answer seen by the player

//when starting the game, need to choose a random word from the list, split it, display it in the document as 
//underscores (as many as there are letters), and join them in their corresponding array but with a seperator
function restartGame() {
    answer = words[Math.floor(Math.random() * words.length)];
    answerArray = answer.split("");
    numberOfSpaces = answerArray.length;
    displayedAnswer = [];
    for (var i = 0; i < numberOfSpaces; i++) {
        displayedAnswer.push("_");
    }
    document.getElementById("answerSpace").innerHTML = displayedAnswer.join(" ");
    badGuess = [];
    document.getElementById("incorrectGuesses").innerHTML = badGuess.join(" ");
    chances = 6;
    document.getElementById("remainingGuesses").innerHTML = chances;
};

//once the document is ready, call the initialization function to start the game
document.addEventListener("DOMContentLoaded", function (event) {
    function initializeGame() {
        answer = words[Math.floor(Math.random() * words.length)];
        answerArray = answer.split("");
        numberOfSpaces = answerArray.length;
        displayedAnswer = [];
        for (var i = 0; i < numberOfSpaces; i++) {
            displayedAnswer.push("_");
        }
        document.getElementById("answerSpace").innerHTML = displayedAnswer.join(" ");
    };
    initializeGame();
});
//once the game is initialized, check to see if input matches any of the indicies
//if input matches an index, display correct letters at corresponding locations in the word
//otherwise, list as bad guess and take away a chance
document.onkeyup = function (event) {
    var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
    function letterCheck(keyPressed) {
        var correctLetter = false;
        for (var i = 0; i < numberOfSpaces; i++) {
            if (answer[i] === keyPressed) {
                correctLetter = true;
            }
        }
        if (correctLetter) {
            for (var j = 0; j < numberOfSpaces; j++) {
                if (answer[j] === keyPressed) {
                    displayedAnswer[j] = keyPressed;
                }
            }
            var get = new Audio("assets/audio/rupee.wav");
            get.play();
        }
        else {
            badGuess.push(keyPressed);
            chances--;
        }
    };
    letterCheck(keyPressed);
    //using the data obtained from the letter comparison, update the html and compare to win/loss conditions
    function complete() {
        document.getElementById("remainingGuesses").innerHTML = chances;
        document.getElementById("incorrectGuesses").innerHTML = badGuess.join(" ");
        document.getElementById("answerSpace").innerHTML = displayedAnswer.join(" ");

        if (answerArray.toString() === displayedAnswer.toString()) {
            wins++;
            var win = new Audio("assets/audio/win.mp3");
            win.play();
            alert("It was " + answer + ". You win! Let's play again!");
            document.getElementById("wins").innerHTML = wins;
            restartGame();
        }

        else if (chances === 0) {
            losses++;
            var lose = new Audio("assets/audio/gameover.mp3");
            lose.play();
            alert("It was " + answer + ". Game over... Try Again?");
            document.getElementById("losses").innerHTML = losses;
            restartGame();
        }

    };
    complete();
}; 
