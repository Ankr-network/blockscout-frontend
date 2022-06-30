import { AvailableWriteProviders } from '@ankr.com/provider';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { TMaticSyntToken } from 'modules/stake-polygon/types';

interface IUseUnstakeMATICAnalytics {
  sendAnalytics: (amount: BigNumber, syntheticToken: TMaticSyntToken) => void;
}

export const useUnstakeMaticAnalytics = (): IUseUnstakeMATICAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const sendAnalytics = (
    amount: BigNumber,
    syntheticToken: TMaticSyntToken,
  ) => {
    trackUnstake({
      address,
      name: walletName,
      amount,
      stakeToken: Token.MATIC,
      syntheticToken,
      newTokenBalance: fetchStatsData?.maticBalance ?? ZERO,
      newStakedBalance: fetchStatsData?.aMATICbBalance ?? ZERO,
      newSynthTokens: fetchStatsData?.aMATICbBalance ?? ZERO,
    });
  };

  return { sendAnalytics };
};
