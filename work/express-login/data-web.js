const dataWeb = {
  indexPage: function () {
    return `
        <!doctype html>
        <html>
          <head>
            <title>User Application</title>
          </head>
          <body>
            <div id="user-app">
              ${dataWeb.getLogin()}
            </div>
          </body>
        </html>
        `;
  },
  getLogin: function(){
    return  `
        <div class="signup-form">
            <h1>Sign In</h1>
            <form method="POST" action="./signup">
                <div class="input-field">
                    <input type="text" name="username" />
                    <label for="username">Username</label>
                </div>
            </form>
        </div>
    `
  }
};

module.exports = dataWeb;