import {
  AvailableReadProviders,
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { isMainnet } from 'modules/common/const';

export const SSV_ACTIONS_PREFIX = 'ethereum-ssv/';

export const SSV_ETH_NETWORK_BY_ENV = isMainnet
  ? EEthereumNetworkId.goerli
  : EEthereumNetworkId.goerli;

export const SSV_ETH_PROVIDER_BY_ENV = isMainnet
  ? AvailableReadProviders.ethGoerli
  : AvailableReadProviders.ethGoerli;

export const SSV_MAX_DECIMALS_LEN = 1;

export const SSV_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const SSV_STAKING_AMOUNT_STEP = 0.5;

export const SSV_STAKING_NETWORKS = [SSV_ETH_NETWORK_BY_ENV];
