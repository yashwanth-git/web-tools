const dataWeb = {
  indexPage: function (data, sid) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>User Application</title>
            <link rel="stylesheet" href="./css/styles.css"/>
            <link rel="stylesheet" href="./css/form.css"/>
          </head>
          <body>
            <div id="user-app">
                ${!sid ? dataWeb.getLogin() : `The session id is ${sid}`}
            </div>
          </body>
        </html>
        `;
  },
  getLogin: function(){
    return  `
        <div class="signup-form">
            <h1 class="signup-title">Sign Up</h1>
            <form method="POST" action="./signup">
                <div class="input-field">
                    <input type="text" class="username" name="username" placeholder=" " />
                    <label for="username">Username</label>
                </div>
                <button type="submit" class="signup-btn">Sign Up</button>
            </form>
        </div>
    `
  }
};

module.exports = dataWeb;