import { LOGIN, SAVE_SCORE } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  score: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: Number(payload.score) + Number(state.score),
      assertions: payload.assertions + state.assertions,
    };
  default:
    return state;
  }
};

export default player;
