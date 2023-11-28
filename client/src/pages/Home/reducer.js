import { produce } from 'immer';
import { SET_ALL_QUIZZES } from './constants';

export const initialState = {
  quizzes: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_QUIZZES:
        draft.quizzes = action.quizzes;
        break;
    }
  });

export default homeReducer;
