import { Token } from 'modules/common/types/token';

import { TEthSyntToken } from '../types';

export function getValidSelectedToken(token?: string | null): TEthSyntToken {
  const isValidToken = token === Token.aETHb || token === Token.aETHc;

  return isValidToken ? (token as TEthSyntToken) : Token.aETHb;
}
