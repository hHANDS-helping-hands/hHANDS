import {
  LOG_IN,
  LOG_OUT,
  SET_TOKEN,
  LOGIN_CREDENTIAL,
  USER_DATA,
} from "../actions/authentication";

import { storeData, Keys } from "../../utilities/AsyncStorage";

const initialState = {
  loggedIn: false,
};
const authentication = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      storeData(Keys.userData, action.data);
      return { ...state, userData: action.data };
    case LOGIN_CREDENTIAL:
      storeData(Keys.loginCredential, action.data);
      return { ...state, loginCredential: action.data };
    case LOG_IN:
      storeData(Keys.loggedIn, true);
      return { ...state, loggedIn: true };
    case LOG_OUT:
      storeData(Keys.loggedIn, false);
      return { ...initialState };
    case SET_TOKEN:
      storeData(Keys.token, action.data);
      return { ...state, token: action.data };
    default:
      return state;
  }
};

export default authentication;
