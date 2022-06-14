const gameWeb = {
    gamePage: function (gameData){
        return `
        <!doctype html>
        <html>
          <head>
            <title>Word Game</title>
            <link rel="stylesheet" href="./css/styles.css"/>
          </head>
          <body>
            <div id="game-app">
              <h1>Welcome to the Word Guess Game</h1>
            </div>
          </body>
        </html>
        `
    }
}

module.exports = gameWeb;