import {
  AvailableReadProviders,
  AvailableWriteProviders,
} from '@ankr.com/provider';

import { isMainnet } from '../common';

/**
 * Events block range for stake/unstake history
 */
export const MAX_BLOCK_RANGE = isMainnet ? 2_000 : 3_000;

/**
 * Start block to check events for PolygonPool
 */
export const POOL_CONTRACT_START_BLOCK = isMainnet ? 13_396_826 : 5_653_297;

/**
 * Block offset to get latest history events
 */
export const BLOCK_OFFSET = 302_400; // 7 days

/**
 * Internal write provider id
 */
export const POLYGON_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

/**
 * Internal read provider id for MATIC on Ethereum network
 */
export const MATIC_ON_ETH_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

/**
 * Internal read provider id for MATIC on Polygon network
 */
export const MATIC_ON_POLYGON_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.polygon
  : AvailableReadProviders.mumbai;

/**
 * Magic number for preventing fee calculation issue in MetaMask
 */
export const MATIC_ON_POLYGON_ESTIMATE_GAS_MULTIPLIER = 1.6; // 60%

/**
 * Magic number to avoid issues with max amount and fee calculation in the wallet
 */
export const MATIC_ON_POLYGON_GAS_FEE_MULTIPLIER = 2;

/**
 * Decimals length for MATIC
 */
export const MATIC_DECIMALS = 18;

/**
 * Internal scale factor for MATIC on Polygon network
 */
export const MATIC_SCALE_FACTOR = 10 ** MATIC_DECIMALS;

/**
 * Multiplication factor for fee when approving funds
 */
export const ALLOWANCE_RATE = 5;
