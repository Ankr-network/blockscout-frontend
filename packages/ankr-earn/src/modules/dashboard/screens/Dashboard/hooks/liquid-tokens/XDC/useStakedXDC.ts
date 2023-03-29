import { ACTION_CACHE_SEC } from 'modules/common/const';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetXdcDashboardDataQuery } from 'modules/stake-xdc/actions/getDashboardData';

interface IUseStakedXDCData {
  isStakedXDCCertShowed: boolean;
  isXDCDataLoading: boolean;
}

export const useStakedXDC = (): IUseStakedXDCData => {
  const { data: dashboardData, isFetching: isXDCDataLoading } =
    useGetXdcDashboardDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const isStakedXDCCertShowed = getIsBalancePositive(
    dashboardData?.ankrXDCBalance,
  );

  // todo: update visibility state based on pending unstake amount

  return {
    isStakedXDCCertShowed,
    isXDCDataLoading,
  };
};
