import { AvailableWriteProviders } from '@ankr.com/provider-core';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchPolkadotAccountFullBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountFullBalance';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getPolkadotResetRequests } from 'modules/stake-polkadot/utils/getPolkadotResetRequests';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseAnalyticsProps {
  amount: number;
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
}

interface IUseAnalyticsData {
  sendAnalytics: () => Promise<void>;
}

const resetRequests = () =>
  resetReduxRequests(
    getPolkadotResetRequests([
      fetchETHTokenBalance.toString(),
      fetchPolkadotAccountFullBalance.toString(),
    ]),
  );

export const useAnalytics = ({
  amount,
  ethToken,
  network,
  polkadotToken,
}: IUseAnalyticsProps): IUseAnalyticsData => {
  const dispatch = useAppDispatch();

  const { address, walletName } = useAuth(
    AvailableWriteProviders.polkadotCompatible,
  );

  const { data: polkadotBalance } = useQuery({
    type: fetchPolkadotAccountFullBalance,
    requestKey: getPolkadotRequestKey(network),
  });

  const { data: ethTokenBalance } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(network),
  });

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: polkadotToken,
      tokenOut: ethToken,
      prevStakedAmount: polkadotBalance ?? ZERO,
      synthBalance: ethTokenBalance ?? ZERO,
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
