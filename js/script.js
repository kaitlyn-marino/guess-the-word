const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessLetterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessEmphasize = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";


// Display the word in circle symbols //
const updateParagraph = function (word) {
    const letters = [];
    for (const letter of word) {
        console.log(letter);
        letters.push("●");
    }
    
    wordInProgress.innerText = letters.join("");

};
updateParagraph(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessLetter = guessLetterInput.value;
    console.log(guessLetter);
    guessLetter.innerText = "";
    
});