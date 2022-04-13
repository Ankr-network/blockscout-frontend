import { TEthToken } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';

export function getValidSelectedToken(token?: string | null): TEthToken {
  const isValidToken = token === Token.aETHb || token === Token.aETHc;

  return isValidToken ? (token as TEthToken) : Token.aETHb;
}
