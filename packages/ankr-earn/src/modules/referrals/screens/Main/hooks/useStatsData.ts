import BigNumber from 'bignumber.js';

import { Seconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

interface IStatsData {
  token: Token;
  totalStaked: BigNumber;
  refPercent: BigNumber;
  apy: number;
  ankrFees: number;
  refBonuses: number;
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

const DEMO_DATA: IStatsData[] = [
  {
    token: Token.BNB,
    totalStaked: new BigNumber(400000),
    apy: 8,
    ankrFees: 10,
    refBonuses: 70,
    refPercent: new BigNumber(0.07),
    pendingRewards: new BigNumber(124567),
    pendingRewardsUsd: new BigNumber(132),
    claimableRewards: new BigNumber(0.41),
    claimableRewardsUsd: new BigNumber(132),
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
