import { configFromEnv } from 'modules/api/config';
import { SupportedChainIDS } from 'modules/common/const';

import { AvailableBridgeTokens } from '../types';

const config = configFromEnv();

const ethTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.contractConfig.aMaticbToken,
};

const bscTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.binanceConfig.aMATICbToken,
};

const polygonTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.polygonConfig.aMATICbToken,
};

export const getTokenAddr = (
  token: AvailableBridgeTokens,
  networkId: SupportedChainIDS,
): string => {
  switch (networkId) {
    case SupportedChainIDS.BSC:
    case SupportedChainIDS.BSC_TESTNET:
      return bscTokenAddressesMap[token];

    case SupportedChainIDS.POLYGON:
      return polygonTokenAddressesMap[token];

    default:
      return ethTokenAddressesMap[token];
  }
};
