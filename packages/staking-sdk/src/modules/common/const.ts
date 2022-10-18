/**
 * Common constants for staking sdk package
 */
import { EEthereumNetworkId } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import { isMainnet } from './env';

export const ETH_DECIMALS = 18;
export const ETH_SCALE_FACTOR = 10 ** ETH_DECIMALS;
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

export const POLYGON_NETWORK_BY_ENV = isMainnet
  ? EEthereumNetworkId.polygon
  : EEthereumNetworkId.mumbai;

export const IS_ADVANCED_API_ACTIVE = isMainnet;
