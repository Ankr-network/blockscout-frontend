import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { fetchPendingValues } from 'modules/stake-avax/actions/fetchPendingValues';
import { fetchStats } from 'modules/stake-avax/actions/fetchStats';

interface IUseStakedAVAX {
  isStakedAvaxBondShowed: boolean;
  isStakedAvaxCertShowed: boolean;
  isAvaxCommonLoading: boolean;
}

export const useStakedAVAX = (): IUseStakedAVAX => {
  const { data: avaxCommon, loading: isAvaxCommonLoading } = useQuery({
    type: fetchStats,
  });

  const { data: avaxPendingValues, loading: isAvaxPendingValuesLoading } =
    useQuery({
      type: fetchPendingValues,
    });

  const isStakedAvaxBondShowed =
    getIsBalancePositive(avaxCommon?.aAVAXbBalance) ||
    getIsBalancePositive(avaxPendingValues?.pendingAavaxbUnstakes);

  const isStakedAvaxCertShowed =
    getIsBalancePositive(avaxCommon?.aAVAXcBalance) ||
    getIsBalancePositive(avaxPendingValues?.pendingAavaxcUnstakes);

  return {
    isStakedAvaxBondShowed,
    isStakedAvaxCertShowed,
    isAvaxCommonLoading: isAvaxPendingValuesLoading || isAvaxCommonLoading,
  };
};
