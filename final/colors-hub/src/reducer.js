import { LOGIN_STATUS, CLIENT, ACTIONS, MESSAGES } from "./constants";

export const initialState = {
  error: "",
  username: "",
  darkTheme: false,
  loginStatus: LOGIN_STATUS.PENDING,
  isColorsPending: false,
  colors: {},
  savedColors: {},
  userColors: {},
  currentPage: 1,
  nextPage: 1,
  lastPage: 1,
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
    
    case ACTIONS.COLORS_PENDING:
      return{
        ...state,
        isColorsPending: true,
      }

    case ACTIONS.REPLACE_COLORS:
      return {
        ...state,
        isColorsPending: false,
        colors: action.colorPalettes,
      };

    case ACTIONS.GET_USER_COLORS:
      return {
        ...state,
        userColors: action.userPalettes,
      };

    case ACTIONS.PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
        nextPage: action.next,
        lastPage: action.lastPage,
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
        savedColors: action.savedPalette,
      };

    case ACTIONS.GET_SAVED_COLORS:
      return {
        ...state,
        savedColors: action.savedPalettes,
      };

    case ACTIONS.REMOVE_SAVED_COLOR:
      const savedColorsCopy = { ...state.savedColors };
      delete savedColorsCopy[action.removedPalettedId];
      return {
        ...state,
        savedColors: savedColorsCopy,
      };

    case ACTIONS.REMOVE_USER_COLOR:
      const userColorCopy = { ...state.userColors };
      delete userColorCopy[action.re];
      return {
        ...state,
        userColors: userColorCopy,
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
