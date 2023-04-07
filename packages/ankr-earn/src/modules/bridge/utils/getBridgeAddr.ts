import { configFromEnv } from 'modules/api/config';
import { SupportedChainIDS } from 'modules/common/const';

const {
  contractConfig,
  binanceConfig,
  polygonConfig,
  fantomConfig,
  avalancheConfig,
} = configFromEnv();

export const getBridgeAddr = (networkId: SupportedChainIDS): string => {
  switch (networkId) {
    case SupportedChainIDS.BSC:
    case SupportedChainIDS.BSC_TESTNET:
      return binanceConfig.bridge;

    case SupportedChainIDS.POLYGON_MUMBAI_TESTNET:
    case SupportedChainIDS.POLYGON:
      return polygonConfig.bridge;

    case SupportedChainIDS.FANTOM_OPERA:
    case SupportedChainIDS.FANTOM_TESTNET:
      return fantomConfig.bridge;

    case SupportedChainIDS.AVAX:
    case SupportedChainIDS.AVAX_TESTNET:
      return avalancheConfig.bridge;

    default:
      return contractConfig.bridge;
  }
};
