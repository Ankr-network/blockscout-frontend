import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { BSC_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake as stakeBNB } from 'modules/stake-bnb/actions/stake';
import { unstake as unstakeBNB } from 'modules/stake-bnb/actions/unstake';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';

export interface IStakedBNBData {
  amount: BigNumber;
  pendingValue: BigNumber;
  network: string;
  tradeLink: string;
  unstakeLink: string;
  stakeLink: string;
  stakeType: string;
  unstakeType: string;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  isShowed: boolean;
  walletName?: string;
  address?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedBNBData = (): IStakedBNBData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchStakeBNBStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeBNB });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakeBNB });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);

  const amount = statsData?.aBNBbBalance ?? ZERO;
  const pendingValue = statsData?.pendingUnstakes ?? ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addBNBTokenToWallet());
  }, [dispatchRequest]);

  return {
    amount,
    network,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aBNBb, Token.BNB),
    stakeLink: StakeBinanceRoutes.stake.generatePath(),
    unstakeLink: StakeBinanceRoutes.unstake.generatePath(),
    stakeType: EBinancePoolEventsMap.Staked,
    unstakeType: EBinancePoolEventsMap.UnstakePending,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    isShowed,
    walletName,
    address,
    handleAddTokenToWallet,
  };
};
