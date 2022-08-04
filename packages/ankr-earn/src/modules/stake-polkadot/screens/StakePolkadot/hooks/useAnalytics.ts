import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchPolkadotAccountFullBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountFullBalance';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseAnalyticsArgs {
  amount: number;
  polkadotToken: string;
  ethToken: string;
  network: EPolkadotNetworks;
}

interface IUseAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useAnalytics = ({
  amount,
  polkadotToken,
  ethToken,
  network,
}: IUseAnalyticsArgs): IUseAnalytics => {
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

  useProviderEffect(() => {
    dispatch(fetchPolkadotAccountFullBalance(network));
    dispatch(fetchETHTokenBalance(network));
  }, [dispatch, fetchPolkadotAccountFullBalance, fetchETHTokenBalance]);

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

  return { sendAnalytics };
};
