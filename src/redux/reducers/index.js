import { combineReducers } from 'redux';
import login from './login';
// import { player } from './player';

const reducer = combineReducers({
  login,
});

export default reducer;
