import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Seconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

interface IStatsData {
  token: Token;
  totalStaked: BigNumber;
  refPercent: BigNumber;
  pendingRewards: BigNumber;
  pendingRewardsUsd: BigNumber;
  claimableRewards: BigNumber;
  claimableRewardsUsd: BigNumber;
  claimLink: string;
}

interface IStats {
  isLoading: boolean;
  nextUnlock: Seconds;
  data: IStatsData[] | null;
}

const DEMO_DATA = [
  {
    token: Token.BNB,
    totalStaked: ZERO.plus(400000),
    refPercent: ZERO.plus(0.07),
    pendingRewards: ZERO.plus(124567),
    pendingRewardsUsd: ZERO.plus(132),
    claimableRewards: ZERO.plus(0.41),
    claimableRewardsUsd: ZERO.plus(132),
    claimLink: 'claimLink',
  },
];

export const useStatsData = (): IStats => {
  return {
    isLoading: false,
    nextUnlock: 10_000,
    data: DEMO_DATA,
  };
};
