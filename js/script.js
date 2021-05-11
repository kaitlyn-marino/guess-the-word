const guessedLettersValue = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessLetterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingGuessEmphasize = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

//Fetch words from .text file
const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await request.text();
    const wordArray = data.split("\n");
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    updateParagraph(word);
};

getWord();

// Display the word in circle symbols
const updateParagraph = function (word) {
    const letters = [];
    for (const letter of word) {
        //console.log(letter);
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
    //console.log(guessLetter);
    guessLetter.innerText = "";
    messages.innerText = "";
    const guess = validateInput(guessLetter);
    if (guess) {
        makeGuess(guessLetter);
    }
    guessLetterInput.value = "";
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

//Converts all letters to uppercase to avoid duplicates
//Adds guessed letters to array
const makeGuess = function (guessLetter) {
    guessLetter = guessLetter.toUpperCase();
    if (guessedLetters.includes(guessLetter)) {
        messages.innerText = "You have already guessed that letter. Please try a different letter.";
    } else {
        guessedLetters.push(guessLetter);
        //console.log(guessedLetters);
        displayGuessedLetters();
        countRemainingGuess(guessLetter);
        updateWordInProgress(guessedLetters);
    }
};

//Displaying guessed letter array
const displayGuessedLetters = function () {
    guessedLettersValue.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersValue.append(li);
    }
};

//Update the wordInProgress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const guessWordArray = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            guessWordArray.push(letter.toUpperCase());
    } else {
        guessWordArray.push("●");
    }
}
    wordInProgress.innerText = guessWordArray.join("");
    winOrLoose();

};

//Count down remaining guesses
const countRemainingGuess = function (guessLetter) {
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guessLetter)) {
        messages.innerText = `Yay! The word contains the letter ${guessLetter}.`;
    } else {
        messages.innerText = `Oops! There is no ${guessLetter} in the word. Please guess again.`;
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        messages.innerText = `Game Over. The word was ${word}.`;
        remainingGuess.innerText = `You have no more guesses.`
    } else if (remainingGuesses === 1) {
        remainingGuessEmphasize.innerText = `1 guess`;
    } else {
        remainingGuessEmphasize.innerText = `${remainingGuesses} guesses`;
    }
};

//Check if the Player Won
const winOrLoose = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};
