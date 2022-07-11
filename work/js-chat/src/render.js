const render = ({ state, appEl }) => {
  const html = `
        <main>
            ${generateLoader(state)}
            ${generateStatusHtml(state)}
            ${getLogin(state)}
            ${generateNav(state)}
            ${generateUserList(state)}
            ${generateMessages(state)}
        </main>
    `;
  appEl.innerHTML = html;

  function generateStatusHtml(state) {
    return `
        <div class="status">${state.error}</div>
    `;
  }

  function generateLoader(state) {
    if (state.isLoginPending) {
      return `
        <div className="pre-loader">
          <div className="styled-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
    `;
    } else {
      return ``;
    }
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

  function generateNav(state) {
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
              state.username.charAt(0).toUpperCase() + state.username.slice(1)
            }</span>
          </div>
        </li>
        <li>
          <form method="POST" action="./logout">
            <button class="logout-btn" type="submit">Logout</button>
          </form>
        </li>
      </ul>
    </nav>`;
    } else {
      return ``;
    }
  }

  function generateMessages(state) {
    if (state.isLoggedIn) {
      if (Object.values(state.messages).length > 0) {
        return (
          `<div class="messages-container">
              <ol class="messages">` +
          Object.values(state.messages)
            .map(
              (message) => `
              <li>
                <div class="message">
                  <span class="sender-avatar">${message.username.charAt(
                    0
                  )}</span>
                  <div class="message-content">
                    <p class="message-sender">${message.username}</p>
                    <p class="message-text">${message.message}</p>
                  </div>
                </div>
              </li>
            `
            )
            .join("") +
          `</ol>
              <div class="outgoing">
                <form class="chat-send-form">
                  <input type="text" class="to-send" name="message" placeholder="Type your message"/>
                  <button type="submit" class="send-btn">Send</button>
                </form>
              </div>
            </div>
            `
        );
      } else {
        return `
          <div class="no-messages"><h2>No Messages Yet</h2></div>
        `;
      }
    } else {
      return ``;
    }
  }

  function generateUserList(state) {
    if (state.isLoggedIn) {
      return (
        `<ul class="users">` +
        Object.values(state.users)
          .map(
            (user) => `
                <li>
                  <div class="user">
                    <span class="username">${user.username}</span>
                  </div>
                </li>
              `
          )
          .join("") +
        `</ul>`
      );
    } else {
      return ``;
    }
  }
};

export default render;
