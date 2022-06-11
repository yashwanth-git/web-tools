const dataWeb = {
  indexPage: function (data, userData) {
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
                ${!userData ? dataWeb.getLogin() : dataWeb.getData(userData)}
            </div>
          </body>
        </html>
        `;
  },
  getLogin: function () {
    return `
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
    `;
  },
  getData: function (userData) {
    return `
    <nav class="user-navbar">
      <ul>
        <li>
          <div class="user-details">
            <span class="user-avatar">${userData.username
              .charAt(0)
              .toUpperCase()}</span>
            <span class="user-name">${
              userData.username.charAt(0).toUpperCase() +
              userData.username.slice(1)
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
    <div class="user-message">
      <p><span class="message-label">Message</span><span class="message-content">${
        !userData.message
          ? "No message has been updated"
          : `${userData.message}`
      }</span></p>
    </div>
    <div class="update-form">
        <h1 class="update-title">Update Message</h1>
        <form method="POST" action="./signup">
            <div class="input-field">
                <input type="text" class="message" name="message" placeholder=" " />
                <label for="message">Message</label>
            </div>
            <button type="submit" class="update-msg-btn">Update</button>
        </form>
    </div>
  `;
  },
};

module.exports = dataWeb;
