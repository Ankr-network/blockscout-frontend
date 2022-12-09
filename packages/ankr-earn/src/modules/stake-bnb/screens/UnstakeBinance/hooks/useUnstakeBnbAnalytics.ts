import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { TBnbSyntToken } from 'modules/stake-bnb/types';

interface IUseUnstakeBNBAnalytics {
  sendAnalytics: (amount: BigNumber, syntheticToken: TBnbSyntToken) => void;
}

export const useUnstakeBNBAnalytics = (): IUseUnstakeBNBAnalytics => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: fetchStatsData } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
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
