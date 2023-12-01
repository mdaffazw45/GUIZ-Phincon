import { ACTION_SUCCESS, CREATE_QUIZ, RESET_ACTION_SUCCESS } from './contants';

export const createQuiz = (data, token) => ({
  type: CREATE_QUIZ,
  payload: { data, token },
});

export const actionSuccess = (quizId) => ({
  type: ACTION_SUCCESS,
  payload: quizId,
});

export const resetActionSuccess = () => ({
  type: RESET_ACTION_SUCCESS,
});
