import { LOGIN_STATUS, CLIENT, ACTIONS, MESSAGES } from "./constants";

export const initialState = {
  error: "",
  username: "",
  loginStatus: LOGIN_STATUS.PENDING,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: "",
        username: action.username,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
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
