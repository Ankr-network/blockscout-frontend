import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
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

  const { error: commonDataError } = useQuery({
    type: fetchStats,
  });

  const onErroMessageClick = () => {
    if (commonDataError) {
      dispatchRequest(fetchStats());
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
