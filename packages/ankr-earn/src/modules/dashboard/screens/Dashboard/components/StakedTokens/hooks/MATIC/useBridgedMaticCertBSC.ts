import { EEthereumNetworkId } from '@ankr.com/provider';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  ZERO,
  SupportedChainIDS,
  BSC_NETWORK_BY_ENV,
} from 'modules/common/const';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
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

export const useBridgedMaticCertBSC = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAMATICCBridgedBSC,
  });

  const { data: commonData } = useQuery({
    type: fetchStats,
  });

  const dispatchRequest = useDispatchRequest();

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);
  const amount = statsData ?? ZERO;

  const chainId = BSC_NETWORK_BY_ENV;

  const isShowed = !amount.isZero() || isBalancesLoading;

  const nativeAmount = getTokenNativeAmount(amount, commonData?.aMATICcRatio);

  const onAddTokenClick = () => {
    dispatchRequest(
      watchAsset({
        token: AvailableBridgeTokens.aMATICc,
        chainId: BSC_NETWORK_BY_ENV as unknown as SupportedChainIDS,
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
