import { Token } from 'modules/common/types/token';

import { TFtmSyntToken } from '../types/TFtmSyntToken';

export function getValidSelectedToken(token?: string | null): TFtmSyntToken {
  const isValidToken = token === Token.aFTMb || token === Token.aFTMc;

  return isValidToken ? (token as TFtmSyntToken) : Token.aFTMb;
}
