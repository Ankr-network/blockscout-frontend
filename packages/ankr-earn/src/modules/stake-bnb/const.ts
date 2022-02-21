import { BSC_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';
import {
  AvailableReadProviders,
  AvailableWriteProviders,
} from 'provider/providerManager/types';

export const BINANCE_POOL_CONTRACT_START_BLOCK = isMainnet
  ? 15336167
  : 16716904;

export const BINANCE_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.smartChainHttpProvider
  : AvailableReadProviders.smartChainTestnetHttpProvider;
export const BINANCE_WRITE_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const BNB_STAKING_NETWORKS = [BSC_NETWORK_BY_ENV];

// Note: ~4h = 5_000 blocks
export const BNB_MAX_BLOCK_RANGE: number = isMainnet ? 2_500 : 5_000;

// Note: Mainnet = ~7 days. Testnet = ~4 hours
export const BNB_REDEEM_PERIOD = isMainnet ? 7 : 4;

export const BNB_STAKING_AMOUNT_STEP = 0.1;
