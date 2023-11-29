import { FETCH_QUIZ_BY_ID_REQUEST, FETCH_QUIZ_BY_ID_SUCCESS, FETCH_QUIZ_BY_ID_FAILURE } from './constants'; // Import the new constants

export const fetchQuizRequest = (quizId) => ({
    type: FETCH_QUIZ_BY_ID_REQUEST,
    payload: quizId,
  });
  
  export const fetchQuizSuccess = (quiz) => ({
    type: FETCH_QUIZ_BY_ID_SUCCESS,
    payload: quiz,
  });
  
  export const fetchQuizFailure = (error) => ({
    type: FETCH_QUIZ_BY_ID_FAILURE,
    payload: error,
  });