import { AUTH_STATE_KEY, LOGIN_STATE_KEY } from './connect';

export const clearAuthData = async () => {
  localStorage.removeItem(LOGIN_STATE_KEY);
  localStorage.removeItem(AUTH_STATE_KEY);
};
