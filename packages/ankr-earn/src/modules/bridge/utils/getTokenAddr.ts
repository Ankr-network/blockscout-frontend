import { configFromEnv } from 'modules/api/config';
import { SupportedChainIDS, ZERO_ADDR } from 'modules/common/const';

import { AvailableBridgeTokens } from '../types';

const config = configFromEnv();

const ethTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.contractConfig.aMaticbToken,
  [AvailableBridgeTokens.aETHb]: config.contractConfig.fethContract,
};

const bscTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.binanceConfig.aMATICbToken,
  [AvailableBridgeTokens.aETHb]: config.binanceConfig.aETHbToken,
};

const polygonTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.polygonConfig.aMATICbToken,
  [AvailableBridgeTokens.aETHb]: ZERO_ADDR,
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
