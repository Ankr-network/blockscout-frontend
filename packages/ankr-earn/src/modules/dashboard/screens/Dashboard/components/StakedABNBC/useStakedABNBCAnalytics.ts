import { AvailableWriteProviders } from '@ankr.com/provider-core';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

export interface IUseStakedABNBCAnalytics {
  onAddStakingClick: () => void;
}

export const useStakedABNBCAnalytics = (): IUseStakedABNBCAnalytics => {
  const { walletName, address } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aBNBc,
    });
  };

  return {
    onAddStakingClick,
  };
};
