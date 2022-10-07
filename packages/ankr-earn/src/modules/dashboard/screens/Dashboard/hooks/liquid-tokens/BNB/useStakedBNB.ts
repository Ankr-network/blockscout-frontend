import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { fetchPendingValues } from 'modules/stake-bnb/actions/fetchPendingValues';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';

interface IUseStakedBNB {
  isStakedOldAEthShowed: boolean;
  isStakedBnbBondShowed: boolean;
  isStakedBnbCertShowed: boolean;
  isBnbCommonLoading: boolean;
}

export const useStakedBNB = (): IUseStakedBNB => {
  const { data: bnbCommon, loading: isBnbCommonLoading } = useQuery({
    type: fetchStats,
  });

  const { data: pendingValues, loading: isPendingUnstakeLoading } = useQuery({
    type: fetchPendingValues,
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
