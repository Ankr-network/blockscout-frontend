import { BlockchainNetworkId } from 'provider';

import { EPolkadotNetworks } from '../types';

export const getPolkadotStakingNetworks = (
  currNetwork: EPolkadotNetworks | unknown,
): BlockchainNetworkId[] | null => {
  switch (currNetwork) {
    case EPolkadotNetworks.DOT:
      return [BlockchainNetworkId.polkadot];

    case EPolkadotNetworks.KSM:
      return [BlockchainNetworkId.kusama];

    case EPolkadotNetworks.WND:
      return [BlockchainNetworkId.westend];

    default:
      return null;
  }
};
