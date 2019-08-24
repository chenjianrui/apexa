import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HISTORY_START:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionTypes.FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      };
    case actionTypes.FETCH_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionTypes.CLEAN_DATA:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
};
