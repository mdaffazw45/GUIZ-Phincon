import { EDIT_QUIZ_BY_ID } from './constants';

export const editQuizById = (quizId, data, token) => ({
  type: EDIT_QUIZ_BY_ID,
  payload: { quizId, data, token },
});
