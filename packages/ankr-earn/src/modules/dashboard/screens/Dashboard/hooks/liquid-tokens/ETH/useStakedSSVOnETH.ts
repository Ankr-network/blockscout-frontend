import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { getDashboardData } from 'modules/stake-ssv/actions/getDashboardData';

interface IUseStakedSSVOnETHData {
  isSSVOnETHDataLoading: boolean;
  isStakedSSVOnETHCertShowed: boolean;
}

export const useStakedSSVOnETH = (): IUseStakedSSVOnETHData => {
  const { data: dashboardData, loading: isSSVOnETHDataLoading } = useQuery({
    type: getDashboardData,
  });

  const isStakedSSVOnETHCertShowed = getIsBalancePositive(
    dashboardData?.asETHcBalance,
  );

  return {
    isSSVOnETHDataLoading,
    isStakedSSVOnETHCertShowed,
  };
};
