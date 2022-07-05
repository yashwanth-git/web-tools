import state from './stateTodos';
import {
  fetchAddTodo,
  fetchDeleteTodo,
  fetchUpdateTodo,
  fetchTodos,
  fetchSession,
  fetchLogout,
  fetchLogin,
} from './services';
import { render, renderStatus } from './render';

checkForSession();
addAbilityToLogin();
addAbilityToLogout();
addAbilityToRefresh();
addAbilityToToggleComplete();
addAbilityToAddTodo();
addAbilityToRemoveTodo();

/////////////////////////////////
function setLoggedIn( isLoggedIn ) {
  // Notice how more complicated this is because we're not basing this off of state data
  // Not just here, but in the places we have to change our login status
  // This complexity is why I recommend rendering based on state
  // instead of hiding/showing elements
  const loginEl = document.querySelector('main');
  if(isLoggedIn) {
    loginEl.classList.remove('not-logged-in');
    loginEl.classList.add('logged-in');
  } else {
    loginEl.classList.add('not-logged-in');
    loginEl.classList.remove('logged-in');
  }
  render({state});
  renderStatus('');
}

function renderOnLogin(todos) {
  state.todos = todos;
  setLoggedIn(true);
}

function checkForSession() {
  fetchSession()
  .then( populateTodos )
  .catch( () => setLoggedIn(false) );
}

// In below "addAbility*" functions I'm demonstrating attaching events to
// different spots in the HTML, not to one top level element
// However, notice that all of these elements are NOT replaced in render()
// so this still works
//
// See how the two styles differ and what is easier/harder with each
function addAbilityToLogin() {
  const buttonEl = document.querySelector('.login button');
  const usernameEl = document.querySelector('.login__username');

  // Below and elsewhere I attach to "click" and not "submit" on a form
  // As a result, I can't hit "enter" in the single input to make it progress
  // How would you write these using "submit"?
  buttonEl.addEventListener('click', (e) => {
    const username = usernameEl.value;
    fetchLogin(username)
    .then( renderOnLogin )
    .catch( error => renderStatus(error) );
  });
}

function addAbilityToLogout() {
  const buttonEl = document.querySelector('.logout');
  buttonEl.addEventListener('click', (e) => {
    state.todos = {};
    fetchLogout()
    .then( () => setLoggedIn(false) )
    .catch( error => renderStatus(error) );
  });
}

function populateTodos() {
  fetchTodos()
  .then( rawTodos => {
    state.todos = rawTodos;
    setLoggedIn(true);
    render({ state });
    renderStatus('');
  })
  .catch( error => {
    renderStatus(error);
  });
}

function addAbilityToAddTodo() {
  const buttonEl = document.querySelector('.add');
  const inputEl = document.querySelector('.to-add');
  buttonEl.addEventListener('click', (e) => {
    e.preventDefault();
    const task = inputEl.value;
    fetchAddTodo(task)
    .then( todo => {
      inputEl.value = '';
      state.todos[todo.id] = todo;
      render({state, add: todo.id });
      renderStatus('');
    })
    .catch( err => {
      renderStatus(err || 'error');
    });
  });
}

function addAbilityToRemoveTodo() {
  const listEl = document.querySelector('.todos');
  listEl.addEventListener('click', (e) => {
    e.preventDefault();
    if(!e.target.classList.contains('todo__delete')) {
      return;
    }
    const id = e.target.dataset.id;
    fetchDeleteTodo(id)
    // Below is an alternate path, if we were "trusting" our in-app state to be
    // be as up-to-date as the server
    //
    // Different applications will have different assumptions
    //
    // .then( () => {
    //   delete state.todos[id];
    //   render({ state });
    //   renderStatus('');
    // })
    //
    // Instead, we will ask the server for an update and rerender with those results
    .then( populateTodos )
    .catch( err => {
      renderStatus(err);
    });
  });
}

function addAbilityToToggleComplete() {
  const listEl = document.querySelector('.todos');
  listEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('todo__toggle')) {
      return;
    }

    const id = e.target.dataset.id;
    fetchUpdateTodo(id, { done: !state.todos[id].done } )
    .then( todo => {
      state.todos[id] = todo;
      render({ state });
      renderStatus('');
    })
    .catch( err => {
      renderStatus(err);
    });

  });
}

function addAbilityToRefresh() {
  const buttonEl = document.querySelector('.refresh');
  buttonEl.addEventListener('click', () => {
    populateTodos();
  });
}

