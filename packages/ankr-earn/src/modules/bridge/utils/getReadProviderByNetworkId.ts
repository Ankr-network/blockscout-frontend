import { AvailableReadProviders } from '@ankr.com/provider';

import { SupportedChainIDS } from 'modules/common/const';

export const getReadProviderByNetworkId = (
  chainId: number,
): AvailableReadProviders => {
  switch (chainId) {
    case SupportedChainIDS.MAINNET:
      return AvailableReadProviders.ethMainnet;
    case SupportedChainIDS.GOERLI:
      return AvailableReadProviders.ethGoerli;
    case SupportedChainIDS.BSC:
      return AvailableReadProviders.binanceChain;
    case SupportedChainIDS.BSC_TESTNET:
      return AvailableReadProviders.binanceChainTest;
    case SupportedChainIDS.POLYGON:
      return AvailableReadProviders.polygon;
    case SupportedChainIDS.POLYGON_MUMBAI_TESTNET:
      return AvailableReadProviders.mumbai;
    case SupportedChainIDS.AVAX:
      return AvailableReadProviders.avalancheChain;
    case SupportedChainIDS.AVAX_TESTNET:
      return AvailableReadProviders.avalancheChainTest;
    case SupportedChainIDS.FANTOM_OPERA:
      return AvailableReadProviders.ftmOpera;
    case SupportedChainIDS.FANTOM_TESTNET:
      return AvailableReadProviders.ftmTestnet;
    default:
      throw new Error('Unsupported network');
  }
};