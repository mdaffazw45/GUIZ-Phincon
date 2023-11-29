import { EDIT_QUIZ_BY_ID, GET_QUIZ_BY_ID, SET_QUIZ_BY_ID } from './constants';

export const getQuizById = (quizId) => ({
  type: GET_QUIZ_BY_ID,
  quizId,
});

export const setQuizById = (quiz, quizId) => ({
  type: SET_QUIZ_BY_ID,
  quiz,
  quizId,
});

export const editQuizById = (quizId, data, token) => ({
  type: EDIT_QUIZ_BY_ID,
  payload: { quizId, data, token },
});
