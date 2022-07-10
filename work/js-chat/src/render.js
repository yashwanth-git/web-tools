const render = ({ state, appEl }) => {
  const html = `
        <main>
            ${generateStatusHtml(state)}
            ${getLogin(state)}
            ${generateMessages(state)}
        </main>
    `;
  appEl.innerHTML = html;

  function generateStatusHtml(state) {
    return `
        <div class="status">${state.error}</div>
    `;
  }

  function getLogin(state) {
    if (state.isLoggedIn) {
      return ``;
    }
    return `
      <div class="login-form-container">
        <div class="login-form">
          <h2 class="login-title">Login</h2>
          <form class="login-form-wrap" method="POST">
              <div class="input-field">
                  <input type="text" class="username" name="username" placeholder=" " />
                  <label for="username">Username</label>
              </div>
              <button type="submit" class="login-btn">Login</button>
          </form>
        </div>
      </div>  
    `;
  }

  function generateMessages(state) {
    if (state.isLoggedIn) {
      return `
      <nav class="user-navbar">
      <ul>
        <li>
          <div class="user-details">
            <span class="user-avatar">${state.username
              .charAt(0)
              .toUpperCase()}</span>
            <span class="user-name">${
              state.username.charAt(0).toUpperCase() +
              state.username.slice(1)
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
    <ol class="messages">` +
        Object.values(state.messages)
          .map(
            (message) => `
        <li>
          <div class="message">
            <span class="sender-avatar">${message.sender.charAt(0)}</span>
            <div class="message-content">
              <p class="message-sender">${message.sender}</p>
              <p class="message-text">${message.text}</p>
            </div>
          </div>
        </li>
        `
      )
      .join("") +
    `</ol>`
      ;
    }
    else{
      return ``
    }
  }
};

export default render;
