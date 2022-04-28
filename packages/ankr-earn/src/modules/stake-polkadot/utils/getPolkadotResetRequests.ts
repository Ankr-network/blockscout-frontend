import { POLKADOT_NETWORK_KEYS } from '../const';
import { EPolkadotNetworks } from '../types';

import { getPolkadotRequestKey } from './getPolkadotRequestKey';

type TResetRequestsData = IResetRequestsItem[];

interface IResetRequestsItem {
  requestKey: string;
  requestType: string;
}

export const getPolkadotResetRequests = (
  resetRequestTypes: string[],
): TResetRequestsData => {
  const resetRequests: TResetRequestsData = [];

  for (
    let i = 0, network: EPolkadotNetworks;
    i < POLKADOT_NETWORK_KEYS.length;
    i += 1
  ) {
    network = POLKADOT_NETWORK_KEYS[i] as EPolkadotNetworks;

    for (let j = 0, requestType: string; j < resetRequestTypes.length; j += 1) {
      requestType = resetRequestTypes[j];

      resetRequests.push({
        requestKey: getPolkadotRequestKey(network),
        requestType,
      });
    }
  }

  return resetRequests;
};
