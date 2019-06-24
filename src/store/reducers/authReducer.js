import * as actionTypes from '../actions/actionTypes';
const initialState = {
  token: null,
  loading: false,
  loginError: false,
  userData: {},
  forgotState: null,
  forgotError: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_START:
      return {
        ...state,
        loading: true,
        loginError: false
      };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        loginError: false,
        userData: action.payload.userData
      };
    case actionTypes.AUTH_LOGIN_FAIL:
      return {
        ...state,
        token: null,
        loading: false,
        loginError: true
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        loginError: false,
        userData: {}
      };
    case actionTypes.AUTH_FORGOT_START:
      return {
        ...state,
        loading: true,
        forgotError: false
      };
    case actionTypes.AUTH_FORGOT_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotError: false,
        forgotState: action.payload
      };
    case actionTypes.AUTH_FORGOT_FAIL:
      return {
        ...state,
        loading: false,
        forgotError: true
      };
    default:
      return state;
  }
};
