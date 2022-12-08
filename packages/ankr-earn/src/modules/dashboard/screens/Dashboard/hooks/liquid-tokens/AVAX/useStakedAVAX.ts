import { ACTION_CACHE_SEC } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetAVAXPendingValuesQuery } from 'modules/stake-avax/actions/fetchPendingValues';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseStakedAVAX {
  isStakedAvaxBondShowed: boolean;
  isStakedAvaxCertShowed: boolean;
  isAvaxCommonLoading: boolean;
}

export const useStakedAVAX = (
  isSmallBalancesVisible = true,
): IUseStakedAVAX => {
  const { data: avaxCommon, isFetching: isAvaxCommonLoading } =
    useGetAVAXCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });
  const { data: avaxPendingValues, isFetching: isAvaxPendingValuesLoading } =
    useGetAVAXPendingValuesQuery();

  const usdAAVAXbAmount = useGetUSDAmount(
    avaxCommon?.aAVAXbBalance,
    EMetricsServiceName.AVAX,
  );

  const usdAAVAXbUnstakedAmount = useGetUSDAmount(
    avaxPendingValues?.pendingAavaxbUnstakes,
    EMetricsServiceName.AVAX,
  );

  const usdAAVAXcAmount = useGetUSDAmount(
    avaxCommon?.aAVAXcBalance,
    EMetricsServiceName.AVAX,
  );

  const usdAAVAXcUnstakedAmount = useGetUSDAmount(
    avaxPendingValues?.pendingAavaxcUnstakes,
    EMetricsServiceName.AVAX,
  );

  const isStakedAvaxBondShowed =
    getIsBalancePositive(avaxCommon?.aAVAXbBalance) ||
    getIsBalancePositive(avaxPendingValues?.pendingAavaxbUnstakes);

  const isStakedAvaxCertShowed =
    getIsBalancePositive(avaxCommon?.aAVAXcBalance) ||
    getIsBalancePositive(avaxPendingValues?.pendingAavaxcUnstakes);

  return {
    isStakedAvaxBondShowed: filterTokensBySmallBalance(
      [usdAAVAXbAmount, usdAAVAXbUnstakedAmount],
      isStakedAvaxBondShowed,
      isSmallBalancesVisible,
    ),
    isStakedAvaxCertShowed: filterTokensBySmallBalance(
      [usdAAVAXcAmount, usdAAVAXcUnstakedAmount],
      isStakedAvaxCertShowed,
      isSmallBalancesVisible,
    ),
    isAvaxCommonLoading: isAvaxPendingValuesLoading || isAvaxCommonLoading,
  };
};
