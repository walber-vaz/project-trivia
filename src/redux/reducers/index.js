import { combineReducers } from 'redux';
import loginReducer from './login';
// import { player } from './player';

const reducer = combineReducers({
  loginReducer,
});

export default reducer;
