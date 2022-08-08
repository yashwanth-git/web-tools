import { LOGIN_STATUS, CLIENT, ACTIONS, MESSAGES } from "./constants";

export const initialState = {
  error: "",
  username: "",
  darkTheme: false,
  loginStatus: LOGIN_STATUS.PENDING,
  colors: {},
  savedColors: {},
  isAdmin: false,
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

    case ACTIONS.TOGGLE_MODE:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };

    case ACTIONS.REPLACE_COLORS:
      return {
        ...state,
        colors: action.colorPalettes,
      };

    case ACTIONS.ADD_COLORS:
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.returnedPalette.id]: action.returnedPalette,
        },
      };

    case ACTIONS.ADD_SAVED_COLORS:
      return {
        ...state,
        savedColors: {
          ...state.savedColors,
          [action.savedPalette.id]: action.savedPalette,
        },
      };

    case ACTIONS.GET_SAVED_COLORS:
      return {
        ...state,
        savedColors: action.savedPalettes,
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
