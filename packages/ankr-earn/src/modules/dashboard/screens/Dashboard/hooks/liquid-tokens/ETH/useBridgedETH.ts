import { useQuery } from '@redux-requests/react';

import { ZERO } from 'modules/common/const';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { useFetchAETHBBridgedAVAXQuery } from 'modules/dashboard/actions/fetchAETHBBridgedAVAX';
import { useFetchAETHBBridgedFTMQuery } from 'modules/dashboard/actions/fetchAETHBBridgedFTM';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseBridgedETH {
  isBridgedEthBondBscShowed: boolean;
  isBridgedEthAvaxShowed: boolean;
  isBridgedEthFtmShowed: boolean;
  isBridgedEthCertBscShowed: boolean;
  isBridgedEthCertBSCLoading: boolean;
  isBridgedEthBondBSCLoading: boolean;
  isBridgedEthAVAXLoading: boolean;
  isBridgedEthFTMLoading: boolean;
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

  const { data: bridgedEthAVAX, isLoading: isBridgedEthAVAXLoading } =
    useFetchAETHBBridgedAVAXQuery();

  const { data: bridgedEthFTM, isLoading: isBridgedEthFTMLoading } =
    useFetchAETHBBridgedFTMQuery();

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

  const amountEthAVAX = bridgedEthAVAX ?? ZERO;

  const usdEthAVAXAmount = useGetUSDAmount(
    amountEthAVAX,
    EMetricsServiceName.ETH,
  );

  const amountEthFTM = bridgedEthFTM ?? ZERO;

  const usdEthFTMAmount = useGetUSDAmount(
    amountEthFTM,
    EMetricsServiceName.ETH,
  );

  const isBridgedEthBondBscShowed = getIsBalancePositive(bridgedEthBondBSC);

  const isBridgedEthAvaxShowed = getIsBalancePositive(bridgedEthAVAX);

  const isBridgedEthFtmShowed = getIsBalancePositive(bridgedEthFTM);

  const isBridgedEthCertBscShowed = getIsBalancePositive(bridgedEthCertBSC);

  return {
    isBridgedEthBondBscShowed: filterTokensBySmallBalance(
      [usdEthBondBSCAmount],
      isBridgedEthBondBscShowed,
      isSmallBalancesVisible,
    ),
    isBridgedEthAvaxShowed: filterTokensBySmallBalance(
      [usdEthAVAXAmount],
      isBridgedEthAvaxShowed,
      isSmallBalancesVisible,
    ),
    isBridgedEthFtmShowed: filterTokensBySmallBalance(
      [usdEthFTMAmount],
      isBridgedEthFtmShowed,
      isSmallBalancesVisible,
    ),
    isBridgedEthCertBscShowed: filterTokensBySmallBalance(
      [usdEthCertBSCAmount],
      isBridgedEthCertBscShowed,
      isSmallBalancesVisible,
    ),
    isBridgedEthCertBSCLoading,
    isBridgedEthBondBSCLoading,
    isBridgedEthAVAXLoading,
    isBridgedEthFTMLoading,
  };
};
