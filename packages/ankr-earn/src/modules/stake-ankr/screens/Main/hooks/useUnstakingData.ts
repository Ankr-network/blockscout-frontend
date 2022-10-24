import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetUnstakingDataQuery } from 'modules/stake-ankr/actions/getUnstakingData';
import { IUnstakingData } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IUnstaking {
  isLoading: boolean;
  data: IUnstakingData[] | undefined;
}

export const useUnstakingData = (): IUnstaking => {
  const { data: ankrPrice } = useGetAnkrPriceQuery();
  const {
    data,
    isFetching: loading,
    refetch,
  } = useGetUnstakingDataQuery({
    usdPrice: ankrPrice ?? ZERO,
  });

  // TODO remove it. Use cache tags instead of manual dispatch
  useProviderEffect(() => {
    refetch();
  }, []);

  return {
    isLoading: loading,
    data,
  };
};
