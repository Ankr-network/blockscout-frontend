import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchValidatorsDetails } from 'modules/metrics/actions/fetchValidatorsDetails';
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

  const { error: detailsError } = useQuery({
    type: fetchValidatorsDetails,
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

    if (detailsError) {
      dispatchRequest(fetchValidatorsDetails());
    }
  };

  const hasError = !!commonDataError || !!apyError || !!detailsError;

  return {
    hasError,
    onErroMessageClick,
  };
};
