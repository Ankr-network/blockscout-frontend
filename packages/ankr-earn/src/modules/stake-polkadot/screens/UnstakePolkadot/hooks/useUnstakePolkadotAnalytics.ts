import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchPolkadotAccountFullBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountFullBalance';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotResetRequests } from 'modules/stake-polkadot/utils/getPolkadotResetRequests';
import { useAppDispatch } from 'store/useAppDispatch';

import { ExtraWriteProviders } from '../../../../common/types';

interface IUseUnstakePolkadotAnalyticsProps {
  network: EPolkadotNetworks;
}

interface IUseUnstakePolkadotAnalyticsData {
  sendAnalytics: (amount: BigNumber, syntheticToken: TPolkadotETHToken) => void;
}

const resetRequests = () =>
  resetReduxRequests(
    getPolkadotResetRequests([
      fetchETHTokenBalance.toString(),
      fetchPolkadotAccountFullBalance.toString(),
    ]),
  );

export const useUnstakePolkadotAnalytics = ({
  network,
}: IUseUnstakePolkadotAnalyticsProps): IUseUnstakePolkadotAnalyticsData => {
  const dispatch = useAppDispatch();

  const { address, walletName } = useConnectedData(
    ExtraWriteProviders.polkadotCompatible,
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

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(fetchETHTokenBalance(network));
    dispatch(fetchPolkadotAccountFullBalance(network));

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  return { sendAnalytics };
};
