import { produce } from 'immer';
import { DELETE_QUIZ_SUCCESS, SET_ALL_QUIZZES, SET_USER } from './constants';

export const initialState = {
  quizzes: [],
  allUser: [],
};

export const storedKey = ['allUser'];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_QUIZZES:
        draft.quizzes = action.quizzes;
        break;
      case DELETE_QUIZ_SUCCESS:
        draft.quizzes = draft.quizzes.filter((quiz) => quiz.id !== action.payload);
        break;
      case SET_USER:
        draft.allUser = action.user;
        break;
    }
  });

export default homeReducer;
