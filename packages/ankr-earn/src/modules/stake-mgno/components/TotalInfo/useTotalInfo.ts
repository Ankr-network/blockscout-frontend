import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { RoutesConfig } from 'modules/stake-mgno/Routes';

interface IUseTotalInfo {
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  climableRewards: BigNumber;
  climableRewardsUsd: BigNumber;
  isTotalStakedLoading: boolean;
  isClimableRewardsLoading: boolean;
  stakeLink: string;
}

export const useTotalInfo = (): IUseTotalInfo => {
  return {
    totalStaked: ZERO,
    totalStakedUsd: ZERO,
    climableRewards: ZERO,
    climableRewardsUsd: ZERO,
    isTotalStakedLoading: false,
    isClimableRewardsLoading: false,
    stakeLink: RoutesConfig.stake.generatePath(),
  };
};
