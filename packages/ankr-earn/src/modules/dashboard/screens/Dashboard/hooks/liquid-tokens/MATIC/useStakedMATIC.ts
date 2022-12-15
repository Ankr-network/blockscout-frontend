import { useQuery } from '@redux-requests/react';

import { ACTION_CACHE_SEC } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';
import { getCommonData as getMaticPolygonCommon } from 'modules/stake-matic/polygon/actions/getCommonData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseStakedMATIC {
  isStakedMaticCertPolygonShowed: boolean;
  isStakedMaticBondEthereumShowed: boolean;
  isStakedMaticCertEthereumShowed: boolean;
  isMaticPolygonCommonLoading: boolean;
  isMaticEthCommonLoading: boolean;
}

export const useStakedMATIC = (
  isSmallBalancesVisible = true,
): IUseStakedMATIC => {
  const { data: maticPolygonCommon, loading: isMaticPolygonCommonLoading } =
    useQuery({
      type: getMaticPolygonCommon,
    });

  const { data: maticEthCommon, isFetching: isMaticEthCommonLoading } =
    useGetMaticOnEthStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const amountAMATICb = maticEthCommon?.aMATICbBalance;

  const usdAMATICbAmount = useGetUSDAmount(
    amountAMATICb,
    EMetricsServiceName.MATIC,
  );

  const usdAMATICbPendingAmount = useGetUSDAmount(
    maticEthCommon?.pendingBond,
    EMetricsServiceName.MATIC,
  );

  const amountAMATICc = maticEthCommon?.aMATICbBalance;

  const usdAMATICcAmount = useGetUSDAmount(
    amountAMATICc,
    EMetricsServiceName.MATIC,
  );

  const usdAMATICcPendingAmount = useGetUSDAmount(
    maticEthCommon?.pendingCertificate,
    EMetricsServiceName.MATIC,
  );

  const usdAMATICCertAmount = useGetUSDAmount(
    maticPolygonCommon?.maticCertBalance,
    EMetricsServiceName.MATIC,
  );

  const isStakedMaticCertPolygonShowed = getIsBalancePositive(
    maticPolygonCommon?.maticCertBalance,
  );

  const isStakedMaticBondEthereumShowed =
    getIsBalancePositive(maticEthCommon?.aMATICbBalance) ||
    getIsBalancePositive(maticEthCommon?.pendingBond);

  const isStakedMaticCertEthereumShowed =
    getIsBalancePositive(maticEthCommon?.aMATICcBalance) ||
    getIsBalancePositive(maticEthCommon?.pendingCertificate);

  return {
    isStakedMaticCertPolygonShowed: filterTokensBySmallBalance(
      [usdAMATICCertAmount],
      isStakedMaticCertPolygonShowed,
      isSmallBalancesVisible,
    ),
    isStakedMaticBondEthereumShowed: filterTokensBySmallBalance(
      [usdAMATICbAmount, usdAMATICbPendingAmount],
      isStakedMaticBondEthereumShowed,
      isSmallBalancesVisible,
    ),
    isStakedMaticCertEthereumShowed: filterTokensBySmallBalance(
      [usdAMATICcAmount, usdAMATICcPendingAmount],
      isStakedMaticCertEthereumShowed,
      isSmallBalancesVisible,
    ),
    isMaticPolygonCommonLoading,
    isMaticEthCommonLoading,
  };
};
