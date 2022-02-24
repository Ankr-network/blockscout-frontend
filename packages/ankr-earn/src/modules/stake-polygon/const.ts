import { AvailableWriteProviders } from 'provider';

import { ETH_NETWORK_BY_ENV } from 'modules/common/const';

export const MATIC_STAKING_NETWORKS = [ETH_NETWORK_BY_ENV];

export const POLYGON_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const UNSTAKE_TIME_WAIT_HOURS = 25;
