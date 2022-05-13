import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { AvailableWriteProviders, EEthereumNetworkId } from 'provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { addMATICTokenToWallet } from 'modules/stake-polygon/actions/addMATICTokenToWallet';
import { fetchStats as fetchStakePolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake as stakePolygon } from 'modules/stake-polygon/actions/stake';
import { unstake as unstakePolygon } from 'modules/stake-polygon/actions/unstake';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';

export interface IStakedAMATICBData {
  amount: BigNumber;
  pendingValue: BigNumber;
  network: string;
  chainId: EEthereumNetworkId;
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

export const useStakedAMATICBData = (): IStakedAMATICBData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchStakePolygonStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakePolygon });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakePolygon });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);
  const chainId = ETH_NETWORK_BY_ENV;

  const amount = statsData?.aMATICbBalance ?? ZERO;
  const pendingValue = statsData?.pendingClaim ?? ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addMATICTokenToWallet(Token.aMATICb));
  }, [dispatchRequest]);

  return {
    amount,
    network,
    chainId,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(
      Token.aMATICb,
      Token.MATIC,
    ),
    stakeLink: StakePolygonRoutes.stake.generatePath(),
    unstakeLink: StakePolygonRoutes.unstake.generatePath(),
    stakeType: EPolygonPoolEventsMap.StakePending,
    unstakeType: EPolygonPoolEventsMap.MaticClaimPending,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    isShowed,
    walletName,
    address,
    handleAddTokenToWallet,
  };
};
