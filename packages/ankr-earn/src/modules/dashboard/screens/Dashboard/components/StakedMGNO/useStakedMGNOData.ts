import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getTotalInfo } from 'modules/stake-mgno/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-mgno/Routes';

export interface IStakedMGNOData {
  stakedAmount: BigNumber;
  stakedUsdEquivalent: BigNumber;
  rewardsAmount: BigNumber;
  rewardsUsdEquivalent: BigNumber;
  manageLink: string;
  address?: string;
  walletName?: string;
}

export const useStakedMGNOData = (): IStakedMGNOData => {
  const { data } = useQuery({ type: getTotalInfo });
  const { data: usdRatio } = useQuery({
    type: getMGNOPrice,
  });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const stakedAmount = data?.myTotalDelegatedAmount ?? ZERO;
  const rewardsAmount = data?.myAllValidationRewards ?? ZERO;

  const usdPrice = usdRatio ?? ZERO;

  const stakedUsdEquivalent = stakedAmount.multipliedBy(usdPrice);
  const rewardsUsdEquivalent = rewardsAmount.multipliedBy(usdPrice);

  return {
    stakedAmount,
    stakedUsdEquivalent,
    rewardsAmount,
    rewardsUsdEquivalent,
    manageLink: RoutesConfig.main.generatePath(),
    address,
    walletName,
  };
};
