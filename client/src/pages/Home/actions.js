import { GET_ALL_QUIZZES, SET_ALL_QUIZZES } from './constants';

export const getAllQuizzes = () => ({
  type: GET_ALL_QUIZZES,
});

export const setAllQuizzes = (quizzes) => ({
  type: SET_ALL_QUIZZES,
  quizzes,
});
