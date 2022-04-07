import { isMainnet } from 'modules/common/const';

export const ETH_POOL_START_BLOCK = isMainnet ? 11_225_126 : 3_829_233;

export const ETH_BLOCK_OFFSET = 201_600; // 7 days

export const ETH_HISTORY_RANGE_STEP = 15_000;
