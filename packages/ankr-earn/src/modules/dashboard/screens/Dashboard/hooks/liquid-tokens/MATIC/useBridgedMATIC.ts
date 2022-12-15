import { useQuery } from '@redux-requests/react';

import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonCommonDataQuery';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseBridgedMATIC {
  isBridgedMaticBondBscLoading: boolean;
  isBridgedMaticBondBscShowed: boolean;
  isBridgedMaticBondPolygonShowed: boolean;
  isBridgedMaticCertBscLoading: boolean;
  isBridgedMaticCertBscShowed: boolean;
  isMaticPolygonCommonLoading: boolean;
}

export const useBridgedMATIC = (
  isSmallBalancesVisible = true,
): IUseBridgedMATIC => {
  const { data: maticPolygonCommon, isFetching: isMaticPolygonCommonLoading } =
    useGetMaticOnPolygonCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: bridgedMaticBondBsc, loading: isBridgedMaticBondBscLoading } =
    useQuery({
      type: fetchAMATICBBridgedBSC,
    });

  const { data: bridgedMaticCertBsc, loading: isBridgedMaticCertBscLoading } =
    useQuery({
      type: fetchAMATICCBridgedBSC,
    });

  const usdBridgedMaticBondBscAmount = useGetUSDAmount(
    bridgedMaticBondBsc ?? ZERO,
    EMetricsServiceName.MATIC,
  );

  const usdBridgedMaticCertBscAmount = useGetUSDAmount(
    bridgedMaticCertBsc ?? ZERO,
    EMetricsServiceName.MATIC,
  );

  const usdBridgedMaticBondPolygonAmount = useGetUSDAmount(
    maticPolygonCommon?.maticBondBalance,
    EMetricsServiceName.MATIC,
  );

  const isBridgedMaticBondPolygonShowed = getIsBalancePositive(
    maticPolygonCommon?.maticBondBalance,
  );

  const isBridgedMaticBondBscShowed = getIsBalancePositive(bridgedMaticBondBsc);

  const isBridgedMaticCertBscShowed = getIsBalancePositive(bridgedMaticCertBsc);

  return {
    isBridgedMaticBondBscShowed: filterTokensBySmallBalance(
      [usdBridgedMaticBondBscAmount],
      isBridgedMaticBondBscShowed,
      isSmallBalancesVisible,
    ),
    isBridgedMaticCertBscShowed: filterTokensBySmallBalance(
      [usdBridgedMaticCertBscAmount],
      isBridgedMaticCertBscShowed,
      isSmallBalancesVisible,
    ),
    isBridgedMaticBondPolygonShowed: filterTokensBySmallBalance(
      [usdBridgedMaticBondPolygonAmount],
      isBridgedMaticBondPolygonShowed,
      isSmallBalancesVisible,
    ),
    isBridgedMaticBondBscLoading,
    isBridgedMaticCertBscLoading,
    isMaticPolygonCommonLoading,
  };
};
