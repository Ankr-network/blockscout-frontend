import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Token } from 'modules/common/types/token';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
import { getTotalTvl } from 'modules/stake-ankr/actions/getTotalTvl';
import { getMetrics, TMetrics } from 'modules/stake/actions/getMetrics';

import { useStakeAnalytics } from './useStakeAnalytics';

interface IUseStakeMainScreen {
  onTrackEnterStakingFlow: (tokenName: Token) => () => void;
  metrics?: TMetrics;
  loading: boolean;
}

export const useStakeMainScreen = (): IUseStakeMainScreen => {
  const dispatchRequest = useDispatchRequest();
  const { onTrackEnterStakingFlow } = useStakeAnalytics();

  useProviderEffect(() => {
    dispatchRequest(getMetrics());
    dispatchRequest(getMaxApy());
    dispatchRequest(getTotalTvl());
    dispatchRequest(getANKRPrice());
  }, [dispatchRequest]);

  const { data: metrics, loading } = useQuery({ type: getMetrics });

  return { onTrackEnterStakingFlow, metrics: metrics ?? undefined, loading };
};
