import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-avax/actions/fetchStats';
import { TAvaxSyntToken } from 'modules/stake-avax/types';

interface IUseUnstakeAVAXAnalytics {
  sendAnalytics: (amount: BigNumber, syntheticToken: TAvaxSyntToken) => void;
}

export const useUnstakeAvaxAnalytics = (): IUseUnstakeAVAXAnalytics => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const sendAnalytics = (amount: BigNumber, syntheticToken: TAvaxSyntToken) => {
    trackUnstake({
      address,
      name: walletName,
      amount,
      stakeToken: Token.AVAX,
      syntheticToken,
      newTokenBalance: fetchStatsData?.avaxBalance ?? ZERO,
      newStakedBalance: fetchStatsData?.aAVAXbBalance ?? ZERO,
      newSynthTokens: fetchStatsData?.aAVAXbBalance ?? ZERO,
    });
  };

  return { sendAnalytics };
};
