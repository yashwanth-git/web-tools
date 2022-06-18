
const guessEl = document.querySelectorAll(".guess-word") || {};
const guessWordEl = document.querySelector(".guessed-word");

guessEl.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.stopPropagation();
    guessWordEl.value = e.target.dataset.word;
    console.log(guessWordEl.value);
  });
});
