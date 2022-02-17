import { FTM_NETWORK_BY_ENV } from 'modules/common/const';
import { AvailableWriteProviders } from 'provider/providerManager/types';

export const ACTIONS_PREFIX = 'fantom/';

export const FANTOM_STAKING_NETWORKS = [FTM_NETWORK_BY_ENV];

export const FANTOM_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

// todo: to clarify whether this value is correct
export const FANTOM_STAKING_AMOUNT_STEP = 0.1;
