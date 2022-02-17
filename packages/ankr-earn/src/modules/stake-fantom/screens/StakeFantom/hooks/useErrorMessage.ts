import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { getAPY } from 'modules/stake-fantom/actions/getAPY';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';

export const useErrorMessage = () => {
  const dispatchRequest = useDispatchRequest();

  const { error: commonDataError } = useQuery({
    type: getCommonData,
  });

  const { error: apyError } = useQuery({
    type: getAPY,
  });

  const onErroMessageClick = () => {
    if (commonDataError) {
      dispatchRequest(getCommonData());
    }

    if (apyError) {
      dispatchRequest(getAPY());
    }
  };

  const hasError = !!commonDataError || !!apyError;

  return {
    hasError,
    onErroMessageClick,
  };
};
