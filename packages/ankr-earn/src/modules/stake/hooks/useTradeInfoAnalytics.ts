import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackGetTokenDiscount } from 'modules/analytics/tracking-actions/trackGetTokenDiscount';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TToken } from 'modules/common/types/token';

interface IUseStakeTradeAnalytics {
  onTrackGetSyntToken: () => void;
}

export const useStakeTradeAnalytics = (
  stakeToken: TToken,
  synthToken: TToken,
): IUseStakeTradeAnalytics => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const onTrackGetSyntToken = useCallback(() => {
    trackGetTokenDiscount({
      walletType: walletName,
      walletPublicAddress: address,
      stakeToken,
      synthToken,
    });
  }, [address, stakeToken, synthToken, walletName]);

  return {
    onTrackGetSyntToken,
  };
};
