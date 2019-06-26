import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchDevicesStart = () => {
  return {
    type: actionTypes.FETCH_DEVICES_START
  };
};

export const fetchDevices = () => dispatch => {
  dispatch(fetchDevicesStart());
  const token = localStorage.getItem('token') || null;
  const axiosInstance = axios.create({
    baseURL: 'https://api.mjairql.com/api/v1/',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  axiosInstance
    .get('getAllDeviceInfo')
    .then(response => {
      console.log(response.data.allDeviceList);
      dispatch({
        type: actionTypes.FETCH_DEVICES_SUCCESS,
        payload: response.data.allDeviceList
      });
    })
    .catch(error => {
      dispatch({ type: actionTypes.FETCH_DEVICES_FAIL });
    });
};
