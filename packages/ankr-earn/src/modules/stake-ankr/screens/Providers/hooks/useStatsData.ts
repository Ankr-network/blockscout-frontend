import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getShortNumber } from 'modules/delegate-stake/utils/getShortNumber';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
import { getProvidersTotalInfo } from 'modules/stake-ankr/actions/getProvidersTotalInfo';
import { TEMPORARY_APY } from 'modules/stake-ankr/const';

interface IStatsData {
  highestAPY: string;
  apyLoading: boolean;
  tvl: string;
  lockingPeriod: number;
  rewards24h?: string;
  rewards30d?: string;
  statsLoading: boolean;
}

export const useStatsData = (): IStatsData => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading: statsLoading } = useQuery({
    type: getProvidersTotalInfo,
  });
  const { data: maxApy, loading: apyLoading } = useQuery({
    type: getMaxApy,
  });
  const tvl = data?.totalTVL ?? ZERO;

  useProviderEffect(() => {
    dispatchRequest(getProvidersTotalInfo());
    dispatchRequest(getMaxApy());
    dispatchRequest(getANKRPrice());
  }, [dispatchRequest]);

  return {
    highestAPY:
      maxApy?.decimalPlaces(DEFAULT_ROUNDING).toFormat() ??
      TEMPORARY_APY.toFormat(),
    apyLoading,
    tvl: getShortNumber(tvl),
    lockingPeriod: data?.lockingPeriod ?? 0,
    statsLoading,
  };
};
