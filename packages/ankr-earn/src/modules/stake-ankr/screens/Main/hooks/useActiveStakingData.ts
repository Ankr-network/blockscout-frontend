import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getActiveStakingData } from 'modules/stake-ankr/actions/getActiveStakingData';
import { IActiveStakingData } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IActiveStaking {
  isLoading: boolean;
  data: IActiveStakingData[] | null;
}

export const useActiveStakingData = (): IActiveStaking => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading } = useQuery({
    type: getActiveStakingData,
  });

  useProviderEffect(() => {
    dispatchRequest(getActiveStakingData());
  }, [dispatchRequest]);

  return {
    isLoading: loading,
    data,
  };
};
