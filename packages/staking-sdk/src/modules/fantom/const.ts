/* istanbul ignore file */
import {
  AvailableReadProviders,
  AvailableWriteProviders,
} from '@ankr.com/provider';

import { isMainnet } from '../common';

export const FANTOM_POOL_START_BLOCK = isMainnet ? 31_218_797 : 7_729_481;

export const FANTOM_MAX_BLOCK_RANGE = isMainnet ? 2_000 : 5_000;

export const FANTOM_BLOCK_OFFSET = 201_600; // 7 days

export const FANTOM_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const FANTOM_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.ftmOpera
  : AvailableReadProviders.ftmTestnet;

export const FANTOM_ESTIMATE_GAS_MULTIPLIER = 1.4; // 40%
// maxAmount = userBalance - gasFee * GAS_FEE_MULTIPLIER
export const FANTOM_GAS_FEE_MULTIPLIER = 3.5;
