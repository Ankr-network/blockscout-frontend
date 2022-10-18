import { AvailableWriteProviders } from '@ankr.com/provider-core';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';

export interface IUseStakedASETHCAnalyticsData {
  onAddStakingClick: () => void;
}

export const useStakedASETHCAnalytics = (): IUseStakedASETHCAnalyticsData => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const onAddStakingClick = (): void =>
    trackEnterStakingFlow({
      accessPoint: 'add_stake',
      tokenName: Token.asETHc,
      walletPublicAddress: address,
      walletType: walletName,
    });

  return {
    onAddStakingClick,
  };
};
