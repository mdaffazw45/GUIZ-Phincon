import { FINISH_QUIZ, GET_QUIZ_BY_ID, SET_QUIZ_BY_ID } from './constants';

export const getQuizById = (quizId) => ({
  type: GET_QUIZ_BY_ID,
  quizId,
});

export const setQuizById = (quiz, quizId) => ({
  type: SET_QUIZ_BY_ID,
  quiz,
  quizId,
});

export const finishQuizAction = (quizId, data, token) => ({
  type: FINISH_QUIZ,
  payload: { quizId, data, token },
});
