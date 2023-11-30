import { UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS } from './constants';

export const updateProfile = (data, token) => ({
  type: UPDATE_PROFILE,
  payload: { data, token },
});

export const updateProfileSuccess = (updatedData) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updatedData,
});
