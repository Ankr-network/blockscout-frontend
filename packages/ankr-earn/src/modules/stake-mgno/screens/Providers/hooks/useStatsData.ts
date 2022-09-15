import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { getMaxApr } from 'modules/stake-mgno/actions/getMaxApr';
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
  const { data: apr, loading: apyLoading } = useQuery({
    type: getMaxApr,
  });
  const tvl = data?.totalTVL;

  useProviderEffect(() => {
    dispatchRequest(getProvidersTotalInfo());
    dispatchRequest(getMaxApr());
  }, [dispatchRequest]);

  return {
    apyLoading,
    highestAPY: (apr ?? ZERO).decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    tvl: tvl ? getShortNumber(tvl) : undefined,
    statsLoading,
  };
};
