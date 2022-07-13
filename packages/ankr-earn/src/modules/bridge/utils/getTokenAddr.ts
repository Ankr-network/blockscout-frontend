import { configFromEnv } from 'modules/api/config';
import { SupportedChainIDS, ZERO_ADDR } from 'modules/common/const';

import { AvailableBridgeTokens } from '../types';

const config = configFromEnv();

const ethTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.contractConfig.aMaticbToken,
  [AvailableBridgeTokens.aMATICc]: config.contractConfig.aMaticCToken,
  [AvailableBridgeTokens.aETHb]: config.contractConfig.fethContract,
  [AvailableBridgeTokens.aETHc]: config.contractConfig.aethContract,
};

const bscTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.binanceConfig.aMATICbToken,
  [AvailableBridgeTokens.aMATICc]: config.binanceConfig.aMATICcToken,
  [AvailableBridgeTokens.aETHb]: config.binanceConfig.aETHbToken,
  [AvailableBridgeTokens.aETHc]: config.binanceConfig.aETHcToken,
};

const polygonTokenAddressesMap = {
  [AvailableBridgeTokens.aMATICb]: config.polygonConfig.aMATICbToken,
  [AvailableBridgeTokens.aMATICc]: config.polygonConfig.aMATICcToken,
  [AvailableBridgeTokens.aETHb]: ZERO_ADDR,
  [AvailableBridgeTokens.aETHc]: ZERO_ADDR,
};

export const getTokenAddr = (
  token: AvailableBridgeTokens,
  networkId: SupportedChainIDS,
): string => {
  switch (networkId) {
    case SupportedChainIDS.BSC:
    case SupportedChainIDS.BSC_TESTNET:
      return bscTokenAddressesMap[token];

    case SupportedChainIDS.POLYGON_MUMBAI_TESTNET:
    case SupportedChainIDS.POLYGON:
      return polygonTokenAddressesMap[token];

    default:
      return ethTokenAddressesMap[token];
  }
};
