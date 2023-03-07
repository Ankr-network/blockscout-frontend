import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetTotalInfoQuery } from 'modules/stake-ankr/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-ankr/RoutesConfig';

export interface IStakedANKRData {
  stakedAmount: BigNumber;
  rewardsAmount: BigNumber;
  stakedUsdEquivalent: BigNumber;
  rewardsUsdEquivalent: BigNumber;
  manageLink: string;
  loading: boolean;
  address?: string;
  walletName?: string;
}

export const useStakedANKRData = (): IStakedANKRData => {
  const { data, isFetching: loading } = useGetTotalInfoQuery();
  const { data: ankrPrice } = useGetAnkrPriceQuery();
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const stakedAmount = data?.totalDelegatedAmount ?? ZERO;
  const rewardsAmount =
    data?.claimableRewards.reduce(
      (acc, { amount }) => acc.plus(amount),
      ZERO,
    ) ?? ZERO;

  const usdPrice = ankrPrice ?? ZERO;
  const stakedUsdEquivalent = stakedAmount.multipliedBy(usdPrice);
  const rewardsUsdEquivalent = rewardsAmount.multipliedBy(usdPrice);

  return {
    stakedAmount,
    rewardsAmount,
    stakedUsdEquivalent,
    rewardsUsdEquivalent,
    manageLink: RoutesConfig.main.generatePath(),
    loading,
    address,
    walletName,
  };
};
