import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getActiveStakingData } from 'modules/stake-ankr/actions/getActiveStakingData';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { IActiveStakingData } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IActiveStaking {
  isLoading: boolean;
  data: IActiveStakingData[] | null;
}

export const useActiveStakingData = (): IActiveStaking => {
  const dispatchRequest = useDispatchRequest();
  const { data: ankrPrice } = useQuery({
    type: getANKRPrice,
  });
  const { data, loading } = useQuery({
    type: getActiveStakingData,
  });

  useProviderEffect(() => {
    dispatchRequest(
      getActiveStakingData({
        usdPrice: ankrPrice ?? ZERO,
      }),
    );
  }, [dispatchRequest, ankrPrice]);

  return {
    isLoading: loading,
    data,
  };
};
