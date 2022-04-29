import { EPolkadotNetworkId } from 'provider';

import { EPolkadotNetworks } from '../types';

export const getPolkadotStakingNetworks = (
  currNetwork: EPolkadotNetworks | unknown,
): EPolkadotNetworkId[] | null => {
  switch (currNetwork) {
    case EPolkadotNetworks.DOT:
      return [EPolkadotNetworkId.polkadot];

    case EPolkadotNetworks.KSM:
      return [EPolkadotNetworkId.kusama];

    case EPolkadotNetworks.WND:
      return [EPolkadotNetworkId.westend];

    default:
      return null;
  }
};
