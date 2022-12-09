import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/fetchCommonData';
import { TAvaxSyntToken } from 'modules/stake-avax/types';

interface IUseUnstakeAVAXAnalytics {
  sendAnalytics: (amount: BigNumber, syntheticToken: TAvaxSyntToken) => void;
}

export const useUnstakeAvaxAnalytics = (): IUseUnstakeAVAXAnalytics => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: fetchStatsData } = useGetAVAXCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
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
