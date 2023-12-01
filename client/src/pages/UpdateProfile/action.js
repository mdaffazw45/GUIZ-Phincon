import { UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS } from './constants';

export const updateProfile = (data, token, cbSucces) => ({
  type: UPDATE_PROFILE,
  payload: { data, token, cbSucces },
});

export const updateProfileSuccess = (updatedData) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updatedData,
});
