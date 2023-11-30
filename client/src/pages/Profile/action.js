import { GET_USER_BY_USERNAME, SET_USER_BY_USERNAME } from './constants';

export const getUserByUsername = (username, token) => ({
  type: GET_USER_BY_USERNAME,
  username,
  token,
});

export const setUserByUsername = (user, username, token) => ({
  type: SET_USER_BY_USERNAME,
  payload: user,
  username,
  token,
});
