import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  BSC_NETWORK_BY_ENV,
  ZERO,
  SupportedChainIDS,
} from 'modules/common/const';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { t } from 'modules/i18n/utils/intl';

export interface IStakedAETHBData {
  amount: BigNumber;
  network: string;
  isBalancesLoading: boolean;
  isShowed: boolean;
  onAddTokenClick: () => void;
}

export const useStakedBridgeAETHBData = (): IStakedAETHBData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAETHBBridged,
  });

  const dispatchRequest = useDispatchRequest();

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);
  const amount = statsData ?? ZERO;

  const isShowed = !amount.isZero() || isBalancesLoading;

  const onAddTokenClick = () => {
    dispatchRequest(
      watchAsset({
        token: AvailableBridgeTokens.aETHb,
        chainId: BSC_NETWORK_BY_ENV as unknown as SupportedChainIDS,
      }),
    );
  };

  return {
    amount,
    network,
    isBalancesLoading,
    isShowed,
    onAddTokenClick,
  };
};
