import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getUnstakingData } from 'modules/stake-ankr/actions/getUnstakingData';
import { IUnstakingData } from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IUnstaking {
  isLoading: boolean;
  data: IUnstakingData[] | null;
}

export const useUnstakingData = (): IUnstaking => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading } = useQuery({
    type: getUnstakingData,
  });

  useProviderEffect(() => {
    dispatchRequest(getUnstakingData());
  }, [dispatchRequest]);

  return {
    isLoading: loading,
    data,
  };
};
