import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import {
  IActiveStakingData,
  useLazyGetActiveStakingDataQuery,
} from 'modules/stake-ankr/actions/getActiveStakingData';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';

import { CACHE_SECONDS } from '../../Providers/const';

interface IActiveStaking {
  isLoading: boolean;
  data: IActiveStakingData[] | undefined;
}

export const useActiveStakingData = (): IActiveStaking => {
  const { data: ankrPrice } = useGetAnkrPriceQuery(undefined, {
    refetchOnMountOrArgChange: CACHE_SECONDS,
  });

  const [getActiveStaking, { data, isFetching: isLoading }] =
    useLazyGetActiveStakingDataQuery();

  // TODO remove it. Use cache tags instead of manual dispatch
  useProviderEffect(() => {
    if (ankrPrice) {
      getActiveStaking();
    }
  }, [ankrPrice]);

  return {
    isLoading,
    data,
  };
};
