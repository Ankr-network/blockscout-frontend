import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
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
    type: getCommonData,
  });

  const onErroMessageClick = () => {
    if (commonDataError) {
      dispatchRequest(getCommonData());
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
