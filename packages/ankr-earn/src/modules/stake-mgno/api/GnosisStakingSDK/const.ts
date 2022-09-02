import { AvailableReadProviders } from '@ankr.com/provider';

import { isMainnet } from 'modules/common/const';

export const GNOSIS_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.gnosis
  : AvailableReadProviders.sokol;

export const GNOSIS_STAKING_MAX_DECIMALS_LENGTH = 8;

// todo: change it
export const GNOSIS_HISTORY_START_BLOCK = isMainnet ? 15_275_019 : 27_250_774;

// todo: change it
export const GNOSIS_HISTORY_BLOCK_RANGE = 3_000;

export const TEST_PROVIDER_ID = '0x422AA3Bc467B11979d8458d44A590D65E1F44631';
