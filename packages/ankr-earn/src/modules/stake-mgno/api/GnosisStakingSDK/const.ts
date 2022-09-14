import { AvailableReadProviders } from '@ankr.com/provider';

import { isMainnet } from 'modules/common/const';

export const GNOSIS_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.gnosis
  : AvailableReadProviders.sokol;

export const GNOSIS_STAKING_MAX_DECIMALS_LENGTH = 8;

export const GNOSIS_HISTORY_START_BLOCK = isMainnet ? 24_090_575 : 27_250_774;

export const GNOSIS_HISTORY_BLOCK_RANGE = isMainnet ? 2_000 : 3_000;

export const DEFAULT_PROVIDER_ID = isMainnet
  ? '0x4069D8A3dE3A72EcA86CA5e0a4B94619085E7362'
  : '0x422AA3Bc467B11979d8458d44A590D65E1F44631';
