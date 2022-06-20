import BigNumber from 'bignumber.js';

interface IUseTotalInfo {
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  totalRewards: BigNumber;
  totalRewardsUsd: BigNumber;
  climableRewards: BigNumber;
  climableRewardsUsd: BigNumber;
  isTotalStakedLoading: boolean;
  isTotalRewardsLoading: boolean;
  isClimableRewardsLoading: boolean;
  stakeLink: string;
}

export const useTotalInfo = (): IUseTotalInfo => {
  return {
    totalStaked: new BigNumber(0),
    totalStakedUsd: new BigNumber(0),
    totalRewards: new BigNumber(0),
    totalRewardsUsd: new BigNumber(0),
    climableRewards: new BigNumber(0),
    climableRewardsUsd: new BigNumber(0),
    isTotalStakedLoading: false,
    isTotalRewardsLoading: false,
    isClimableRewardsLoading: false,
    stakeLink: '',
  };
};
