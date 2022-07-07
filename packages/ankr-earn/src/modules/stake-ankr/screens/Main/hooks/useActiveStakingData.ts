import BigNumber from 'bignumber.js';

import { EProviderStatus } from 'modules/stake-ankr/const';

interface IAdditionalInfoData {
  date: Date;
  lockingPeriod: number;
  isUnlocked: boolean;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  rewards: BigNumber;
  usdRewards: BigNumber;
  stakeLink: string;
  unstakeLink: string;
  restakeLink: string;
  claimLink: string;
}

interface IActiveStakingData {
  isLoading: boolean;
  data: {
    provider: string;
    apy: BigNumber;
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
    detailedData?: IAdditionalInfoData[];
    status: EProviderStatus;
  }[];
}

const DEMO_DATA = [
  {
    provider: 'Provider 1',
    apy: new BigNumber(12),
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
    detailedData: [
      {
        date: new Date(),
        lockingPeriod: 1,
        isUnlocked: false,
        stakeAmount: new BigNumber(23.13),
        usdStakeAmount: new BigNumber(2),
        rewards: new BigNumber(4),
        usdRewards: new BigNumber(0.2),
        stakeLink: 'stakeLink',
        unstakeLink: 'unstakeLink',
        restakeLink: 'restakeLink',
        claimLink: 'claimLink',
      },
      {
        date: new Date('2/1/22'),
        lockingPeriod: 22,
        isUnlocked: true,
        stakeAmount: new BigNumber(123),
        usdStakeAmount: new BigNumber(23),
        rewards: new BigNumber(42),
        usdRewards: new BigNumber(20),
        stakeLink: 'stakeLink',
        unstakeLink: 'unstakeLink',
        restakeLink: 'restakeLink',
        claimLink: 'claimLink',
      },
    ],
    status: EProviderStatus.active,
  },
  {
    provider: 'Provider 2',
    apy: new BigNumber(32.009),
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
    status: EProviderStatus.notFound,
  },
  {
    provider: 'Provider 3',
    apy: new BigNumber(9.123),
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
    status: EProviderStatus.pending,
  },
];

export const useActiveStakingData = (): IActiveStakingData => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
