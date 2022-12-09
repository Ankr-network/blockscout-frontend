import { ACTION_CACHE_SEC } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseStakedFTM {
  isFtmCommonLoading: boolean;
  isStakedFtmCertShowed: boolean;
  isStakedFtmBondShowed: boolean;
}

export const useStakedFTM = (isSmallBalancesVisible = true): IUseStakedFTM => {
  const { data: ftmCommon, isFetching: isFtmCommonLoading } =
    useGetFTMCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const usdaFTMcAmount = useGetUSDAmount(
    ftmCommon?.aFTMcBalance,
    EMetricsServiceName.FTM,
  );

  const usdaFTMcPendingAmount = useGetUSDAmount(
    ftmCommon?.certPendingUnstakes,
    EMetricsServiceName.FTM,
  );

  const usdaFTMbAmount = useGetUSDAmount(
    ftmCommon?.aFTMbBalance,
    EMetricsServiceName.FTM,
  );

  const usdaFTMbPendingAmount = useGetUSDAmount(
    ftmCommon?.bondPendingUnstakes,
    EMetricsServiceName.FTM,
  );

  const isStakedFtmCertShowed =
    getIsBalancePositive(ftmCommon?.aFTMcBalance) ||
    getIsBalancePositive(ftmCommon?.certPendingUnstakes);

  const isStakedFtmBondShowed =
    getIsBalancePositive(ftmCommon?.aFTMbBalance) ||
    getIsBalancePositive(ftmCommon?.bondPendingUnstakes);

  return {
    isStakedFtmCertShowed: filterTokensBySmallBalance(
      [usdaFTMcAmount, usdaFTMcPendingAmount],
      isStakedFtmCertShowed,
      isSmallBalancesVisible,
    ),
    isStakedFtmBondShowed: filterTokensBySmallBalance(
      [usdaFTMbAmount, usdaFTMbPendingAmount],
      isStakedFtmBondShowed,
      isSmallBalancesVisible,
    ),
    isFtmCommonLoading,
  };
};
