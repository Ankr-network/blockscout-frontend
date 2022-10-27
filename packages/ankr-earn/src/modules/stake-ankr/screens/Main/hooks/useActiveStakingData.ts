import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useGetActiveStakingDataQuery } from 'modules/stake-ankr/actions/getActiveStakingData';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { IActiveStakingData } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

import { CACHE_SECONDS } from '../../Providers/const';

interface IActiveStaking {
  isLoading: boolean;
  data: IActiveStakingData[] | undefined;
}

export const useActiveStakingData = (): IActiveStaking => {
  const { data: ankrPrice } = useGetAnkrPriceQuery(undefined, {
    refetchOnMountOrArgChange: CACHE_SECONDS,
  });

  const {
    data,
    isFetching: loading,
    refetch,
  } = useGetActiveStakingDataQuery(
    {
      usdPrice: ankrPrice ?? ZERO,
    },
    { refetchOnMountOrArgChange: CACHE_SECONDS },
  );

  // TODO remove it. Use cache tags instead of manual dispatch
  useProviderEffect(() => {
    refetch();
  }, [ankrPrice]);

  return {
    isLoading: loading,
    data,
  };
};
