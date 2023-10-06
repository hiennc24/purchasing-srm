import {
    GET_USER_PROFILE,
    GET_USER_PROFILE_ERROR,
    GET_USER_PROFILE_SUCCESS,
} from "../constants/HeaderMain";
  
const initialState = {
    loading: false,
    userProfile: {},
    error: null,
};
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE:
            return { ...state, loading: true };
        case GET_USER_PROFILE_SUCCESS:
            return { ...state };
        case GET_USER_PROFILE_ERROR:
            return { ...state };
        default:
            return state;
    }
};
export default reducer;
  