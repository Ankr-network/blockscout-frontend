import { AvailableWriteProviders, AvailableReadProviders } from 'provider';

import { isMainnet } from '../common';

/**
 * Events block range for stake/unstake history
 */
export const MAX_BLOCK_RANGE = isMainnet ? 2_000 : 5_000;

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
 * Internal read provider id
 */
export const POLYGON_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

/**
 * Multiplication factor for fee when approving funds
 */
export const ALLOWANCE_RATE = 5;

/**
 * Need to get rid of theme from ProviderManager
 *
 * @deprecated
 */
export const DEFAULT_THEME = {
  background: '#FFF',
  main: '#1F2226',
  secondary: '#1F2226',
  border: '#F2F5FA',
  hover: '#F2F5FA',
};
