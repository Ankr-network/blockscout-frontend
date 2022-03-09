import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { getAPY } from 'modules/stake-fantom/actions/getAPY';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';

interface IUseErrorMessageData {
  hasError: boolean;
  onErroMessageClick: () => void;
}

export const useErrorMessage = (): IUseErrorMessageData => {
  const dispatchRequest = useDispatchRequest();

  const { error: apyError } = useQuery({
    type: getAPY,
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
  };

  const hasError = !!commonDataError || !!apyError;

  return {
    hasError,
    onErroMessageClick,
  };
};
