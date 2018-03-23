import { combineReducers } from 'redux';

import auth from './auth';
import min from './min';

export default combineReducers({
  auth,
  min
});
