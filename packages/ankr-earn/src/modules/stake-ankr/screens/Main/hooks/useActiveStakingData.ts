import BigNumber from 'bignumber.js';

import { EProviderStatus } from 'modules/stake-ankr/const';

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
    status: EProviderStatus;
  }[];
}

export const useActiveStakingData = (): IActiveStakingData => {
  return {
    isLoading: false,
    data: [
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
        status: EProviderStatus.good,
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
        status: EProviderStatus.bad,
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
        status: EProviderStatus.bonding,
      },
    ],
  };
};
