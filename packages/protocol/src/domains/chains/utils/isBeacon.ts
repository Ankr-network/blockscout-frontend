import { ChainID } from 'modules/chains/types';

const beacons: ChainID[] = [
  ChainID.ETH_BEACON,
  ChainID.ETH_GOERLI_BEACON,
  ChainID.ETH_SEPOLIA_BEACON,
  ChainID.ETH_HOLESKY_BEACON,
  ChainID.GNOSIS_BEACON,
  ChainID.GNOSIS_TESTNET_BEACON,
];

export const isBeacon = (chainID?: ChainID) =>
  !!chainID && beacons.includes(chainID);

const opnodes: ChainID[] = [
  ChainID.ROLLUX_OPNODE,
  ChainID.ROLLUX_OPNODE_TESTNET,
];

export const isOpnode = (chainID?: ChainID) =>
  !!chainID && opnodes.includes(chainID);
