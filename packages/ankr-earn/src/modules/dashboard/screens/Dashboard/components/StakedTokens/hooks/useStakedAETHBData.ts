import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import {
  ETH_NETWORK_BY_ENV,
  ETH_SCALE_FACTOR,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import { addEth2SwapTokenToWallet } from 'modules/eth2Swap/actions/wallet';
import { t } from 'modules/i18n/utils/intl';

export interface IStakedAETHBData {
  amount: BigNumber;
  pendingValue: BigNumber;
  network: string;
  tradeLink: string;
  isShowed: boolean;
  isBalancesLoading: boolean;
  walletName?: string;
  address?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAETHBData = (): IStakedAETHBData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: getEth2SwapData,
  });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );
  const dispatchRequest = useDispatchRequest();

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);

  const amount = statsData?.aETHbBalance ?? ZERO;
  const pendingValue = ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addEth2SwapTokenToWallet({ swapOption: Token.aETHb }));
  }, [dispatchRequest]);

  return {
    amount: amount.dividedBy(ETH_SCALE_FACTOR),
    network,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aETHb, Token.ETH),
    isShowed,
    isBalancesLoading,
    walletName,
    address,
    handleAddTokenToWallet,
  };
};
