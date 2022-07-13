import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from '@ankr.com/provider';
import { t } from 'common';

import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  ZERO,
  SupportedChainIDS,
  BSC_NETWORK_BY_ENV,
} from 'modules/common/const';
import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';

export interface IStakedMaticData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  network: string;
  isBalancesLoading: boolean;
  isShowed: boolean;
  onAddTokenClick: () => void;
}

export const useBridgedMaticBondBSC = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAMATICBBridgedBSC,
  });

  const dispatchRequest = useDispatchRequest();

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);
  const amount = statsData ?? ZERO;

  const chainId = BSC_NETWORK_BY_ENV;

  const isShowed = !amount.isZero() || isBalancesLoading;

  const onAddTokenClick = () => {
    dispatchRequest(
      watchAsset({
        token: AvailableBridgeTokens.aMATICb,
        chainId: BSC_NETWORK_BY_ENV as unknown as SupportedChainIDS,
      }),
    );
  };

  return {
    amount,
    chainId,
    isBalancesLoading,
    isShowed,
    network,
    onAddTokenClick,
  };
};
