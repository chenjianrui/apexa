import authReducer from './authReducer';
import devicesReducer from './devicesReducer';
import historyReducer from './historyReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  devices: devicesReducer,
  history: historyReducer
});
