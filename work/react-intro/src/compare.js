function compare(word, guess) {
  let counter = 0;
  const givenWord = word.toLowerCase().split("");
  const guessedWord = guess.toLowerCase().split("");

  guessedWord.forEach((letter) => {
    const matchAt = givenWord.indexOf(letter);
    if (matchAt > -1) {
      counter++;
      givenWord.splice(matchAt, 1);
    }
  });
  return counter;
}

export default compare;
