import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getProvidersTotalInfo } from 'modules/stake-ankr/actions/getProvidersTotalInfo';

interface IStatsData {
  highestAPY: number;
  tvl: string;
  lockingPeriod: number;
  rewards24h?: string;
  rewards30d?: string;
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
    tvl: data?.totalTVL.toFormat() ?? '0',
    lockingPeriod: data?.lockingPeriod ?? 0,
  };
};
