import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectedQuizState = (state) => state.quiz || initialState;

export const selectorQuizById = createSelector(
    selectedQuizState,
    (state) => state.quiz // Assuming you store the aircraft by ID data in your Redux state
);

export const selectorQuizLoading = createSelector(
    selectedQuizState,
    (state) => state.loading
);
  
  export const selectorQuizError = createSelector(
    selectedQuizState,
    (state) => state.error
);