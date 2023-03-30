import { skipToken } from '@reduxjs/toolkit/query';

import { featuresConfig } from 'modules/common/const';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetDashboardDataQuery } from 'modules/stake-ssv/actions/getDashboardData';

interface IUseStakedSSVOnETHData {
  isSSVOnETHDataLoading: boolean;
  isStakedSSVOnETHCertShowed: boolean;
}

export const useStakedSSVOnETH = (): IUseStakedSSVOnETHData => {
  const { data: dashboardData, isLoading: isSSVOnETHDataLoading } =
    useGetDashboardDataQuery(featuresConfig.ssvStaking ? undefined : skipToken);

  const isStakedSSVOnETHCertShowed = getIsBalancePositive(
    dashboardData?.asETHcBalance,
  );

  return {
    isSSVOnETHDataLoading,
    isStakedSSVOnETHCertShowed,
  };
};
