import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchPolkadotAccountFullBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountFullBalance';
import { TPolkadotETHToken } from 'modules/stake-polkadot/types';

interface IUseUnstakePolkadotAnalytics {
  sendAnalytics: (amount: BigNumber, syntheticToken: TPolkadotETHToken) => void;
}

export const useUnstakePolkadotAnalytics = (): IUseUnstakePolkadotAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.polkadotCompatible,
  );

  const { data: fetchFullBalance } = useQuery({
    type: fetchPolkadotAccountFullBalance,
  });

  const { data: fetchETHBalance } = useQuery({
    type: fetchETHTokenBalance,
  });

  const sendAnalytics = (
    amount: BigNumber,
    syntheticToken: TPolkadotETHToken,
  ) => {
    trackUnstake({
      address,
      name: walletName,
      amount,
      stakeToken: Token.MATIC,
      syntheticToken,
      newTokenBalance: fetchFullBalance ?? ZERO,
      newStakedBalance: fetchETHBalance ?? ZERO,
      newSynthTokens: fetchETHBalance ?? ZERO,
    });
  };

  return { sendAnalytics };
};
