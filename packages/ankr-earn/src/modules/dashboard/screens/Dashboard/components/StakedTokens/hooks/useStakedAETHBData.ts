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
import { ETH_NETWORK_BY_ENV, featuresConfig, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { addEth2SwapTokenToWallet } from 'modules/eth2Swap/actions/wallet';
import { t } from 'modules/i18n/utils/intl';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stake } from 'modules/stake-eth/actions/stake';
import { RoutesConfig } from 'modules/stake-eth/Routes';

export interface IStakedAETHBData {
  amount: BigNumber;
  pendingValue: BigNumber;
  network: string;
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

  const amount = statsData?.aETHbBalance ?? ZERO;
  const pendingValue = ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addEth2SwapTokenToWallet({ swapOption: Token.aETHb }));
  }, [dispatchRequest]);

  return {
    amount,
    network,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aETHb, Token.ETH),
    isShowed,
    isBalancesLoading,
    walletName,
    address,
    stakeLink: featuresConfig.stakeETH
      ? RoutesConfig.stake.generatePath(Token.aETHb)
      : undefined,
    isStakeLoading,
    handleAddTokenToWallet,
  };
};
