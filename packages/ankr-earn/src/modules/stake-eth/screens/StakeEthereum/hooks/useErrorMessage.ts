import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchValidatorsDetails } from 'modules/metrics/actions/fetchValidatorsDetails';
import { getAPY } from 'modules/stake-eth/actions/getAPY';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';

interface IUseErrorMessage {
  hasError: boolean;
  onErroMessageClick: () => void;
}

export const useErrorMessage = (): IUseErrorMessage => {
  const dispatchRequest = useDispatchRequest();

  const { error: apyError } = useQuery({
    type: getAPY,
  });

  const { error: detailsError } = useQuery({
    type: fetchValidatorsDetails,
  });

  const { error: commonDataError } = useQuery({
    type: getCommonData,
  });

  const onErroMessageClick = () => {
    if (commonDataError) {
      dispatchRequest(getCommonData());
    }

    if (apyError) {
      dispatchRequest(getAPY());
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
