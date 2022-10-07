import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';

interface IUseStakedFTM {
  isFtmCommonLoading: boolean;
  isStakedFtmCertShowed: boolean;
  isStakedFtmBondShowed: boolean;
}

export const useStakedFTM = (): IUseStakedFTM => {
  const { data: ftmCommon, loading: isFtmCommonLoading } = useQuery({
    type: getCommonData,
  });

  const isStakedFtmCertShowed =
    getIsBalancePositive(ftmCommon?.aFTMcBalance) ||
    getIsBalancePositive(ftmCommon?.certPendingUnstakes);

  const isStakedFtmBondShowed =
    getIsBalancePositive(ftmCommon?.aFTMbBalance) ||
    getIsBalancePositive(ftmCommon?.bondPendingUnstakes);

  return {
    isStakedFtmCertShowed,
    isStakedFtmBondShowed,
    isFtmCommonLoading,
  };
};
