export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};

export const SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  REQUIRED_USERNAME: "required-username",
  REQUIRED_COLORS: "required-colors",
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
  UNKNOWN_ACTION: "unknownAction",
};

export const PAGES = {
  HOME: "home",
  CREATE: "create",
  SAVED: "saved",
  ABOUT: "about",
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    "Trouble connecting to the network.  Please try again",
  [SERVER.AUTH_INSUFFICIENT]:
    "Your username/password combination does not match any records, please try again.",
  [SERVER.REQUIRED_USERNAME]:
    "Please enter a valid (letters and/or numbers) username",
  [SERVER.REQUIRED_COLORS]: "Please enter the colors to add",
  default: "Something went wrong.  Please try again",
};

export const ACTIONS = {
  ADMIN_LOGIN: "adminLogin",
  LOG_IN: "logIn",
  LOG_OUT: "logOut",
  REPORT_ERROR: "reportError",
  ADD_COLORS: "addColors",
  REPLACE_COLORS: "replaceColors",
  ADD_SAVED_COLORS: "addSavedColors",
  TOGGLE_MODE: "toggleMode",
};
