import { ACTION_CACHE_SEC } from 'modules/common/const';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetBNBPendingValuesQuery } from 'modules/stake-bnb/actions/fetchPendingValues';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';

interface IUseStakedBNB {
  isStakedOldAEthShowed: boolean;
  isStakedBnbBondShowed: boolean;
  isStakedBnbCertShowed: boolean;
  isBnbCommonLoading: boolean;
}

export const useStakedBNB = (): IUseStakedBNB => {
  const { data: bnbCommon, isFetching: isBnbCommonLoading } =
    useGetBNBStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: pendingValues, isFetching: isPendingUnstakeLoading } =
    useGetBNBPendingValuesQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const isStakedOldAEthShowed = getIsBalancePositive(bnbCommon?.aETHBalance);

  const isStakedBnbBondShowed =
    getIsBalancePositive(bnbCommon?.aBNBbBalance) ||
    getIsBalancePositive(pendingValues?.pendingAbnbbUnstakes);

  const isStakedBnbCertShowed =
    getIsBalancePositive(bnbCommon?.aBNBcBalance) ||
    getIsBalancePositive(pendingValues?.pendingAbnbcUnstakes);

  return {
    isStakedOldAEthShowed,
    isStakedBnbBondShowed,
    isStakedBnbCertShowed,
    isBnbCommonLoading: isPendingUnstakeLoading || isBnbCommonLoading,
  };
};
