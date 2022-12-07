import { ACTION_CACHE_SEC } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetBNBPendingValuesQuery } from 'modules/stake-bnb/actions/fetchPendingValues';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseStakedBNB {
  isStakedOldAEthShowed: boolean;
  isStakedBnbBondShowed: boolean;
  isStakedBnbCertShowed: boolean;
  isBnbCommonLoading: boolean;
}

export const useStakedBNB = (isSmallBalancesVisible = true): IUseStakedBNB => {
  const { data: bnbCommon, isFetching: isBnbCommonLoading } =
    useGetBNBStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: pendingValues, isFetching: isPendingUnstakeLoading } =
    useGetBNBPendingValuesQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const usdStakedOldAEthAmount = useGetUSDAmount(
    bnbCommon?.aETHBalance,
    EMetricsServiceName.BNB,
  );

  const usdStakedBnbBondAmount = useGetUSDAmount(
    bnbCommon?.aBNBbBalance,
    EMetricsServiceName.BNB,
  );

  const usdStakedBnbBondPendingAmount = useGetUSDAmount(
    pendingValues?.pendingAbnbbUnstakes,
    EMetricsServiceName.BNB,
  );

  const usdStakedBnbCertAmount = useGetUSDAmount(
    bnbCommon?.aBNBcBalance,
    EMetricsServiceName.BNB,
  );

  const usdStakedBnbCertPendingAmount = useGetUSDAmount(
    pendingValues?.pendingAbnbcUnstakes,
    EMetricsServiceName.BNB,
  );

  const isStakedOldAEthShowed = getIsBalancePositive(bnbCommon?.aETHBalance);

  const isStakedBnbBondShowed =
    getIsBalancePositive(bnbCommon?.aBNBbBalance) ||
    getIsBalancePositive(pendingValues?.pendingAbnbbUnstakes);

  const isStakedBnbCertShowed =
    getIsBalancePositive(bnbCommon?.aBNBcBalance) ||
    getIsBalancePositive(pendingValues?.pendingAbnbcUnstakes);

  return {
    isStakedOldAEthShowed: filterTokensBySmallBalance(
      [usdStakedOldAEthAmount],
      isStakedOldAEthShowed,
      isSmallBalancesVisible,
    ),
    isStakedBnbBondShowed: filterTokensBySmallBalance(
      [usdStakedBnbBondAmount, usdStakedBnbBondPendingAmount],
      isStakedBnbBondShowed,
      isSmallBalancesVisible,
    ),
    isStakedBnbCertShowed: filterTokensBySmallBalance(
      [usdStakedBnbCertAmount, usdStakedBnbCertPendingAmount],
      isStakedBnbCertShowed,
      isSmallBalancesVisible,
    ),
    isBnbCommonLoading: isPendingUnstakeLoading || isBnbCommonLoading,
  };
};
