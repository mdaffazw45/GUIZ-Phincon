import { DELETE_QUIZ, DELETE_QUIZ_SUCCESS, GET_ALL_QUIZZES, GET_USER, SET_ALL_QUIZZES, SET_USER } from './constants';

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
  type: GET_USER,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});
