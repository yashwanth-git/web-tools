const gameWeb = {
  gamePage: function (playerData, words) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Word Game</title>
            <link rel="stylesheet" href="./css/styles.css"/>
            <link rel="stylesheet" href="./css/form.css"/>
            <link rel="stylesheet" href="./css/game.css"/>
            <script defer src="./scripts/main.js"></script>
          </head>
          <body>
            <div id="game-app">
              ${
                !playerData
                  ? gameWeb.getLogin()
                  : gameWeb.getGame(playerData, words)
              }
            </div>
          </body>
        </html>
        `;
  },
  getLogin: function () {
    return `
            <div class="signup-form">
                <h1 class="signup-title">Sign Up</h1>
                <form method="POST" action="./login">
                    <div class="input-field">
                        <input type="text" class="username" name="username" placeholder=" " />
                        <label for="username">Username</label>
                    </div>
                    <button type="submit" class="signup-btn">Sign Up</button>
                </form>
            </div>
        `;
  },
  getGame: function (playerData, words) {
    return (
      `
    <nav class="user-navbar">
      <ul>
        <li>
          <div class="user-details">
            <span class="user-avatar">${playerData.username
              .charAt(0)
              .toUpperCase()}</span>
            <span class="user-name">${
              playerData.username.charAt(0).toUpperCase() +
              playerData.username.slice(1)
            }</span>
          </div>
        </li>
        <li>
          <form method="POST" action="./logout">
            <button class="logout-btn" type="submit">Logout</button>
          </form>
        </li>
      </ul>
    </nav>
    <div class="game-container">
      <div class="guess-words-container">
        <h1>Guess Words List <span>Please select your guess by clicking words from the below list:</span></h1>
        <div class="guess-words-cover">
          <ul class="guess-words-list">` +
      words
        .map(
          (word) => `
          <li class="guess-word">
              <div class="guess" data-word="${word}">
                  ${word}
              </div>
          </li>
          `
        )
        .join("") +
      `</ul>
        </div>
      </div>
      <div class="player-guess-container">
          <form method="POST" action="./guess">
            <input type="text" class="guessed-word" placeholder="Select/ Enter your guess" name="guess"/>
            <button type="submit" class="to-check">Check</button>
          </form>
      </div>
      <div class="game-status">
          <div class="game-guess-status">
            <div class="valids">
              <p>Valid Guesses: <span>${playerData.validGuessCount}</span></p>
            </div>
            <div class="last-guess">
              <p>Last Guess: <span class=${
                playerData.history.length
                  ? playerData.history[playerData.history.length - 1].match > 0
                    ? "valid"
                    : "invalid"
                  : "not-started"
              }>${
        playerData.history.length
          ? playerData.history[playerData.history.length - 1].valid + " Guess"
          : "No Guesses Yet"
      }</span>
              </p>
            </div>
          </div>
          ${
            playerData.isMatch
              ? `
                <div class="game-end">
                    <h2>Well Done, You Won!</h2>
                    <p>The secret word was ${
                      playerData.history[playerData.history.length - 1].word
                    }
                    <div class="new-game">
                      <form method="POST" action="./new-game">
                      <button type="submit" class="start-game">Start a New Game</button>
                      </form>
                    </div>
                </div>
              `
              : `<div class="game-activity-status">
              <h2>History</h2>
                <ul class="activities">` +
                (
                  playerData.history &&
                  playerData.history.map(
                    (activity) =>
                      `<li class="activity">${
                        activity.word
                      } <span>-- matches --</span> ${
                        activity.match
                      } letters <span> -- [${
                        activity.match === playerData.secretWord.length
                          ? "Incorrect Guess"
                          : activity.match > 0
                          ? "Valid Guess"
                          : "Invalid Guess"
                      }]</span></li>`
                  )
                ).join("") +
                `</ul>
            </div>
              `
          }
      </div>
    </div>
    `
    );
  },
  getError: function () {
    return `
    <!doctype html>
    <html>
      <head>
        <title>401 Unauthorized</title>
        <link rel="stylesheet" href="./css/styles.css"/>
        <link rel="stylesheet" href="./css/unauthorized.css"/>
      </head>
      <body>
        <div id="unauthorized-page">
            <h1 class="error-title">Unauthorized User</h1>
            <p class="error-description">The user is not authorized to sign up. Please try again. </p>
            <a href="/" class="home-link">Home</a>
        </div>
      </body>
    </html>
    `;
  },
};

module.exports = gameWeb;
