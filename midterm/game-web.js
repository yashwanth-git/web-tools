const gameWeb = {
  gamePage: function (playerData) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Word Game</title>
            <link rel="stylesheet" href="./css/styles.css"/>
            <link rel="stylesheet" href="./css/form.css"/>
          </head>
          <body>
            <div id="game-app">
              <h1>Welcome to the Word Guess Game</h1>
              ${!playerData ? gameWeb.getLogin() : playerData.stepsCount}
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
