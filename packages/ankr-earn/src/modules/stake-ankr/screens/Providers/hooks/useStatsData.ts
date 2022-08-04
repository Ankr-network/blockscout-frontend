import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
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

  useProviderEffect(() => {
    dispatchRequest(getProvidersTotalInfo());
  }, [dispatchRequest]);

  return {
    highestAPY: data?.currentHighestAPY ?? 0,
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
