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
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stake } from 'modules/stake-eth/actions/stake';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { addSwitcherTokenToWallet } from 'modules/switcher/actions/wallet';

export interface IStakedAETHBData {
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
  handleAddTokenToWallet: () => void;
}

export const useStakedAETHBData = (): IStakedAETHBData => {
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

  const amount = statsData?.aETHbBalance ?? ZERO;
  const pendingValue = ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(
      addSwitcherTokenToWallet({ chainId, swapOption: Token.aETHb }),
    );
  }, [chainId, dispatchRequest]);

  return {
    amount,
    network,
    chainId,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aETHb, Token.ETH),
    isShowed,
    isBalancesLoading,
    walletName,
    address,
    stakeLink: RoutesConfig.stake.generatePath(Token.aETHb),
    isStakeLoading,
    handleAddTokenToWallet,
  };
};
