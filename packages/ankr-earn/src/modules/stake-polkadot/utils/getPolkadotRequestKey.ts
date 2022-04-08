import { EPolkadotNetworks } from '../types';

export const getPolkadotRequestKey = (network: EPolkadotNetworks): string =>
  `-${network}`;
