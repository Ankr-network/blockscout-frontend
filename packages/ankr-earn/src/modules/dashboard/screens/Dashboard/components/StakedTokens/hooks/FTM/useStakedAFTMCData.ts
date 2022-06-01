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
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { FTM_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { addFTMTokenToWallet } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { unstake } from 'modules/stake-fantom/actions/unstake';
import { RoutesConfig } from 'modules/stake-fantom/Routes';

export interface IStakedAFTMCData {
  amount: BigNumber;
  pendingUnstakes: BigNumber;
  network: string;
  chainId: EEthereumNetworkId;
  tradeLink: string;
  stakeLink: string;
  unstakeLink?: string;
  isShowed: boolean;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  walletName?: string;
  address?: string;
  ratio: BigNumber;
  nativeAmount?: BigNumber;
  handleAddTokenToWallet: () => void;
}

export const useStakedAFTMCData = (): IStakedAFTMCData => {
  const dispatchRequest = useDispatchRequest();

  const { data: commonData, loading: isBalancesLoading } = useQuery({
    type: getCommonData,
  });

  const { loading: isStakeLoading } = useMutation({
    type: stake,
  });
  const { loading: isUnstakeLoading } = useMutation({
    type: unstake,
  });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${FTM_NETWORK_BY_ENV}`);
  const chainId = FTM_NETWORK_BY_ENV;

  const amount = commonData?.aFTMcBalance ?? ZERO;
  const pendingUnstakes = commonData?.certPendingUnstakes ?? ZERO;
  const isShowed =
    !amount.isZero() || isBalancesLoading || !pendingUnstakes.isZero();

  const nativeAmount = getTokenNativeAmount(amount, commonData?.aFTMcRatio);

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addFTMTokenToWallet(Token.aFTMc));
  }, [dispatchRequest]);

  return {
    amount,
    pendingUnstakes,
    network,
    chainId,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aFTMc, Token.FTM),
    isShowed,
    isBalancesLoading,
    stakeLink: RoutesConfig.stake.generatePath(Token.aFTMc),
    unstakeLink: RoutesConfig.unstake.generatePath(Token.aFTMc),
    isStakeLoading,
    isUnstakeLoading,
    walletName,
    address,
    ratio: commonData?.aFTMcRatio ?? ZERO,
    nativeAmount,
    handleAddTokenToWallet,
  };
};
