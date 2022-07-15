import { AUTH_STATE_KEY } from './connect';

export const clearAuthData = async () => {
  localStorage.removeItem(AUTH_STATE_KEY);
};
