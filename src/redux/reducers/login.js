import { LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  img: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      img: action.payload.img,
    };
  default:
    return state;
  }
};

export default loginReducer;
