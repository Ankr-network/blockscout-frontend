import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { EProviderStatus } from 'modules/stake-mgno/const';

interface IActiveStakingData {
  provider: string;
  apr: BigNumber;
  isUnlocked: boolean;
  slashingProtection: number;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  rewards: BigNumber;
  usdRewards: BigNumber;
  status: EProviderStatus;
}

interface IActiveStaking {
  isLoading: boolean;
  data: IActiveStakingData[] | null;
}

const DEMO_DATA: IActiveStakingData[] = [
  {
    provider: 'Node Provider 1',
    apr: ZERO,
    isUnlocked: false,
    slashingProtection: 98,
    stakeAmount: ZERO.plus(12),
    usdStakeAmount: ZERO.plus(1),
    rewards: ZERO,
    usdRewards: ZERO,
    status: 1,
  },
  {
    provider: 'Node Provider 2',
    apr: ZERO,
    isUnlocked: true,
    slashingProtection: 78,
    stakeAmount: ZERO.plus(1323),
    usdStakeAmount: ZERO.plus(41),
    rewards: ZERO,
    usdRewards: ZERO,
    status: 2,
  },
];

export const useActiveStakingData = (): IActiveStaking => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
