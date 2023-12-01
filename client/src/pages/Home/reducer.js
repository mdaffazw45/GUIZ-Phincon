import { produce } from 'immer';
import { DELETE_QUIZ_SUCCESS, DELETE_USER_SUCCESS, SET_ALL_QUIZZES, SET_ALL_USER } from './constants';

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
      case SET_ALL_USER:
        draft.allUser = action.user;
        break;
      case DELETE_USER_SUCCESS:
        draft.allUser = draft.allUser.filter((aUser) => aUser.id !== action.payload);
        break;
    }
  });

export default homeReducer;
