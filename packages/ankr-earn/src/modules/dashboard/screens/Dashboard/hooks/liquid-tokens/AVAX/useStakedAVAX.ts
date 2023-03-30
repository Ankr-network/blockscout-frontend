import { ACTION_CACHE_SEC } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

import { useStakedAVAXTxHistory } from './useStakedAVAXTxHistory';

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

  const { isHistoryDataLoading, pendingBondAmount, pendingCertAmount } =
    useStakedAVAXTxHistory();

  const usdAAVAXbAmount = useGetUSDAmount(
    avaxCommon?.aAVAXbBalance,
    EMetricsServiceName.AVAX,
  );

  const usdAAVAXbUnstakedAmount = useGetUSDAmount(
    pendingBondAmount,
    EMetricsServiceName.AVAX,
  );

  const usdAAVAXcAmount = useGetUSDAmount(
    avaxCommon?.aAVAXcBalance,
    EMetricsServiceName.AVAX,
  );

  const usdAAVAXcUnstakedAmount = useGetUSDAmount(
    pendingCertAmount,
    EMetricsServiceName.AVAX,
  );

  const isStakedAvaxBondShowed =
    getIsBalancePositive(avaxCommon?.aAVAXbBalance) ||
    getIsBalancePositive(pendingBondAmount);

  const isStakedAvaxCertShowed =
    getIsBalancePositive(avaxCommon?.aAVAXcBalance) ||
    getIsBalancePositive(pendingCertAmount);

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
    isAvaxCommonLoading: isHistoryDataLoading || isAvaxCommonLoading,
  };
};
