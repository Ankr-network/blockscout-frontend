export const getJWTToken = () => {
  return localStorage.token;
};

export const setJWTToken = (token: string) => {
  localStorage.token = token;
};

export const setChainId = (id: number) => {
  localStorage.chainId = id;
};

/* saving user login fact for session persisting on next visits */
export const USER_LOGGED_IN_LOCALSTORAGE_KEY = 'hasUserLoggedIn';
export const hasUserLoggedIn = (): boolean => {
  return Boolean(localStorage.getItem(USER_LOGGED_IN_LOCALSTORAGE_KEY));
};
export const setHasUserLoggedIn = (): void => {
  localStorage[USER_LOGGED_IN_LOCALSTORAGE_KEY] = true;
};
