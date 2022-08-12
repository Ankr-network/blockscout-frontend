import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getUnstakingData } from 'modules/stake-ankr/actions/getUnstakingData';
import { IUnstakingData } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IUnstaking {
  isLoading: boolean;
  data: IUnstakingData[] | null;
}

export const useUnstakingData = (): IUnstaking => {
  const dispatchRequest = useDispatchRequest();
  const { data: ankrPrice } = useQuery({
    type: getANKRPrice,
  });
  const { data, loading } = useQuery({
    type: getUnstakingData,
  });

  useProviderEffect(() => {
    dispatchRequest(
      getUnstakingData({
        usdPrice: ankrPrice ?? ZERO,
      }),
    );
  }, [dispatchRequest, ankrPrice]);

  return {
    isLoading: loading,
    data,
  };
};
