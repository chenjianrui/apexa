import * as actionTypes from '../actions/actionTypes';
const initialState = {
  token: null,
  loading: false,
  error: false,
  userData: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        error: false,
        userData: action.payload.userData
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        token: null,
        loading: false,
        error: true
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        error: false,
        userData: {}
      };
    default:
      return state;
  }
};
