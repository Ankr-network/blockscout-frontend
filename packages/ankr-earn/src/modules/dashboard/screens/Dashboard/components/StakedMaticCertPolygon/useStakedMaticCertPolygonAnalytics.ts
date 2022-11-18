import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

export interface IUseStakedMaticCertPolygonAnalytics {
  onAddStakingClick: () => void;
}

export const useStakedMaticCertPolygonAnalytics =
  (): IUseStakedMaticCertPolygonAnalytics => {
    const { walletName, address } = useConnectedData(
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
