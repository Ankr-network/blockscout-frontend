/**
 * Common constants for staking sdk package
 */
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from 'provider';

import { isMainnet } from './env';

export const ETH_SCALE_FACTOR = 10 ** 18;
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ZERO = new BigNumber(0);
export const ONE_ETH = new BigNumber(ETH_SCALE_FACTOR);
export const MAX_UINT256 = new BigNumber(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);
export const ZERO_EVENT_HASH =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export const ETH_NETWORK_BY_ENV = isMainnet
  ? EEthereumNetworkId.mainnet
  : EEthereumNetworkId.goerli;

export const BSC_NETWORK_BY_ENV = isMainnet
  ? EEthereumNetworkId.smartchain
  : EEthereumNetworkId.smartchainTestnet;
