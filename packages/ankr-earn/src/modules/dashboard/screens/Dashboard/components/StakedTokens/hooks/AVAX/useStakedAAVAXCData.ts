import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { t } from 'common';
import { AvailableWriteProviders, EEthereumNetworkId } from 'provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { AVAX_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { addAVAXTokenToWallet } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import { fetchStats as fetchStakeAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { stake as stakeAVAX } from 'modules/stake-avax/actions/stake';
import { unstake as unstakeAVAX } from 'modules/stake-avax/actions/unstake';
import { EAvalanchePoolEventsMap } from 'modules/stake-avax/api/AvalancheSDK';
import { RoutesConfig as StakeAvalancheRoutes } from 'modules/stake-avax/Routes';

const token = Token.aAVAXc;

export interface IStakedAVAXData {
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
  ratio: BigNumber;
  handleAddTokenToWallet: () => void;
}

export const useStakedAAVAXCData = (): IStakedAVAXData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchStakeAVAXStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeAVAX });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakeAVAX });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${AVAX_NETWORK_BY_ENV}`);
  const chainId = AVAX_NETWORK_BY_ENV;

  const amount = statsData?.aAVAXcBalance ?? ZERO;
  // TODO: change for actual pending value for certs
  const pendingValue = statsData?.pendingUnstakes ?? ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addAVAXTokenToWallet(Token.aAVAXc));
  }, [dispatchRequest]);

  return {
    amount,
    network,
    chainId,
    pendingValue,
    tradeLink: '',
    stakeLink: StakeAvalancheRoutes.stake.generatePath(token),
    unstakeLink: StakeAvalancheRoutes.unstake.generatePath(token),
    stakeType: EAvalanchePoolEventsMap.StakePending,
    unstakeType: EAvalanchePoolEventsMap.AvaxClaimPending,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    isShowed,
    walletName,
    address,
    ratio: statsData?.aAVAXcRatio ?? ZERO,
    handleAddTokenToWallet,
  };
};
