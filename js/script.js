const guessedLettersValue = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessLetterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessEmphasize = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];


// Display the word in circle symbols
const updateParagraph = function (word) {
    const letters = [];
    for (const letter of word) {
        console.log(letter);
        letters.push("●");
    }
    
    wordInProgress.innerText = letters.join("");

};
updateParagraph(word);

//When the button is clicked, remove defaults
//Log the letter that was input and clear the input field
//Run the validateInput function
//Runs the makeGuess function
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessLetter = guessLetterInput.value;
    console.log(guessLetter);
    guessLetter.innerText = "";
    messages.innerText = "";
    const guess = validateInput(guessLetter);
    if (guess) {
        makeGuess(guessLetter);
    }
});

//Make sure the input is one character, a through z and logs messages accordingly
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        messages.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        messages.innerText = "Please enter just one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please be sure to enter a letter from a to z.";
    } else {
        return input;
    }
};

const makeGuess = function (guessLetter) {
    guessLetter = guessLetter.toUpperCase();
    if (guessedLetters.includes(guessLetter)) {
        messages.innerText = "You have already guessed that letter. Please try a different letter.";
    } else {
        guessedLetters.push(guessLetter);
        console.log(guessedLetters);
    }
};