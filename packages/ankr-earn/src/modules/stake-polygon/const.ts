import { ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { AvailableWriteProviders } from 'provider/providerManager/types';

export const POLYGON_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const MATIC_STAKING_NETWORKS = [ETH_NETWORK_BY_ENV];

export const MATIC_STAKING_AMOUNT_STEP = 0.1;
export const UNSTAKE_TIME_WAIT_HOURS = 25;
