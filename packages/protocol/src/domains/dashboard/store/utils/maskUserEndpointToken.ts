const DIGITS = 5;
const MASK_CHAR = '*';

export const maskUserEndpointToken = (token = '') =>
  token.split(token.slice(DIGITS, -DIGITS)).join(MASK_CHAR.repeat(DIGITS));
