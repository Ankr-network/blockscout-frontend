import { ACTION_CACHE_SEC } from 'modules/common/const';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';

interface IUseStakedFTM {
  isFtmCommonLoading: boolean;
  isStakedFtmCertShowed: boolean;
  isStakedFtmBondShowed: boolean;
}

export const useStakedFTM = (): IUseStakedFTM => {
  const { data: ftmCommon, isFetching: isFtmCommonLoading } =
    useGetFTMCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
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
