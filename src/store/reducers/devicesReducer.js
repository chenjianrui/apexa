import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  allDeviceList: [],
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DEVICES_START:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionTypes.FETCH_DEVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        allDeviceList: action.payload
      };
    case actionTypes.FETCH_DEVICES_FAIL:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};
