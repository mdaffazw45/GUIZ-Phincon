import { DELETE_QUIZ, DELETE_QUIZ_SUCCESS, GET_ALL_QUIZZES, SET_ALL_QUIZZES } from './constants';

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
