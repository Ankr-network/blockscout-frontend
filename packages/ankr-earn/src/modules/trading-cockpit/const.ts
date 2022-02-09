import { BlockchainNetworkId } from 'modules/common/types';
import { AvailablePlatforms, AvailableTokens } from './types';

export const ACTIONS_PREFIX = 'tradingCockpit/';
export const BOND_TOKENS_RATIO = 1;

export const pairedTokensMap: Record<string, string | string[]> = {
  [AvailableTokens.ETH]: [AvailableTokens.aETHb, AvailableTokens.aETHc],
  [AvailableTokens.aETHb]: AvailableTokens.ETH,
  [AvailableTokens.aETHc]: AvailableTokens.ETH,
  [AvailableTokens.MATIC]: AvailableTokens.aMATICb,
  [AvailableTokens.aMATICb]: AvailableTokens.MATIC,
  [AvailableTokens.AVAX]: AvailableTokens.aAVAXb,
  [AvailableTokens.aAVAXb]: AvailableTokens.AVAX,
};

export const platformsByTokenMap: Record<string, string[]> = {
  [AvailableTokens.aETHb]: [
    AvailablePlatforms.Curve,
    AvailablePlatforms.UniswapV2,
    AvailablePlatforms.OpenOceanV2,
  ],
  [AvailableTokens.aETHc]: [
    AvailablePlatforms.Curve,
    AvailablePlatforms.SushiSwap,
    AvailablePlatforms.UniswapV2,
    AvailablePlatforms.UniswapV3,
    AvailablePlatforms.OpenOceanV2,
  ],
  [AvailableTokens.aMATICb]: [
    AvailablePlatforms.Curve,
    AvailablePlatforms.OpenOceanV2,
  ],
  [AvailableTokens.aAVAXb]: [
    AvailablePlatforms.Lydia,
    AvailablePlatforms.TraderJoe,
    AvailablePlatforms.Pangolin,
    AvailablePlatforms.OpenOceanV2,
  ],
};

export const chainIdByTokenMap = {
  [AvailableTokens.AVAX]: BlockchainNetworkId.avalanche,
  [AvailableTokens.aAVAXb]: BlockchainNetworkId.avalanche,
  [AvailableTokens.ETH]: BlockchainNetworkId.mainnet,
  [AvailableTokens.aETHb]: BlockchainNetworkId.mainnet,
  [AvailableTokens.aETHc]: BlockchainNetworkId.mainnet,
  [AvailableTokens.MATIC]: BlockchainNetworkId.mainnet,
  [AvailableTokens.aMATICb]: BlockchainNetworkId.mainnet,
  [AvailableTokens.BNB]: BlockchainNetworkId.smartchain,
  [AvailableTokens.aBNBb]: BlockchainNetworkId.smartchain,
};
