import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchAPY } from 'modules/stake-bnb/actions/fetchAPY';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';

interface IUseErrorMessage {
  hasError: boolean;
  onErroMessageClick: () => void;
}

export const useErrorMessage = (): IUseErrorMessage => {
  const dispatchRequest = useDispatchRequest();

  const { error: apyError } = useQuery({
    type: fetchAPY,
  });

  const { error: commonDataError } = useQuery({
    type: fetchStats,
  });

  const onErroMessageClick = () => {
    if (commonDataError) {
      dispatchRequest(fetchStats());
    }

    if (apyError) {
      dispatchRequest(fetchAPY());
    }
  };

  const hasError = !!commonDataError || !!apyError;

  return {
    hasError,
    onErroMessageClick,
  };
};
