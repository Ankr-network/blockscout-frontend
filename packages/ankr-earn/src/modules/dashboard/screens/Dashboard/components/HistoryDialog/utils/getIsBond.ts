import { Token } from 'modules/common/types/token';

/**
 * Returns true if token is bond
 *
 * @param {Token} token - Token to check
 * @return {boolean}
 */
export const getIsBondByToken = (token: Token): boolean => {
  return token.endsWith('b');
};
