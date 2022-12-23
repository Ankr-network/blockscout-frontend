import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { ACTION_CACHE_SEC } from 'modules/common/const';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
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
  const { error: commonDataError, refetch: getETHCommonDataRefetch } =
    useGetETHCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const onErroMessageClick = () => {
    if (commonDataError) {
      getETHCommonDataRefetch();
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
