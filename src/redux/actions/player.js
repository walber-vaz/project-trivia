import emailHash from '../../utils/emailHash';
import fetchApi from '../../utils/fetchApi';
import { LOGIN, SAVE_SCORE } from './actionTypes';

export const usedLogin = (name, email) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

export const savedScore = (score, assertions) => ({
  type: SAVE_SCORE,
  payload: {
    score,
    assertions,
  },
});

export const fetchLogin = (name, email, push) => {
  const hashEmailImg = `https://www.gravatar.com/avatar/${emailHash(email)}`;
  return async (dispatch) => {
    const response = await fetchApi('https://opentdb.com/api_token.php?command=request');
    localStorage.setItem('token', response.token ?? '');
    dispatch(usedLogin(name, hashEmailImg));
    push('/game');
  };
};
