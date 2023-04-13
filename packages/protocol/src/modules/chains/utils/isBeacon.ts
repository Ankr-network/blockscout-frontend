import { ChainID } from '../types';

const beacons: ChainID[] = [
  ChainID.ETH_BEACON,
  ChainID.ETH_GOERLI_BEACON,
  ChainID.ETH_SEPOLIA_BEACON,
  ChainID.GNOSIS_BEACON,
];

export const isBeacon = (chainID?: ChainID) =>
  !!chainID && beacons.includes(chainID);
