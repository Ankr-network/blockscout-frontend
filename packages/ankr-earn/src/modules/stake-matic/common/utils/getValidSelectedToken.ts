import { Token } from 'modules/common/types/token';

import { TMaticSyntToken } from '../types';

export function getValidSelectedToken(token?: string | null): TMaticSyntToken {
  const isValidToken = token === Token.aMATICb || token === Token.aMATICc;

  return isValidToken ? (token as TMaticSyntToken) : Token.aMATICb;
}
