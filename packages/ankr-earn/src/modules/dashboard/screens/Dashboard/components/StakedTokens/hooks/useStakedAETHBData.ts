import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import {
  ETH_NETWORK_BY_ENV,
  ETH_SCALE_FACTOR,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import { t } from 'modules/i18n/utils/intl';

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

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);

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
