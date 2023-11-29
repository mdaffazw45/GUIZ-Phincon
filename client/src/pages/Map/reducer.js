// reducer.js
import { FETCH_QUIZ_BY_ID_REQUEST, FETCH_QUIZ_BY_ID_SUCCESS, FETCH_QUIZ_BY_ID_FAILURE} from './constants';

export const initialState = {
  quiz: {},
  loading: false,
  error: null,
};

export const storedKey = []

const quizMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZ_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_QUIZ_BY_ID_SUCCESS:
    console.log(action , 'Hasil Action')
      return {
        ...state,
        loading: false,
        quiz: action.payload,
      };
    case FETCH_QUIZ_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        quiz: {},
      };
    default:
      return state;
  }
};

export default quizMapReducer;
