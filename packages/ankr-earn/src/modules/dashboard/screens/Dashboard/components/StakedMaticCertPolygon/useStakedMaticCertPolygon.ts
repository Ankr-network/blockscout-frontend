import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { EEthereumNetworkId, t } from 'common';

import { POLYGON_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { getCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { RoutesConfig as MaticStakingRoutes } from 'modules/stake-matic/polygon/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

const token = Token.aMATICc;

export interface IUseStakedMaticCertPolygon {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isLoading: boolean;
  isStakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  stakeLink: string;
  token: Token;
  unstakeLink?: string;
  tradeLink: string;
  usdAmount?: BigNumber;
}

export const useStakedMaticCertPolygon = (): IUseStakedMaticCertPolygon => {
  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const ratio = commonData?.ratio ?? ZERO;

  const network = t(`chain.${POLYGON_NETWORK_BY_ENV}`);
  const chainId = POLYGON_NETWORK_BY_ENV;

  const amount = commonData?.maticCertBalance ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.MATIC]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.MATIC]?.totalStakedUsd,
        ratio,
      }),
    [amount, ratio, metrics],
  );

  const nativeAmount = getTokenNativeAmount(amount, ratio);

  return {
    amount,
    chainId,
    isLoading: isCommonDataLoading,
    isStakeLoading: false,
    nativeAmount,
    network,
    stakeLink: MaticStakingRoutes.stake.generatePath(token),
    token,
    unstakeLink: MaticStakingRoutes.unstake.generatePath(token),
    tradeLink: DefiRoutes.defi.generatePath(token),
    usdAmount,
  };
};
