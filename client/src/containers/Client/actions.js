import { LOGIN_REQUEST, LOGOUT, REGISTER_REQUEST, SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';

export const setLogin = (login, role) => ({
  type: SET_LOGIN,
  login,
  role,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const loginRequest = (user) => ({
  type: LOGIN_REQUEST,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

// REGISTER
export const registerRequest = (user) => ({
  type: REGISTER_REQUEST,
  payload: user,
});

export const registerSuccess = () => ({
  type: REGISTER_REQUEST,
});
