import { configFromEnv } from 'modules/api/config';
import { SupportedChainIDS } from 'modules/common/const';

const { contractConfig, binanceConfig, polygonConfig } = configFromEnv();

export const getBridgeAddr = (networkId: SupportedChainIDS): string => {
  switch (networkId) {
    case SupportedChainIDS.BSC:
    case SupportedChainIDS.BSC_TESTNET:
      return binanceConfig.bridge;

    case SupportedChainIDS.POLYGON:
      return polygonConfig.bridge;

    default:
      return contractConfig.bridge;
  }
};
