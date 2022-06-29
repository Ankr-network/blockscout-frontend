import BigNumber from 'bignumber.js';

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

const DEMO_DATA = [
  {
    isUnlocked: false,
    lockingPeriod: 23,
    stakeAmount: new BigNumber(12213123.13),
    usdStakeAmount: new BigNumber(2132),
    rewards: new BigNumber(42),
    usdRewards: new BigNumber(5),
    stakeLink: 'stakeLink',
    unstakeLink: 'unstakeLink',
    restakeLink: 'restakeLink',
    claimLink: 'claimLink',
  },
  {
    isUnlocked: false,
    lockingPeriod: 3,
    stakeAmount: new BigNumber(4),
    usdStakeAmount: new BigNumber(3),
    rewards: new BigNumber(12),
    usdRewards: new BigNumber(5),
    stakeLink: 'stakeLink',
    unstakeLink: '',
    restakeLink: 'restakeLink',
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

export const useStakeData = (): IStakeData => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
