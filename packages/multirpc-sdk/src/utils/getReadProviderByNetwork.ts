import { AvailableReadProviders } from '@ankr.com/provider';

import { EBlockchain } from '../common';

export const getReadProviderByNetwork = (
  network: EBlockchain,
): AvailableReadProviders => {
  switch (network) {
    case EBlockchain.eth:
      return AvailableReadProviders.ethMainnet;
    case EBlockchain.eth_holesky:
      return AvailableReadProviders.ethHolesky;
    case EBlockchain.bsc:
      return AvailableReadProviders.binanceChain;
    case EBlockchain.bsc_testnet_chapel:
      return AvailableReadProviders.binanceChainTest;
    case EBlockchain.polygon:
      return AvailableReadProviders.polygon;
    case EBlockchain.polygon_mumbai:
      return AvailableReadProviders.mumbai;
    case EBlockchain.polygon_zkevm:
      return AvailableReadProviders.polygonZkEVM;
    case EBlockchain.arbitrum:
      return AvailableReadProviders.arbitrum;
    case EBlockchain.arbitrum_sepolia:
      return AvailableReadProviders.arbitrumSepoliaTestnet;
    case EBlockchain.optimism:
      return AvailableReadProviders.optimism;
    case EBlockchain.optimism_testnet:
      return AvailableReadProviders.optimismTestnet;
    case EBlockchain.avalanche:
      return AvailableReadProviders.avalancheChain;
    case EBlockchain.avalanche_fuji:
      return AvailableReadProviders.avalancheChainTest;
    case EBlockchain.fantom_testnet:
      return AvailableReadProviders.ftmTestnet;
    case EBlockchain.fantom:
      return AvailableReadProviders.ftmOpera;
    case EBlockchain.flare:
      return AvailableReadProviders.flare;
    case EBlockchain.gnosis:
      return AvailableReadProviders.gnosis;
    case EBlockchain.rollux:
      return AvailableReadProviders.rollux;
    case EBlockchain.base:
      return AvailableReadProviders.base;
    case EBlockchain.syscoin:
      return AvailableReadProviders.syscoin;
    case EBlockchain.scroll:
      return AvailableReadProviders.scroll;
    case EBlockchain.linea:
      return AvailableReadProviders.linea;
    default:
      throw new Error('Unsupported network');
  }
};
