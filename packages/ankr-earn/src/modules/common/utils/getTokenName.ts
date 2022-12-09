import { t } from '@ankr.com/common';

export const getTokenName = (token = 'eth'): string => {
  const tokenName = t(`unit.${token.toLowerCase()}`);
  const isValidUnit = !tokenName.includes('unit.');

  if (isValidUnit) {
    return tokenName;
  }

  return token;
};
