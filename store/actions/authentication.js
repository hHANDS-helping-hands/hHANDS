export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SET_TOKEN = "SET_TOKEN";
export const LOGIN_CREDENTIAL = "LOGIN_CREDENTIAL";
export const USER_DATA = "USER_DATA";

export const setUserData = (userData) => {
  return {
    type: USER_DATA,
    data: userData,
  };
};

export const setCredential = (username, password) => {
  return {
    type: LOGIN_CREDENTIAL,
    data: { username: username, password: password },
  };
};

export const login = () => {
  return { type: LOG_IN };
};

export const logout = () => {
  return { type: LOG_OUT };
};

export const setToken = (token) => {
  return { type: SET_TOKEN, data: token };
};
