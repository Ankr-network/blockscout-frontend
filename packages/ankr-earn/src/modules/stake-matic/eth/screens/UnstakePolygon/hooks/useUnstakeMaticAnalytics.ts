import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';

interface IUseUnstakeMATICAnalytics {
  sendAnalytics: (amount: BigNumber, syntheticToken: TMaticSyntToken) => void;
}

export const useUnstakeMaticAnalytics = (): IUseUnstakeMATICAnalytics => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: statsData } = useGetMaticOnEthStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
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
      newTokenBalance: statsData?.maticBalance ?? ZERO,
      newStakedBalance: statsData?.aMATICbBalance ?? ZERO,
      newSynthTokens: statsData?.aMATICbBalance ?? ZERO,
    });
  };

  return { sendAnalytics };
};
