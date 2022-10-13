import { AvailableWriteProviders } from 'common';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';

export interface IUseStakedAMATICCAnalytics {
  onAddStakingClick: () => void;
}

export const useStakedAMATICCAnalytics = (): IUseStakedAMATICCAnalytics => {
  const { walletName, address } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const onAddStakingClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'add_stake',
      tokenName: Token.aMATICc,
    });
  };

  return {
    onAddStakingClick,
  };
};
