import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from 'provider';

import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  ZERO,
  SupportedChainIDS,
  POLYGON_NETWORK_BY_ENV,
} from 'modules/common/const';
import { fetchAMATICCBridgedPolygon } from 'modules/dashboard/actions/fetchAMATICCBridgedPolygon';
import { t } from 'modules/i18n/utils/intl';

export interface IStakedMaticData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  network: string;
  isBalancesLoading: boolean;
  isShowed: boolean;
  onAddTokenClick: () => void;
}

export const useStakedBridgeAMATICCPolygon = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAMATICCBridgedPolygon,
  });

  const dispatchRequest = useDispatchRequest();

  const network = t(`chain.${POLYGON_NETWORK_BY_ENV}`);
  const amount = statsData ?? ZERO;

  const chainId = POLYGON_NETWORK_BY_ENV;

  const isShowed = !amount.isZero() || isBalancesLoading;

  const onAddTokenClick = () => {
    dispatchRequest(
      watchAsset({
        token: AvailableBridgeTokens.aMATICc,
        chainId: POLYGON_NETWORK_BY_ENV as unknown as SupportedChainIDS,
      }),
    );
  };

  return {
    amount,
    network,
    isBalancesLoading,
    isShowed,
    onAddTokenClick,
    chainId,
  };
};
