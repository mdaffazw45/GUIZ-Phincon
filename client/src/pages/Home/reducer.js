import { produce } from 'immer';
import { DELETE_QUIZ_SUCCESS, RESET_DELETE_SUCCESS, SET_ALL_QUIZZES } from './constants';

export const initialState = {
  quizzes: [],
  deleteSuccess: false,
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_QUIZZES:
        draft.quizzes = action.quizzes;
        break;
      case DELETE_QUIZ_SUCCESS:
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_SUCCESS:
        draft.deleteSuccess = false;
        break;
    }
  });

export default homeReducer;
