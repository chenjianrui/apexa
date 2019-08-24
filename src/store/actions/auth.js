import * as actionTypes from './actionTypes';
import axios from 'axios';

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const login = (email, password) => dispatch => {
  dispatch(loginStart());
  const data = {
    email,
    password
  };
  axios
    .post('https://api.mjairql.com/api/v2/login', data)
    .then(response => {
      localStorage.setItem('token', response.data.success.token);
      localStorage.setItem(
        'userData',
        JSON.stringify(response.data.success.userData)
      );
      dispatch({
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        payload: response.data.success
      });
    })
    .catch(error => {
      dispatch({ type: actionTypes.AUTH_LOGIN_FAIL });
    });
};

export const loginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START
  };
};

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const userData = JSON.parse(localStorage.getItem('userData'));
    dispatch({ type: actionTypes.AUTH_LOGIN_SUCCESS, payload: userData });
  }
};

export const forgotStart = () => {
  return {
    type: actionTypes.AUTH_FORGOT_START
  };
};

export const fetchForgot = email => dispatch => {
  dispatch(forgotStart());
  axios
    .post('https://api.mjairql.com/api/v2/forgotPassword', {
      email
    })
    .then(response => {
      dispatch({
        type: actionTypes.AUTH_FORGOT_SUCCESS,
        payload: response.data.success
      });
    })
    .catch(error => dispatch({ type: actionTypes.AUTH_FORGOT_FAIL }));
};
