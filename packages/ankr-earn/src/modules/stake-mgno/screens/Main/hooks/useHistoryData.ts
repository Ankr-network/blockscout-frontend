import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getHistoryData } from 'modules/stake-mgno/actions/getHistoryData';
import { IHistoryData } from 'modules/stake-mgno/api/types';

interface IHistory {
  isLoading: boolean;
  data: IHistoryData[] | null;
}

export const useHistoryData = (): IHistory => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading } = useQuery({
    type: getHistoryData,
  });

  useProviderEffect(() => {
    dispatchRequest(getHistoryData());
  }, [dispatchRequest]);

  return {
    isLoading: loading,
    data,
  };
};
