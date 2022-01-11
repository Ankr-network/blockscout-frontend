import { AvailableTokens } from '../types';

export const getExchangeLink = (
  fromToken: AvailableTokens,
  toToken: AvailableTokens,
): string => {
  const mainTokenName = getMainTokenName(fromToken);
  return `https://openocean.finance/classic#/${mainTokenName}/${fromToken.toUpperCase()}/${toToken.toUpperCase()}`;
};

const getMainTokenName = (token?: AvailableTokens) => {
  switch (token) {
    case AvailableTokens.AVAX:
    case AvailableTokens.aAVAXb:
      return 'AVAX';
    default:
      return 'ETH';
  }
};
