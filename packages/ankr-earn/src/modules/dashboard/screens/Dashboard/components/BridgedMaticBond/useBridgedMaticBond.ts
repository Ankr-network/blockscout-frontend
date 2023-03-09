import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { useAddBridgeTokenToWalletMutation } from 'modules/bridge/actions/addBridgeTokenToWallet';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  ACTION_CACHE_SEC,
  POLYGON_NETWORK_BY_ENV,
  SupportedChainIDS,
  ZERO,
} from 'modules/common/const';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/getMaticOnPolygonCommonData';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IStakedMaticData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  network: string;
  usdAmount?: BigNumber;
  onAddTokenClick: () => void;
}

export const useBridgedMaticBond = (): IStakedMaticData => {
  const { data: commonData, isFetching: isCommonDataLoading } =
    useGetMaticOnPolygonCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const network = t(`chain.${POLYGON_NETWORK_BY_ENV}`);
  const chainId = POLYGON_NETWORK_BY_ENV;

  const amount = commonData?.maticBondBalance ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.MATIC]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.MATIC]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  const [addBridgeTokenToWallet] = useAddBridgeTokenToWalletMutation();

  const onAddTokenClick = useCallback(() => {
    addBridgeTokenToWallet({
      token: AvailableBridgeTokens.aMATICb,
      chainId: POLYGON_NETWORK_BY_ENV as unknown as SupportedChainIDS,
    });
  }, [addBridgeTokenToWallet]);

  return {
    amount,
    chainId,
    isBalancesLoading: isCommonDataLoading,
    network,
    usdAmount,
    onAddTokenClick,
  };
};
