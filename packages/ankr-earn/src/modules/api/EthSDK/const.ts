import { isMainnet } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

export const ETH_POOL_START_BLOCK = isMainnet ? 11_225_126 : 3_829_233;

export const ETH_BLOCK_OFFSET = 50_400; // 7 days

export const ETH_HISTORY_RANGE_STEP = 15_000;

export const methodNameMap = {
  [Token.aETHb]: {
    stake: 'stakeAndClaimAethB',
    claim: 'claimFETH',
    claimable: 'claimableAETHFRewardOf',
  },
  [Token.aETHc]: {
    stake: 'stakeAndClaimAethC',
    claim: 'claimAETH',
    claimable: 'claimableAETHRewardOf',
  },
};
