import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { t } from 'common';
import { EEthereumNetworkId } from 'provider';

import { configFromEnv } from 'modules/api/config';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { addMATICTokenToWallet } from 'modules/stake-polygon/actions/addMATICTokenToWallet';
import { fetchStats as fetchStakePolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake as stakeMATIC } from 'modules/stake-polygon/actions/stake';
import { unstake } from 'modules/stake-polygon/actions/unstake';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';

const token = Token.aMATICc;

export interface IStakedAMATICCData {
  isShowed: boolean;
  amount: BigNumber;
  isLoading: boolean;
  isStakeLoading: boolean;
  network: string;
  chainId: EEthereumNetworkId;
  stakeLink: string;
  token: Token;
  tokenAddress: string;
  unstakeLink: string;
  pendingValue: BigNumber;
  isUnstakeLoading: boolean;
  onAddTokenToWallet: () => void;
}

export const useStakedAMATICCData = (): IStakedAMATICCData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isCommonDataLoading } = useQuery({
    type: fetchStakePolygonStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeMATIC });
  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);
  const chainId = ETH_NETWORK_BY_ENV;

  const amount = statsData?.aMATICcBalance ?? ZERO;

  // TODO: STAKAN-1421 use actual pending value
  const pendingValue = statsData?.pendingClaim ?? ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isCommonDataLoading;

  const { polygonConfig } = configFromEnv();

  const onAddTokenToWallet = useCallback(() => {
    dispatchRequest(addMATICTokenToWallet(token));
  }, [dispatchRequest]);

  return {
    isShowed,
    amount,
    isLoading: isCommonDataLoading,
    isStakeLoading,
    network,
    chainId,
    stakeLink: StakePolygonRoutes.stake.generatePath(Token.aMATICc),
    token,
    tokenAddress: polygonConfig.aMATICcToken,
    unstakeLink: StakePolygonRoutes.unstake.generatePath(Token.aMATICc),
    isUnstakeLoading,
    pendingValue,
    onAddTokenToWallet,
  };
};
