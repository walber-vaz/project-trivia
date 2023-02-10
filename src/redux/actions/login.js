import emailHash from '../../utils/emailHash';
import fetchApi from '../../utils/fetchApi';
import { LOGIN } from './actionTypes';

export const login = (name, email, img) => ({
  type: LOGIN,
  payload: {
    name,
    email,
    img,
  },
});

export const fetchLogin = (name, email) => {
  const hashEmailImg = `https://www.gravatar.com/avatar/${emailHash(email)}`;
  return async (dispatch) => {
    const response = await fetchApi('https://opentdb.com/api_token.php?command=request');
    localStorage.setItem('token', response.token ?? '');
    dispatch(login(name, email, hashEmailImg));
  };
};
