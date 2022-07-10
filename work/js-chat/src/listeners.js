import render from "./render";
import { fetchLogin } from "./services";
import { login } from "./state";

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
        setError(err?.error || "ERROR"); // Ensure that the error ends up truthy
        render({ state, appEl });
      });
  });
}
