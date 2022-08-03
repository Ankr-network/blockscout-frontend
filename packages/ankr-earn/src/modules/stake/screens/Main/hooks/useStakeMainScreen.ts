import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Token } from 'modules/common/types/token';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getMetrics, TMetrics } from 'modules/stake/actions/getMetrics';

import { useStakeAnalytics } from './useStakeAnalytics';

interface IUseStakeMainScreen {
  onTrackEnterStakingFlow: (tokenName: Token) => () => void;
  metrics?: TMetrics;
}

export const useStakeMainScreen = (): IUseStakeMainScreen => {
  const dispatchRequest = useDispatchRequest();
  const { onTrackEnterStakingFlow } = useStakeAnalytics();

  useProviderEffect(() => {
    dispatchRequest(getMetrics());
    dispatchRequest(getAPY());
    dispatchRequest(getANKRPrice());
  }, [dispatchRequest]);

  const { data: metrics } = useQuery({ type: getMetrics });

  return { onTrackEnterStakingFlow, metrics: metrics ?? undefined };
};
