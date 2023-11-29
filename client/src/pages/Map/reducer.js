import { produce } from 'immer';
import { SET_QUIZ_BY_ID } from './constants';

export const initialState = {
  quiz: {},
};

export const storedKey = [];

const quizReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_QUIZ_BY_ID:
        draft.quiz = action.quiz;
        break;
    }
  });

export default quizReducer;
