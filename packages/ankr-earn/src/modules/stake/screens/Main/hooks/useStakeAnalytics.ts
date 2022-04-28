import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';

interface IUseStakeAnalytics {
  onTrackEnterStakingFlow: (tokenName: Token) => () => void;
}

export const useStakeAnalytics = (): IUseStakeAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const onTrackEnterStakingFlow = useCallback(
    (tokenName: Token) => () => {
      trackEnterStakingFlow({
        walletType: walletName,
        walletPublicAddress: address,
        accessPoint: 'liquid_staking',
        tokenName,
      });
    },
    [address, walletName],
  );

  return {
    onTrackEnterStakingFlow,
  };
};
