import { useQuery } from '@redux-requests/react';

import { ZERO } from 'modules/common/const';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseBridgedETH {
  isBridgedEthBondBscShowed: boolean;
  isBridgedEthCertBscShowed: boolean;
  isBridgedEthCertBSCLoading: boolean;
  isBridgedEthBondBSCLoading: boolean;
}

export const useBridgedETH = (
  isSmallBalancesVisible = true,
): IUseBridgedETH => {
  const { data: bridgedEthCertBSC, loading: isBridgedEthCertBSCLoading } =
    useQuery({
      type: fetchAETHCBridged,
    });

  const { data: bridgedEthBondBSC, loading: isBridgedEthBondBSCLoading } =
    useQuery({
      type: fetchAETHBBridged,
    });

  const amountEthCertBSC = bridgedEthCertBSC ?? ZERO;

  const usdEthCertBSCAmount = useGetUSDAmount(
    amountEthCertBSC,
    EMetricsServiceName.ETH,
  );

  const amountEthBondBSC = bridgedEthBondBSC ?? ZERO;

  const usdEthBondBSCAmount = useGetUSDAmount(
    amountEthBondBSC,
    EMetricsServiceName.ETH,
  );

  const isBridgedEthBondBscShowed = getIsBalancePositive(bridgedEthBondBSC);

  const isBridgedEthCertBscShowed = getIsBalancePositive(bridgedEthCertBSC);

  return {
    isBridgedEthBondBscShowed: filterTokensBySmallBalance(
      [usdEthBondBSCAmount],
      isBridgedEthBondBscShowed,
      isSmallBalancesVisible,
    ),
    isBridgedEthCertBscShowed: filterTokensBySmallBalance(
      [usdEthCertBSCAmount],
      isBridgedEthCertBscShowed,
      isSmallBalancesVisible,
    ),
    isBridgedEthCertBSCLoading,
    isBridgedEthBondBSCLoading,
  };
};
