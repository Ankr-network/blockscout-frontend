import { EEthereumNetworkId } from '@ankr.com/provider';

import { TOpenOceanNetworks, TOpenOceanTokens } from '../types';

export const getChainIdByToken = (
  token: TOpenOceanTokens,
  network?: TOpenOceanNetworks,
): EEthereumNetworkId => {
  switch (token) {
    case 'AVAX':
      return EEthereumNetworkId.avalanche;

    case 'BNB':
      return EEthereumNetworkId.smartchain;

    case 'FTM':
      return EEthereumNetworkId.fantom;

    case 'MATIC':
      return network === 'POLYGON'
        ? EEthereumNetworkId.polygon
        : EEthereumNetworkId.mainnet;

    case 'ETH':
    default:
      return EEthereumNetworkId.mainnet;
  }
};
