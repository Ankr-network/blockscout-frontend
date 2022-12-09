import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { ACTION_CACHE_SEC } from 'modules/common/const';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import { getMetrics } from 'modules/stake/actions/getMetrics';

interface IUseErrorMessage {
  hasError: boolean;
  onErroMessageClick: () => void;
}

export const useErrorMessage = (): IUseErrorMessage => {
  const dispatchRequest = useDispatchRequest();

  const { error: metricsError } = useQuery({
    type: getMetrics,
  });

  const { error: commonDataError, refetch } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const onErroMessageClick = () => {
    if (commonDataError) {
      refetch();
    }

    if (metricsError) {
      dispatchRequest(getMetrics());
    }
  };

  const hasError = !!commonDataError || !!metricsError;

  return {
    hasError,
    onErroMessageClick,
  };
};
