import { CREATE_QUIZ } from './contants';

export const createQuiz = (data, token) => ({
  type: CREATE_QUIZ,
  payload: { data, token },
});
