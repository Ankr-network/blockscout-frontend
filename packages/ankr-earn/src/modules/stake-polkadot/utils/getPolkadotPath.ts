import { generatePath } from 'react-router';

import { RoutesConfig } from 'modules/dashboard/Routes';

import { POLKADOT_NETWORK_KEYS } from '../const';
import { EPolkadotNetworks } from '../types';

export interface IGetPolkadotPathData {
  isValid: boolean;
  network: EPolkadotNetworks | null;
  path: string;
}

export const INVALID_DEFAULT_PATH = RoutesConfig.dashboard.generatePath();

export const getPolkadotPath = (
  currNetwork: EPolkadotNetworks | unknown,
  targetPath: string,
): IGetPolkadotPathData => {
  const invalidState = {
    isValid: false,
    network: null,
    path: INVALID_DEFAULT_PATH,
  };

  if (typeof currNetwork !== 'string') {
    return invalidState;
  }

  const network = currNetwork.toLowerCase();

  if (!POLKADOT_NETWORK_KEYS.includes(network)) {
    return invalidState;
  }

  return {
    isValid: true,
    network: network.toUpperCase() as EPolkadotNetworks,
    path: generatePath(targetPath, { network }),
  };
};
