import { JWT } from '../store/jwtTokenManagerSlice';

export const jwtTokenIntlRoot = 'jwt-token';

export const PRIMARY_TOKEN_INDEX = 0;
export const MINIMAL_TOKENS_LIMIT = 1;

export const renderToken = (token = '') => {
  const tokenLength = token.length;

  return `${token.substring(0, 4)}...${token.substring(
    tokenLength - 5,
    tokenLength,
  )}`;
};

export const renderTokenReview = (token?: string) => {
  return token ? `${token.substring(0, 20)}...` : '';
};

export const getAllowedAddProjectTokenIndex = (
  maxTokensLimit: number,
  decryptedTokens: JWT[],
) => {
  if (maxTokensLimit < MINIMAL_TOKENS_LIMIT) {
    return -1;
  }

  return new Array(maxTokensLimit - 1)
    .fill('')
    .map((_, index) => index + 1)
    .filter(
      index => decryptedTokens.findIndex(item => item.index === index) === -1,
    )
    .sort((a, b) => a - b)[0];
  /** The token index that we can be used to add project is the token index which
   * less than maxTokensLimit but larger than primary token index and not as the same as the exists token index */
};

export const getSortedJwtTokens = (jwtTokens: JWT[]) =>
  jwtTokens.sort((a, b) => a.index - b.index);
