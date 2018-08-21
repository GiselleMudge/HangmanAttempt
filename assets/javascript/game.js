

'use strict';

var selectableWords =           // Word list
    [
        "PREDATOR",
        "DUTCH",
        "HAWKINS",
        "BILLY",
        "DILLON",
        "BLAIN",
        "MAC",
        "PONCHO",
        "ANNA",
    ];

const maxTries = 10;       // Maximum number of tries player has

var guessedLetters = [];   // Stores the letters the user guessed
var currentWordIndex;      // Index of current word in the array
var guessingWord = [];     // Current word to guess
var remainingGuesses = 0;  // remaining guesses left
var hasFinished = false;   // Flag for 'press any key to try again'     
var wins = 0;              // tracks trophies

// Game sounds
var soundLost = document.getElementById("LoseLaugh");
var soundWin = document.getElementById("WinSong");



// Reset game
function resetGame() {
    remainingGuesses = maxTries;

    // create a random value
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // Randomly pick current word and hide value
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   

    // Hide Win or Lose gifs and text
    document.getElementById("pressKeyTryAgainW").style.cssText= "display: none";
    document.getElementById("pressKeyTryAgainL").style.cssText= "display: none";
    document.getElementById("Loseimage").style.cssText = "display: none";
    document.getElementById("Winimage").style.cssText = "display: none";

    // Stop Music
    soundLost.pause();
    soundLost.currentTime = 0;

    soundWin.pause();
    soundWin.currentTime = 0;

    // Show display
    updateDisplay();
};

//  Update display on page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop & find correct guessed letters in current word, store  guessed letters in an array.
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // removing a guess
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // Loop & replace blanks with letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// Checks for a win by seeing if there are no more underscores left
function WinTest() {
    if(guessingWord.indexOf("_") === -1) {
        
        document.getElementById("Winimage").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgainW").style.cssText= "display: block";
        wins++;
        soundWin.play();
        hasFinished = true;
    }
};


// Checks for a loss
function LoseTest()
{
    if(remainingGuesses <= 0) {
        soundLost.play();
        document.getElementById("Loseimage").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgainL").style.cssText = "display:block";
        hasFinished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};


// Event listener
document.onkeydown = function(event) {
    // game is done, prompt to press any key to reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            WinTest();
            LoseTest();
        }
    }
};