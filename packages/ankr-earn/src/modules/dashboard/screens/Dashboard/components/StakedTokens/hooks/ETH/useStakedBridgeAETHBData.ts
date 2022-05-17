import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';
import { EEthereumNetworkId } from 'provider';

import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  BSC_NETWORK_BY_ENV,
  ZERO,
  SupportedChainIDS,
} from 'modules/common/const';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';

export interface IStakedAETHBData {
  amount: BigNumber;
  network: string;
  chainId: EEthereumNetworkId;
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
  const chainId = BSC_NETWORK_BY_ENV;
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
    chainId,
    isBalancesLoading,
    isShowed,
    onAddTokenClick,
  };
};
