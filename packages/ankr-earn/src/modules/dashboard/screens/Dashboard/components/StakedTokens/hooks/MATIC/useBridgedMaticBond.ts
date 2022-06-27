import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';
import { EEthereumNetworkId } from 'provider';

import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  POLYGON_NETWORK_BY_ENV,
  ZERO,
  SupportedChainIDS,
} from 'modules/common/const';
import { fetchAMATICBBridged } from 'modules/dashboard/actions/fetchAMATICBBridged';

export interface IStakedMaticData {
  amount: BigNumber;
  network: string;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isShowed: boolean;
  onAddTokenClick: () => void;
}

export const useBridgedMaticBond = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAMATICBBridged,
  });

  const dispatchRequest = useDispatchRequest();

  const network = t(`chain.${POLYGON_NETWORK_BY_ENV}`);
  const chainId = POLYGON_NETWORK_BY_ENV;
  const amount = statsData ?? ZERO;

  const isShowed = !amount.isZero() || isBalancesLoading;

  const onAddTokenClick = () => {
    dispatchRequest(
      watchAsset({
        token: AvailableBridgeTokens.aMATICb,
        chainId: POLYGON_NETWORK_BY_ENV as unknown as SupportedChainIDS,
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
