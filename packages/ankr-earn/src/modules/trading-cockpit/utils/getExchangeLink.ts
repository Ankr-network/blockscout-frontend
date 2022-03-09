import { AvailableTokens } from '../types';

function getMainTokenName(token?: AvailableTokens): string {
  switch (token) {
    case AvailableTokens.AVAX:
    case AvailableTokens.aAVAXb:
      return 'AVAX';
    default:
      return 'ETH';
  }
}

export function getExchangeLink(
  fromToken: AvailableTokens,
  toToken: AvailableTokens,
): string {
  const mainTokenName = getMainTokenName(fromToken);
  return `https://openocean.finance/classic#/${mainTokenName}/${fromToken.toUpperCase()}/${toToken.toUpperCase()}`;
}
