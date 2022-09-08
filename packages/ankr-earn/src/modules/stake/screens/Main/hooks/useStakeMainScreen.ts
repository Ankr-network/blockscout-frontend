import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { TAccessPoint } from 'modules/analytics/tracking-actions/trackDelegatedStakingFlow';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Token } from 'modules/common/types/token';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
import { getTotalTvl } from 'modules/stake-ankr/actions/getTotalTvl';
import { getMaxApr } from 'modules/stake-mgno/actions/getMaxApr';
import { getTVL } from 'modules/stake-mgno/actions/getTVL';
import { getMetrics, TMetrics } from 'modules/stake/actions/getMetrics';

import { useStakeAnalytics } from './useStakeAnalytics';

interface IUseStakeMainScreen {
  onTrackEnterStakingFlow: (tokenName: Token) => () => void;
  onTrackEnterDelegatedStakingFlow: (
    tokenName: Token,
    accessPoint: TAccessPoint,
  ) => () => void;
  metrics?: TMetrics;
  loading: boolean;
}

export const useStakeMainScreen = (): IUseStakeMainScreen => {
  const dispatchRequest = useDispatchRequest();
  const { onTrackEnterStakingFlow, onTrackEnterDelegatedStakingFlow } =
    useStakeAnalytics();

  useProviderEffect(() => {
    dispatchRequest(getMetrics());
    dispatchRequest(getMaxApy());
    dispatchRequest(getTotalTvl());
    dispatchRequest(getANKRPrice());
    dispatchRequest(getMaxApr());
    dispatchRequest(getTVL());
  }, [dispatchRequest]);

  const { data: metrics, loading } = useQuery({ type: getMetrics });

  return {
    onTrackEnterStakingFlow,
    onTrackEnterDelegatedStakingFlow,
    metrics: metrics ?? undefined,
    loading,
  };
};
