import { ACTION_CACHE_SEC } from 'modules/common/const';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/fetchCommonData';
import { useGetAVAXPendingValuesQuery } from 'modules/stake-avax/actions/fetchPendingValues';

interface IUseStakedAVAX {
  isStakedAvaxBondShowed: boolean;
  isStakedAvaxCertShowed: boolean;
  isAvaxCommonLoading: boolean;
}

export const useStakedAVAX = (): IUseStakedAVAX => {
  const { data: avaxCommon, isFetching: isAvaxCommonLoading } =
    useGetAVAXCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });
  const { data: avaxPendingValues, isFetching: isAvaxPendingValuesLoading } =
    useGetAVAXPendingValuesQuery();

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
