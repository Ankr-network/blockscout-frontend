import { ACTION_CACHE_SEC } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

import { useStakedBNBTxHistory } from './useStakedBNBTxHistory';

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

  const { isHistoryDataLoading, pendingBondAmount, pendingCertAmount } =
    useStakedBNBTxHistory();

  const usdStakedOldAEthAmount = useGetUSDAmount(
    bnbCommon?.aETHBalance,
    EMetricsServiceName.BNB,
  );

  const usdStakedBnbBondAmount = useGetUSDAmount(
    bnbCommon?.aBNBbBalance,
    EMetricsServiceName.BNB,
  );

  const usdStakedBnbBondPendingAmount = useGetUSDAmount(
    pendingBondAmount,
    EMetricsServiceName.BNB,
  );

  const usdStakedBnbCertAmount = useGetUSDAmount(
    bnbCommon?.aBNBcBalance,
    EMetricsServiceName.BNB,
  );

  const usdStakedBnbCertPendingAmount = useGetUSDAmount(
    pendingCertAmount,
    EMetricsServiceName.BNB,
  );

  const isStakedOldAEthShowed = getIsBalancePositive(bnbCommon?.aETHBalance);

  const isStakedBnbBondShowed =
    getIsBalancePositive(bnbCommon?.aBNBbBalance) ||
    getIsBalancePositive(pendingBondAmount);

  const isStakedBnbCertShowed =
    getIsBalancePositive(bnbCommon?.aBNBcBalance) ||
    getIsBalancePositive(pendingCertAmount);

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
    isBnbCommonLoading: isHistoryDataLoading || isBnbCommonLoading,
  };
};
