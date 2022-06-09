import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';
import { EEthereumNetworkId } from 'provider';

import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  ZERO,
  SupportedChainIDS,
  POLYGON_NETWORK_BY_ENV,
} from 'modules/common/const';
import { fetchAMATICCBridgedPolygon } from 'modules/dashboard/actions/fetchAMATICCBridgedPolygon';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';

export interface IStakedMaticData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isShowed: boolean;
  nativeAmount?: BigNumber;
  network: string;
  onAddTokenClick: () => void;
}

export const useBridgedMaticCertPolygon = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAMATICCBridgedPolygon,
  });

  const { data: commonData } = useQuery({
    type: fetchStats,
  });

  const dispatchRequest = useDispatchRequest();

  const network = t(`chain.${POLYGON_NETWORK_BY_ENV}`);
  const amount = statsData ?? ZERO;

  const chainId = POLYGON_NETWORK_BY_ENV;

  const isShowed = !amount.isZero() || isBalancesLoading;

  const nativeAmount = getTokenNativeAmount(amount, commonData?.aMATICcRatio);

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
    chainId,
    isBalancesLoading,
    isShowed,
    nativeAmount,
    network,
    onAddTokenClick,
  };
};
