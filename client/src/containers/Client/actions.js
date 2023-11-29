import {
  DELETE_USER,
  DELETE_USER_SUCCESS,
  GET_USER,
  GET_USER_BY_ID,
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_REQUEST,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER,
  SET_USER_BY_ID,
} from '@containers/Client/constants';

export const setLogin = (login, role) => ({
  type: SET_LOGIN,
  login,
  role,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

export const logout = () => ({
  type: LOGOUT,
});

// REGISTER
export const registerRequest = (data) => ({
  type: REGISTER_REQUEST,
  payload: data,
});

export const registerSuccess = () => ({
  type: REGISTER_REQUEST,
});

// USER
export const getUser = () => ({
  type: GET_USER,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const getUserById = (token) => ({
  type: GET_USER_BY_ID,
  token,
});

export const setUserById = (user, token) => ({
  type: SET_USER_BY_ID,
  payload: user,
  token,
});

export const deleteUserById = (userId, token) => ({
  type: DELETE_USER,
  payload: { userId, token },
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId,
});
