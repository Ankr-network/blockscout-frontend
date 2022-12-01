import { AvailableSwitcherToken, SWITCHER_TOKENS_PAIR } from '../const';

export const getIsTokenValid = (token?: string): boolean => {
  return token
    ? Object.values(SWITCHER_TOKENS_PAIR).includes(
        token as AvailableSwitcherToken,
      )
    : false;
};
