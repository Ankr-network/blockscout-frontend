import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getProvidersTotalInfo } from 'modules/stake-ankr/actions/getProvidersTotalInfo';

interface IStatsData {
  highestAPY: number;
  tvl: string;
  tvlPercent: number;
  lockingPeriod: number;
  rewards24h: string;
  rewards30d: string;
}

export const useStatsData = (): IStatsData => {
  const dispatchRequest = useDispatchRequest();
  const { data } = useQuery({
    type: getProvidersTotalInfo,
  });
  const { data: apy } = useQuery({
    type: getAPY,
  });

  useProviderEffect(() => {
    dispatchRequest(getProvidersTotalInfo());
    dispatchRequest(getAPY());
    dispatchRequest(getANKRPrice());
  }, [dispatchRequest]);

  return {
    highestAPY: apy?.toNumber() ?? 0,
    tvl: data?.totalDelegatedAmount.toFormat() ?? '0',
    tvlPercent: data
      ? +data.totalDelegatedAmount
          .dividedBy(data.totalTVL)
          .multipliedBy(100)
          .decimalPlaces(0)
      : 0,
    lockingPeriod: data?.lockingPeriod ?? 0,
    rewards24h: '0k',
    rewards30d: '0m',
  };
};
