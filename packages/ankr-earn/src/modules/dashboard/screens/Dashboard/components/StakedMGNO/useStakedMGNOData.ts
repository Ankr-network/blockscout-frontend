import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { GNO_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getTotalInfo } from 'modules/stake-mgno/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-mgno/Routes';

export interface IStakedMGNOData {
  stakedAmount: BigNumber;
  stakedUsdEquivalent: BigNumber;
  stakedTooltip: string;
  rewardsAmount: BigNumber;
  rewardsUsdEquivalent: BigNumber;
  rewardsTooltip: string;
  network: string;
  manageLink: string;
  loading: boolean;
  address?: string;
  walletName?: string;
}

export const useStakedMGNOData = (): IStakedMGNOData => {
  const { data, loading } = useQuery({ type: getTotalInfo });
  const { data: usdRatio, loading: ratioLoading } = useQuery({
    type: getMGNOPrice,
  });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${GNO_NETWORK_BY_ENV}`);

  const stakedAmount = data?.myTotalDelegatedAmount ?? ZERO;
  const rewardsAmount = data?.myAllValidationRewards ?? ZERO;

  const usdPrice = usdRatio ?? ZERO;

  const stakedUsdEquivalent = stakedAmount.multipliedBy(usdPrice);
  const rewardsUsdEquivalent = rewardsAmount.multipliedBy(usdPrice);

  return {
    stakedAmount,
    stakedUsdEquivalent,
    stakedTooltip: '',
    rewardsAmount,
    rewardsUsdEquivalent,
    rewardsTooltip: '',
    network,
    manageLink: RoutesConfig.main.generatePath(),
    loading: loading || ratioLoading,
    address,
    walletName,
  };
};
