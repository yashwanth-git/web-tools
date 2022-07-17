function compare(word, guess) {
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

export default compare;