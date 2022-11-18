import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { TBnbSyntToken } from 'modules/stake-bnb/types';

interface IUseUnstakeBNBAnalytics {
  sendAnalytics: (amount: BigNumber, syntheticToken: TBnbSyntToken) => void;
}

export const useUnstakeBNBAnalytics = (): IUseUnstakeBNBAnalytics => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const sendAnalytics = (amount: BigNumber, syntheticToken: TBnbSyntToken) => {
    trackUnstake({
      address,
      name: walletName,
      amount,
      stakeToken: Token.BNB,
      syntheticToken,
      newTokenBalance: fetchStatsData?.bnbBalance ?? ZERO,
      newStakedBalance: fetchStatsData?.aBNBbBalance ?? ZERO,
      newSynthTokens: fetchStatsData?.aBNBbBalance ?? ZERO,
    });
  };

  return { sendAnalytics };
};
