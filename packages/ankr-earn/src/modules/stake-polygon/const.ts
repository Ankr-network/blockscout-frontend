import { AvailableWriteProviders, AvailableReadProviders } from 'provider';

import { ETH_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { UNSTAKE_DAY_INTERVALS_BY_TOKEN } from 'modules/stake/const';

export const MATIC_STAKING_NETWORKS = [ETH_NETWORK_BY_ENV];

export const MAX_BLOCK_RANGE = isMainnet ? 2_000 : 5_000;

export const POOL_CONTRACT_START_BLOCK = isMainnet ? 13_396_826 : 5_653_297;

export const BLOCK_OFFSET = 302_400; // 7 days

export const POLYGON_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const POLYGON_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

export const MATIC_STAKING_AMOUNT_STEP = 0.1;

export const UNSTAKE_PERIOD = UNSTAKE_DAY_INTERVALS_BY_TOKEN[Token.MATIC];
