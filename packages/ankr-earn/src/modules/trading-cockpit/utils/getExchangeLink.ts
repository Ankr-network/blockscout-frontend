import { AvailableTokens } from '../types';

function getMainTokenName(token?: AvailableTokens): string {
  switch (token) {
    case AvailableTokens.aBNBb:
    case AvailableTokens.BNB:
      return 'BSC';
    case AvailableTokens.AVAX:
    case AvailableTokens.aAVAXb:
      return 'AVAX';
    case AvailableTokens.FTM:
    case AvailableTokens.aFTMb:
      return 'FANTOM';
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
