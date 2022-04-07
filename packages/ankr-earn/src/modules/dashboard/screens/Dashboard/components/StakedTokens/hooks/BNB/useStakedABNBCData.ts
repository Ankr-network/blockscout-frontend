import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { configFromEnv } from 'modules/api/config';
import { BSC_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake as stakeBNB } from 'modules/stake-bnb/actions/stake';
import { unstake } from 'modules/stake-bnb/actions/unstake';
import { RoutesConfig } from 'modules/stake-bnb/Routes';

const token = Token.aBNBc;

export interface IStakedABNBCData {
  isShowed: boolean;
  amount: BigNumber;
  isLoading: boolean;
  isStakeLoading: boolean;
  network: string;
  stakeLink: string;
  token: Token;
  tokenAddress: string;
  unstakeLink: string;
  pendingValue: BigNumber;
  isUnstakeLoading: boolean;
  onAddTokenToWallet: () => void;
}

export const useStakedABNBCData = (): IStakedABNBCData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isCommonDataLoading } = useQuery({
    type: fetchStakeBNBStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeBNB });

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);

  const amount = statsData?.aBNBcBalance ?? ZERO;

  const pendingValue = statsData?.pendingUnstakes ?? ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isCommonDataLoading;

  const { binanceConfig } = configFromEnv();

  const onAddTokenToWallet = useCallback(() => {
    dispatchRequest(addBNBTokenToWallet(token));
  }, [dispatchRequest]);

  return {
    isShowed,
    amount,
    isLoading: isCommonDataLoading,
    isStakeLoading,
    network,
    stakeLink: RoutesConfig.stake.generatePath(token),
    token,
    tokenAddress: binanceConfig.aBNBcToken,
    unstakeLink: RoutesConfig.unstake.generatePath(token),
    isUnstakeLoading,
    pendingValue,
    onAddTokenToWallet,
  };
};
