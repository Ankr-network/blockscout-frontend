import { Token } from 'modules/common/types/token';

import { TAvaxSyntToken } from '../types';

export function getValidSelectedToken(token?: string | null): TAvaxSyntToken {
  const isValidToken = token === Token.aAVAXb || token === Token.aAVAXc;

  return isValidToken ? (token as TAvaxSyntToken) : Token.aAVAXb;
}
