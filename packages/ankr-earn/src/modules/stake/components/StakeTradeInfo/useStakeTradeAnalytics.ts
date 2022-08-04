import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackGetTokenDiscount } from 'modules/analytics/tracking-actions/trackGetTokenDiscount';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { EOpenOceanTokens } from 'modules/stake/types';

interface IUseStakeTradeAnalytics {
  onTrackGetSyntToken: (
    stakeToken: EOpenOceanTokens,
    synthToken: EOpenOceanTokens,
  ) => () => void;
}

export const useStakeTradeAnalytics = (): IUseStakeTradeAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const onTrackGetSyntToken = useCallback(
    (stakeToken: EOpenOceanTokens, synthToken: EOpenOceanTokens) => () => {
      trackGetTokenDiscount({
        walletType: walletName,
        walletPublicAddress: address,
        stakeToken,
        synthToken,
      });
    },
    [address, walletName],
  );

  return {
    onTrackGetSyntToken,
  };
};
