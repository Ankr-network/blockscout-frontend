import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
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
  const { data: maxApy } = useQuery({
    type: getMaxApy,
  });

  useProviderEffect(() => {
    dispatchRequest(getProvidersTotalInfo());
    dispatchRequest(getMaxApy());
    dispatchRequest(getANKRPrice());
  }, [dispatchRequest]);

  return {
    highestAPY: maxApy?.toNumber() ?? 0,
    tvl: data?.totalDelegatedAmount.toFormat() ?? '0',
    lockingPeriod: data?.lockingPeriod ?? 0,
  };
};
