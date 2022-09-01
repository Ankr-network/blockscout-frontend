import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import {
  TAccessPoint,
  trackDelegatedStakingFlow,
} from 'modules/analytics/tracking-actions/trackDelegatedStakingFlow';
import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';

interface IUseStakeAnalytics {
  onTrackEnterStakingFlow: (tokenName: Token) => () => void;
  onTrackEnterDelegatedStakingFlow: (
    tokenName: Token,
    accessPoint: TAccessPoint,
  ) => () => void;
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

  const onTrackEnterDelegatedStakingFlow = useCallback(
    (tokenName: Token, accessPoint: TAccessPoint) => () => {
      trackDelegatedStakingFlow({
        walletType: walletName,
        walletPublicAddress: address,
        accessPoint,
        tokenName,
      });
    },
    [address, walletName],
  );
  return {
    onTrackEnterStakingFlow,
    onTrackEnterDelegatedStakingFlow,
  };
};
