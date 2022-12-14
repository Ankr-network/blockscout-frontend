import {
  AvailableReadProviders,
  AvailableWriteProviders,
} from '@ankr.com/provider';

import { isMainnet } from '../common';

/**
 * Start block to check events for BinancePool
 */
export const BINANCE_POOL_CONTRACT_START_BLOCK = isMainnet
  ? 15_336_167
  : 16_716_904;

/**
 * Start block to check events for BinancePartners
 */
export const BINANCE_PARTNERS_CONTRACT_START_BLOCK = isMainnet
  ? 20_956_307
  : 22_056_801;

/**
 * Block offset to get 14 days history events
 */
export const BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET = 28_800 * 14;

/**
 * Internal write provider id
 */
export const BINANCE_WRITE_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

/**
 * Internal read provider id
 */
export const BINANCE_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.binanceChain
  : AvailableReadProviders.binanceChainTest;

/**
 * Events block range for stake/unstake history
 * @note  ~3h = 3_000 blocks for testnet, ~2.5h = 2_500 blocks for mainnet
 */
export const BNB_MAX_BLOCK_RANGE = isMainnet ? 2_500 : 3_000;

/**
 * Maximum decimals length for the BNB Staking
 */
export const BNB_STAKING_MAX_DECIMALS_LEN = 8;

/**
 * Staking topic hash. Used for fetching transaction amount from receipt.
 */
export const CERT_STAKING_LOG_HASH =
  '0x0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d';

/**
 * Staking topic hash. Used for fetching transaction amount from receipt.
 */
export const TOPIC_WITH_TOKEN_TYPE_INFO =
  '0x19e86fee7352f6a0c9bf1635ff7e554c083f9af69dff8d69c054f2ac5dba1a9c';

/**
 * Magic number to prevent metamask fee calculation issue
 */
export const BNB_ESTIMATE_GAS_MULTIPLIER = 1.4; // 40%

/**
 * Magic number for preventing gas fee calculation issue in the MetaMask with a maximum amount
 */
export const BNB_GAS_FEE_SAFE_LIMIT = 0.008; // 0.008%

/**
 * List of supported tokens for BinanceSDK
 */
export const AVAILABLE_BNB_SYNT_TOKENS = <const>[
  'aBNBb',
  'aBNBc',
  'aETH',
  'aETHc',
];
