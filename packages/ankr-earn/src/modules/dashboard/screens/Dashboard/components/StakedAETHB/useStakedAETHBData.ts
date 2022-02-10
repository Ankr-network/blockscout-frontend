import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from 'provider/providerManager/types';
import { ETH_SCALE_FACTOR, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { t } from 'modules/i18n/utils/intl';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';

export interface IStakedAETHBData {
  amount: BigNumber;
  pendingValue: BigNumber;
  network: string;
  tradeLink: string;
  isShowed: boolean;
  isBalancesLoading: boolean;
}

export const useStakedAETHBData = (): IStakedAETHBData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: getEth2SwapData,
  });

  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const network = t(`chain.${chainId}`);

  const amount = statsData?.fethBalance ?? ZERO;
  const pendingValue = ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  return {
    amount: amount.dividedBy(ETH_SCALE_FACTOR),
    network,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aETHb, Token.ETH),
    isShowed,
    isBalancesLoading,
  };
};
