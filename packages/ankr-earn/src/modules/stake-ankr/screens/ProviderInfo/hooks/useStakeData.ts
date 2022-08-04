import BigNumber from 'bignumber.js';

import { RoutesConfig } from 'modules/stake-ankr/Routes';

interface IStakeRow {
  isUnlocked: boolean;
  lockingPeriod: number;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  rewards: BigNumber;
  usdRewards: BigNumber;
  stakeLink: string;
  unstakeLink: string;
  restakeLink: string;
  claimLink: string;
}

interface IStakeData {
  isLoading: boolean;
  data: IStakeRow[];
}

const getDemoData = (provider: string): IStakeRow[] => [
  {
    isUnlocked: false,
    lockingPeriod: 23,
    stakeAmount: new BigNumber(12213123.13),
    usdStakeAmount: new BigNumber(2132),
    rewards: new BigNumber(42),
    usdRewards: new BigNumber(5),
    stakeLink: RoutesConfig.stakeMore.generatePath(provider),
    unstakeLink: RoutesConfig.unstake.generatePath(provider),
    restakeLink: RoutesConfig.restake.generatePath(provider),
    claimLink: RoutesConfig.claimRewards.generatePath(provider),
  },
  {
    isUnlocked: false,
    lockingPeriod: 3,
    stakeAmount: new BigNumber(4),
    usdStakeAmount: new BigNumber(3),
    rewards: new BigNumber(12),
    usdRewards: new BigNumber(5),
    stakeLink: RoutesConfig.stakeMore.generatePath(provider),
    unstakeLink: '',
    restakeLink: RoutesConfig.restake.generatePath(provider),
    claimLink: '',
  },
  {
    isUnlocked: true,
    lockingPeriod: 100,
    stakeAmount: new BigNumber(4),
    usdStakeAmount: new BigNumber(3),
    rewards: new BigNumber(12),
    usdRewards: new BigNumber(5),
    stakeLink: '',
    unstakeLink: '',
    restakeLink: '',
    claimLink: '',
  },
];

export const useStakeData = (provider: string): IStakeData => {
  return {
    isLoading: false,
    data: getDemoData(provider),
  };
};
