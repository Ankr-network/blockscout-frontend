import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';

export const useErrorMessage = () => {
  const dispatchRequest = useDispatchRequest();

  const { error } = useQuery({
    type: getCommonData,
  });

  const onErroMessageClick = () => {
    dispatchRequest(getCommonData());
  };

  const hasError = !!error;

  return {
    hasError,
    onErroMessageClick,
  };
};
