import { useDispatchRequest, useQuery } from '@redux-requests/react';

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
