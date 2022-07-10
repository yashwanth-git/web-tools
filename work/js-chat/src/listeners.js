import render from "./render";
import { fetchLogin, fetchLogout } from "./services";
import { login, logout } from "./state";

export function abilityToLogin({ state, appEl }) {
  appEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("login-form-wrap")) {
      return;
    }
    const username = document.querySelector(".username").value;
    fetchLogin(username)
      .then((res) => {
        console.log(res);
        login(username);
        render({ state, appEl });
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        render({ state, appEl });
      });
  });
}

export function abilityToLogout({ state, appEl }) {
    appEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('logout-btn')) {
        return;
      }
      logout();
      render({ state, appEl });
      fetchLogout() 
      .catch( err => {
        setError(err?.error || 'ERROR'); 
        render({ state, appEl });
      });
    });
  }
