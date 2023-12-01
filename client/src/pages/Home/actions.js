import {
  DELETE_QUIZ,
  DELETE_QUIZ_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  GET_ALL_QUIZZES,
  GET_ALL_USER,
  SET_ALL_QUIZZES,
  SET_ALL_USER,
} from './constants';

export const getAllQuizzes = () => ({
  type: GET_ALL_QUIZZES,
});

export const setAllQuizzes = (quizzes) => ({
  type: SET_ALL_QUIZZES,
  quizzes,
});

export const deleteQuizById = (quizId, token) => ({
  type: DELETE_QUIZ,
  payload: { quizId, token },
});

export const deleteQuizSuccess = (quizId) => ({
  type: DELETE_QUIZ_SUCCESS,
  payload: quizId,
});

// USER
export const getUser = () => ({
  type: GET_ALL_USER,
});

export const setUser = (user) => ({
  type: SET_ALL_USER,
  user,
});

export const deleteUserById = (userId, token) => ({
  type: DELETE_USER,
  payload: { userId, token },
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId,
});
