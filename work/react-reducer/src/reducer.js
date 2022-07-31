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
        username: action.username,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: "",
      };

    case ACTIONS.START_LOADING_USERS:
      return {
        ...state,
        error: "",
        isUsersPending: true,
      };

    case ACTIONS.UPDATE_USERS:
      return {
        ...state,
        error: "",
        isUsersPending: false,
        users: action.usersList,
      };

    case ACTIONS.START_LOADING_MESSAGES:
      return {
        ...state,
        error: "",
        isMessagesPending: true,
      };

    case ACTIONS.LOAD_MESSAGES:
      return {
        ...state,
        error: "",
        isMessagesPending: false,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        messages: action.messagesList,
      };

    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        error: "",
        messages: {
          ...state.messages,
          [action.newMessage.id]: action.newMessage,
        },
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
