"use strict";
(function() {

  const state = {
    isLoggedIn: false,
    storedWord: '',
  };

  const appEl = document.querySelector('#app');
  addEvents();

  fetchCheckLogin()
    .then( fetchStoredWord )
    .then( ({ storedWord }) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.storedWord = storedWord;
      render();
    })
    .catch( () => {
      render();
    });

  function render() {
    if(!state.isLoggedIn) {
      renderLogin();
      return;
    }

    renderWord();
  }

  function renderLogin() {
    appEl.innerHTML = `
      <form class="login" action="">
        <label>
          Username <input class="username">
        </label>
        <button type="submit">Login</button>
      </form>
    `;
  }

  function renderWord() {
    appEl.innerHTML = `
      <form class="logout" action="">
        <button type="submit">Logout</button>
      </form>
      <form class="change-word" action="">
        <input class="word" value="${state.storedWord}">
        <button type="submit">Update</button>
      </form>
    `;
  }

  function addEvents() {
    appEl.addEventListener('submit', (e) => {
      e.preventDefault();

      if(e.target.classList.contains('login')) {
        login();
        return;
      }

      if(e.target.classList.contains('change-word')) {
        changeWord();
        return;
      }

      if(e.target.classList.contains('logout')) {
        logout();
        return;
      }
    });
  }

  function login() {
    const username = document.querySelector('.username').value;
    fetchLogin(username)
    .then( fetchStoredWord )
    .then( ({ storedWord }) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.storedWord = storedWord;
      render();
    });
  }

  function logout() {
    fetchLogout()
    .then( () => {
      state.isLoggedIn = false;
      state.storedWord = ''
      render();
    });
  }

  function changeWord() {
    const word = document.querySelector('.word').value;
    fetchChangeWord(word)
    .then( ({ storedWord }) => {
      state.isLoggedIn = true;
      state.storedWord = storedWord;
      render();
    });
  }

  function fetchCheckLogin() {
    return fetch('/api/session/')
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
  }

  function fetchLogin(username) {
    return fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify( { username } ),
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
  }

  function fetchLogout() {
    return fetch('/api/session/', {
      method: 'DELETE',
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
  }

  function fetchStoredWord() {
    return fetch('/api/word/')
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
  }

  function fetchChangeWord(word) {
    return fetch('/api/word/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify( { word } ),
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
  }

})();
