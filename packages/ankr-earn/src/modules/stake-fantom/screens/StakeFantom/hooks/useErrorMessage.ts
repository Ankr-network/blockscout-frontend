import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { getMetrics } from 'modules/stake/actions/getMetrics';

interface IUseErrorMessageData {
  hasError: boolean;
  onErroMessageClick: () => void;
}

export const useErrorMessage = (): IUseErrorMessageData => {
  const dispatchRequest = useDispatchRequest();

  const { error: metricsError } = useQuery({
    type: getMetrics,
  });

  const { isError, refetch } = useGetFTMCommonDataQuery();

  const onErroMessageClick = () => {
    if (isError) {
      refetch();
    }

    if (metricsError) {
      dispatchRequest(getMetrics());
    }
  };

  const hasError = !!isError || !!metricsError;

  return {
    hasError,
    onErroMessageClick,
  };
};
