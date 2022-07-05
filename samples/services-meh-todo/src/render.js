import { MESSAGES } from './constants';

export function render( { state, add } = {} ) {
  const html = Object.values(state.todos).map( todo => {
    const isDoneClass = todo.done ? "todo__text--complete" : "";
    const isAddedClass = add === todo.id ? "todo__text--added" : "";
    return `
      <li class="todo">
        <label
        >
          <input
            class="todo__toggle"
            data-id="${todo.id}"
            type="checkbox"
            ${todo.done ? "checked" : ""}
          >
          <span
            data-id="${todo.id}"
            class="todo__toggle todo__text ${ isDoneClass } ${isAddedClass} "
          >
            ${todo.task}
          </span>
        </label>
        <button
          data-id="${todo.id}"
          class="todo__delete"
        >
          &#10060;
        </button>
      </li>
      `;
  }).join('') || `<p>No Todo Items yet, add one!</p>`;
  const todosEl = document.querySelector('.todos');
  todosEl.innerHTML = html;
}

export function renderStatus(message) {
  const statusEl = document.querySelector('.status');
  if( !message ) {
    statusEl.innerText = '';
    return;
  }
  const key = message?.error ? message.error : 'default';
  statusEl.innerText = MESSAGES[key] || MESSAGES.default;
}

