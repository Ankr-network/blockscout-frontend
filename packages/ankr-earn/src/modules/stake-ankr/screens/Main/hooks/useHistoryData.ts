import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useGetHistoryDataQuery } from 'modules/stake-ankr/actions/getHistoryData';
import { IHistoryData } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IHistory {
  isLoading: boolean;
  data: IHistoryData[] | undefined;
}

export const useHistoryData = (): IHistory => {
  const { data, isFetching, refetch } = useGetHistoryDataQuery();

  // TODO remove it. Use cache tags instead of manual dispatch
  useProviderEffect(() => {
    refetch();
  }, []);

  return {
    isLoading: isFetching,
    data,
  };
};
