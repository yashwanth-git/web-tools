import { LOGIN_STATUS, CLIENT, ACTIONS, MESSAGES } from "./constants";

export const initialState = {
  error: "",
  username: "",
  loginStatus: LOGIN_STATUS.PENDING,
  isMessagesPending: false,
  messages: {},
  isUsersPending: false,
  users: {},
  lastAddedMessageId: "",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: "",
        isTodoPending: false,
        todos: {},
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        lastAddedTodoId: "",
        username: "",
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: MESSAGES[action.error] || "ERROR",
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
  }
}

export default reducer;
