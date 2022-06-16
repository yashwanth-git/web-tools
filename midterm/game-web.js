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
              ${!playerData ? gameWeb.getLogin() : gameWeb.getGame(playerData)}
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
  getGame: function (playerData) {
    return `
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
