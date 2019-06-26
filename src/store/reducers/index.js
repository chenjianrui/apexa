import authReducer from './authReducer';
import devicesReduce from './devicesReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  devices: devicesReduce
});
