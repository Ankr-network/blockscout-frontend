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
import { ETH_NETWORK_BY_ENV, featuresConfig, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stake } from 'modules/stake-eth/actions/stake';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { addSwitcherTokenToWallet } from 'modules/switcher/actions/wallet';

export interface IStakedAETHCData {
  amount: BigNumber;
  pendingValue: BigNumber;
  network: string;
  chainId: EEthereumNetworkId;
  tradeLink: string;
  isShowed: boolean;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  stakeLink?: string;
  walletName?: string;
  address?: string;
  nativeAmount?: BigNumber;
  handleAddTokenToWallet: () => void;
}

export const useStakedAETHCData = (): IStakedAETHCData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: getCommonData,
  });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );
  const dispatchRequest = useDispatchRequest();
  const { loading: isStakeLoading } = useMutation({ type: stake });

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);
  const chainId = ETH_NETWORK_BY_ENV;

  const amount = statsData?.aETHcBalance ?? ZERO;
  const pendingValue = ZERO;
  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const nativeAmount =
    featuresConfig.dashboardNativeAmount && statsData
      ? amount.dividedBy(statsData.aETHcRatio)
      : undefined;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(
      addSwitcherTokenToWallet({ chainId, swapOption: Token.aETHc }),
    );
  }, [chainId, dispatchRequest]);

  return {
    amount,
    network,
    chainId,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aETHc, Token.ETH),
    isShowed,
    isBalancesLoading,
    stakeLink: RoutesConfig.stake.generatePath(Token.aETHc),
    isStakeLoading,
    walletName,
    address,
    nativeAmount,
    handleAddTokenToWallet,
  };
};
