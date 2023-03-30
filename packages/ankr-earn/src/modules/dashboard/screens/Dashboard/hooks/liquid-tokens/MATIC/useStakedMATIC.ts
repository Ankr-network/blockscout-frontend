import { ACTION_CACHE_SEC } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthStats';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/getMaticOnPolygonCommonData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

import { useStakedMaticTxHistory } from './useStakedMaticTxHistory';

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
  const { data: maticPolygonCommon, isFetching: isMaticPolygonCommonLoading } =
    useGetMaticOnPolygonCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: maticEthCommon, isFetching: isMaticEthCommonLoading } =
    useGetMaticOnEthStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { isHistoryDataLoading, pendingBondAmount, pendingCertAmount } =
    useStakedMaticTxHistory();

  const amountAMATICb = maticEthCommon?.aMATICbBalance;

  const usdAMATICbAmount = useGetUSDAmount(
    amountAMATICb,
    EMetricsServiceName.MATIC,
  );

  const usdAMATICbPendingAmount = useGetUSDAmount(
    pendingBondAmount,
    EMetricsServiceName.MATIC,
  );

  const amountAMATICc = maticEthCommon?.aMATICbBalance;

  const usdAMATICcAmount = useGetUSDAmount(
    amountAMATICc,
    EMetricsServiceName.MATIC,
  );

  const usdAMATICcPendingAmount = useGetUSDAmount(
    pendingCertAmount,
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
    getIsBalancePositive(pendingBondAmount);

  const isStakedMaticCertEthereumShowed =
    getIsBalancePositive(maticEthCommon?.aMATICcBalance) ||
    getIsBalancePositive(pendingCertAmount);

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
    isMaticEthCommonLoading: isMaticEthCommonLoading || isHistoryDataLoading,
  };
};
