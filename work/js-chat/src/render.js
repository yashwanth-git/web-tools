const render = ({ state, appEl }) => {
  const html = `
        <main>
            ${generateStatusHtml(state)}
            ${getLogin(state)}
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
        <div class="login-form">
          <h2 class="login-title">Login</h2>
          <form method="POST" action="./login">
              <div class="input-field">
                  <input type="text" class="username" name="username" placeholder=" " />
                  <label for="username">Username</label>
              </div>
              <button type="submit" class="login-btn">Login</button>
          </form>
        </div>
    `;
  }
};

export default render;
