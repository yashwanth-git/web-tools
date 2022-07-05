/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES)
/* harmony export */ });
// These messages are incomplete and just to demonstrate the technique
// you will have to expand to cover your scenarios!
var MESSAGES = {
  networkError: 'Trouble connecting to the network.  Please try again',
  "default": 'Something went wrong.  Please try again'
};

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "renderStatus": () => (/* binding */ renderStatus)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

function render() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      state = _ref.state,
      add = _ref.add;

  var html = Object.values(state.todos).map(function (todo) {
    var isDoneClass = todo.done ? "todo__text--complete" : "";
    var isAddedClass = add === todo.id ? "todo__text--added" : "";
    return "\n      <li class=\"todo\">\n        <label\n        >\n          <input\n            class=\"todo__toggle\"\n            data-id=\"".concat(todo.id, "\"\n            type=\"checkbox\"\n            ").concat(todo.done ? "checked" : "", "\n          >\n          <span\n            data-id=\"").concat(todo.id, "\"\n            class=\"todo__toggle todo__text ").concat(isDoneClass, " ").concat(isAddedClass, " \"\n          >\n            ").concat(todo.task, "\n          </span>\n        </label>\n        <button\n          data-id=\"").concat(todo.id, "\"\n          class=\"todo__delete\"\n        >\n          &#10060;\n        </button>\n      </li>\n      ");
  }).join('') || "<p>No Todo Items yet, add one!</p>";
  var todosEl = document.querySelector('.todos');
  todosEl.innerHTML = html;
}
function renderStatus(message) {
  var statusEl = document.querySelector('.status');

  if (!message) {
    statusEl.innerText = '';
    return;
  }

  var key = message !== null && message !== void 0 && message.error ? message.error : 'default';
  statusEl.innerText = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[key] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAddTodo": () => (/* binding */ fetchAddTodo),
/* harmony export */   "fetchDeleteTodo": () => (/* binding */ fetchDeleteTodo),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchTodos": () => (/* binding */ fetchTodos),
/* harmony export */   "fetchUpdateTodo": () => (/* binding */ fetchUpdateTodo)
/* harmony export */ });
function fetchAddTodo(task) {
  return fetch('/api/todos', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      task: task
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchDeleteTodo(id) {
  return fetch("/api/todos/".concat(id), {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUpdateTodo(id, todoUpdates) {
  return fetch("/api/todos/".concat(id), {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify(todoUpdates)
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchTodos() {
  return fetch('/api/todos')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/stateTodos.js":
/*!***************************!*\
  !*** ./src/stateTodos.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// We store these as an object because we will access by id
var todos = {}; // I don't have any other functions here
// all my state manipulation is in the main controller section
// What does this make easier/harder?

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  todos: todos
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stateTodos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stateTodos */ "./src/stateTodos.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



checkForSession();
addAbilityToLogin();
addAbilityToLogout();
addAbilityToRefresh();
addAbilityToToggleComplete();
addAbilityToAddTodo();
addAbilityToRemoveTodo(); /////////////////////////////////

function setLoggedIn(isLoggedIn) {
  // Notice how more complicated this is because we're not basing this off of state data
  // Not just here, but in the places we have to change our login status
  // This complexity is why I recommend rendering based on state
  // instead of hiding/showing elements
  var loginEl = document.querySelector('main');

  if (isLoggedIn) {
    loginEl.classList.remove('not-logged-in');
    loginEl.classList.add('logged-in');
  } else {
    loginEl.classList.add('not-logged-in');
    loginEl.classList.remove('logged-in');
  }

  (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
    state: _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"]
  });
  (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)('');
}

function renderOnLogin(todos) {
  _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"].todos = todos;
  setLoggedIn(true);
}

function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(populateTodos)["catch"](function () {
    return setLoggedIn(false);
  });
} // In below "addAbility*" functions I'm demonstrating attaching events to
// different spots in the HTML, not to one top level element
// However, notice that all of these elements are NOT replaced in render()
// so this still works
//
// See how the two styles differ and what is easier/harder with each


function addAbilityToLogin() {
  var buttonEl = document.querySelector('.login button');
  var usernameEl = document.querySelector('.login__username'); // Below and elsewhere I attach to "click" and not "submit" on a form
  // As a result, I can't hit "enter" in the single input to make it progress
  // How would you write these using "submit"?

  buttonEl.addEventListener('click', function (e) {
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(renderOnLogin)["catch"](function (error) {
      return (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(error);
    });
  });
}

function addAbilityToLogout() {
  var buttonEl = document.querySelector('.logout');
  buttonEl.addEventListener('click', function (e) {
    _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"].todos = {};
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
      return setLoggedIn(false);
    })["catch"](function (error) {
      return (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(error);
    });
  });
}

function populateTodos() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchTodos)().then(function (rawTodos) {
    _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"].todos = rawTodos;
    setLoggedIn(true);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
      state: _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"]
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)('');
  })["catch"](function (error) {
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(error);
  });
}

function addAbilityToAddTodo() {
  var buttonEl = document.querySelector('.add');
  var inputEl = document.querySelector('.to-add');
  buttonEl.addEventListener('click', function (e) {
    e.preventDefault();
    var task = inputEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAddTodo)(task).then(function (todo) {
      inputEl.value = '';
      _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"].todos[todo.id] = todo;
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"],
        add: todo.id
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)('');
    })["catch"](function (err) {
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(err || 'error');
    });
  });
}

function addAbilityToRemoveTodo() {
  var listEl = document.querySelector('.todos');
  listEl.addEventListener('click', function (e) {
    e.preventDefault();

    if (!e.target.classList.contains('todo__delete')) {
      return;
    }

    var id = e.target.dataset.id;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchDeleteTodo)(id) // Below is an alternate path, if we were "trusting" our in-app state to be
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
    .then(populateTodos)["catch"](function (err) {
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(err);
    });
  });
}

function addAbilityToToggleComplete() {
  var listEl = document.querySelector('.todos');
  listEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('todo__toggle')) {
      return;
    }

    var id = e.target.dataset.id;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchUpdateTodo)(id, {
      done: !_stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"].todos[id].done
    }).then(function (todo) {
      _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"].todos[id] = todo;
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: _stateTodos__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)('');
    })["catch"](function (err) {
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(err);
    });
  });
}

function addAbilityToRefresh() {
  var buttonEl = document.querySelector('.refresh');
  buttonEl.addEventListener('click', function () {
    populateTodos();
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map