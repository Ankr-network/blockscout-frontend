import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import {
  IExtendedUnstaking,
  useGetUnstakingDataQuery,
} from 'modules/stake-ankr/actions/getUnstakingData';

interface IUnstaking {
  isLoading: boolean;
  data: IExtendedUnstaking[] | undefined;
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
