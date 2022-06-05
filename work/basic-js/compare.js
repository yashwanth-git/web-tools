"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
  // DO NOT MODIFY

  /* YOU MAY MODIFY THE LINES BELOW */
  let counter = 0;
  const givenWord = word.toLowerCase().split("");
  const guessedWord = guess.toLowerCase().split("");

  guessedWord.forEach((letter) => {
    if (givenWord.includes(letter)) {
      counter++;
      givenWord.splice(givenWord.indexOf(letter), 1);
    }
  });
  return counter;
}
