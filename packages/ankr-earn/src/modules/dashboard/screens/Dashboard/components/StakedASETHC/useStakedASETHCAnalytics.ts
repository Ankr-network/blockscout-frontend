import { AvailableWriteProviders } from '@ankr.com/provider-core';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

export interface IUseStakedASETHCAnalyticsData {
  onAddStakingClick: () => void;
}

export const useStakedASETHCAnalytics = (): IUseStakedASETHCAnalyticsData => {
  const { address, walletName } = useConnectedData(
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
