import { Token } from 'modules/common/types/token';

import { TBnbSyntToken } from '../types';

export function getValidSelectedToken(token?: string | null): TBnbSyntToken {
  const isValidToken = token === Token.aBNBb || token === Token.aBNBc;

  return isValidToken ? (token as TBnbSyntToken) : Token.aBNBb;
}
