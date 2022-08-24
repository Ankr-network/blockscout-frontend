import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { getProvidersTotalInfo } from 'modules/stake-mgno/actions/getProvidersTotalInfo';

interface IStatsData {
  apyLoading: boolean;
  highestAPY: string;
  tvl?: string;
  lockingPeriod?: number;
  rewards24h?: string;
  rewards30d?: string;
  statsLoading: boolean;
}

export const useStatsData = (): IStatsData => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading: statsLoading } = useQuery({
    type: getProvidersTotalInfo,
  });
  const tvl = data?.totalTVL;

  useProviderEffect(() => {
    dispatchRequest(getProvidersTotalInfo());
  }, [dispatchRequest]);

  return {
    apyLoading: false,
    highestAPY: '0',
    tvl: tvl ? getShortNumber(tvl) : undefined,
    lockingPeriod: data ? data.lockingPeriod : undefined,
    rewards24h: '0',
    rewards30d: '0',
    statsLoading,
  };
};
