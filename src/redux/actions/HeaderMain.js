import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS,
} from "../constants/HeaderMain";

// eslint-disable-next-line no-unused-vars
const path = "components/Header/";

export const getUserProfile = () => {
  return {
    type: GET_USER_PROFILE,
  };
};

export const getUserProfileSuccess = (data) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: data,
});

export const getUserProfileError = (error) => ({
  type: GET_USER_PROFILE_ERROR,
  payload: error,
});
