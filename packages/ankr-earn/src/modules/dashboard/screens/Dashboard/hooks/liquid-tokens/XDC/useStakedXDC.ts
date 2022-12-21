import { ACTION_CACHE_SEC } from 'modules/common/const';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetDashboardDataQuery } from 'modules/stake-xdc/actions/getDashboardData';

interface IUseStakedXDCData {
  isStakedXDCCertShowed: boolean;
  isXDCDataLoading: boolean;
}

export const useStakedXDC = (): IUseStakedXDCData => {
  const { data: dashboardData, isFetching: isXDCDataLoading } =
    useGetDashboardDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const isStakedXDCCertShowed = getIsBalancePositive(
    dashboardData?.ankrXDCBalance,
  );

  return {
    isStakedXDCCertShowed,
    isXDCDataLoading,
  };
};
