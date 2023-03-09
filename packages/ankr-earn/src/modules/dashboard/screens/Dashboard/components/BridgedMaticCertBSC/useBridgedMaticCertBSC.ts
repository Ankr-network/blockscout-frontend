import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { useAddBridgeTokenToWalletMutation } from 'modules/bridge/actions/addBridgeTokenToWallet';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  ACTION_CACHE_SEC,
  BSC_NETWORK_BY_ENV,
  POLYGON_NETWORK_BY_ENV,
  SupportedChainIDS,
  ZERO,
} from 'modules/common/const';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthStats';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IStakedMaticData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  usdAmount?: BigNumber;
  onAddTokenClick: () => void;
}

export const useBridgedMaticCertBSC = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAMATICCBridgedBSC,
  });

  const { data: commonData } = useGetMaticOnEthStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);
  const chainId = BSC_NETWORK_BY_ENV;

  const amount = statsData ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.MATIC]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.MATIC]?.totalStakedUsd,
        ratio: commonData?.aMATICcRatio,
      }),
    [amount, commonData?.aMATICcRatio, metrics],
  );

  const nativeAmount = getTokenNativeAmount(amount, commonData?.aMATICcRatio);

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
    isBalancesLoading,
    nativeAmount,
    network,
    usdAmount,
    onAddTokenClick,
  };
};
