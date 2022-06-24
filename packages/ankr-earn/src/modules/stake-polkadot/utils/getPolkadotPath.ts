import { generatePath } from 'react-router';

import { POLKADOT_NETWORK_KEYS } from '../const';
import { EPolkadotNetworks } from '../types';

export interface IGetPolkadotPathData {
  isValid: boolean;
  network: EPolkadotNetworks | null;
  path: string | null;
}

const POLKADOT_NETWORK_LOWER_KEYS = POLKADOT_NETWORK_KEYS.map(network =>
  network.toLowerCase(),
);

export const getPolkadotPath = (
  currNetwork: EPolkadotNetworks | unknown,
  targetPath: string,
): IGetPolkadotPathData => {
  const invalidState = {
    isValid: false,
    network: null,
    path: null,
  };

  if (typeof currNetwork !== 'string') {
    return invalidState;
  }

  const network = currNetwork.toLowerCase();

  if (!POLKADOT_NETWORK_LOWER_KEYS.includes(network)) {
    return invalidState;
  }

  return {
    isValid: true,
    network: network.toUpperCase() as EPolkadotNetworks,
    path: generatePath(targetPath, { network }),
  };
};
