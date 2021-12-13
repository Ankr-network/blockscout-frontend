import { AvailablePlatforms, AvailableTokens } from './types';

export const ACTIONS_PREFIX = 'tradingCockpit/';
export const AETHB_FAIR_VALUE_RATIO = 1;
export const AMATICB_FAIR_VALUE_RATIO = 1;

export const pairedTokensMap: Record<string, string | string[]> = {
  [AvailableTokens.ETH]: [AvailableTokens.aETHb, AvailableTokens.aETHc],
  [AvailableTokens.aETHb]: AvailableTokens.ETH,
  [AvailableTokens.aETHc]: AvailableTokens.ETH,
  [AvailableTokens.MATIC]: AvailableTokens.aMATICb,
  [AvailableTokens.aMATICb]: AvailableTokens.MATIC,
};

export const platformsByTokenMap: Record<string, string[]> = {
  [AvailableTokens.aETHb]: [
    AvailablePlatforms.Curve,
    AvailablePlatforms.UniswapV2,
  ],
  [AvailableTokens.aETHc]: [
    AvailablePlatforms.SushiSwap,
    AvailablePlatforms.UniswapV2,
  ],
  [AvailableTokens.aMATICb]: [AvailablePlatforms.Curve],
};
