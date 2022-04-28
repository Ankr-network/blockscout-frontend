import { AvailableWriteProviders } from 'provider';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';

export interface IUseStakedABNBCAnalytics {
  onAddStakingClick: () => void;
}

export const useStakedABNBCAnalytics = (): IUseStakedABNBCAnalytics => {
  const { walletName, address } = useAuth(
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
