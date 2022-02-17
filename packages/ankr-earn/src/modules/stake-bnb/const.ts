import { BSC_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';
import { Percentage } from 'modules/common/types';
import { AvailableWriteProviders } from 'provider/providerManager/types';

export const BINANCE_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const BNB_STAKING_NETWORKS = [BSC_NETWORK_BY_ENV];

// Note: Mainnet = ~7 days. Testnet = ~4 hours
export const BNB_REDEEM_PERIOD = isMainnet ? 7 : 4;

export const BNB_STAKING_AMOUNT_STEP = 0.1;
export const YEARLY_INTEREST: Percentage = 12;
