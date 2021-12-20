import { AvailableTokens } from '../types';

export const getExchangeLink = (
  fromToken: AvailableTokens,
  toToken: AvailableTokens,
): string => {
  return `https://openocean.finance/classic#/ETH/${fromToken.toUpperCase()}/${toToken.toUpperCase()}`;
};
