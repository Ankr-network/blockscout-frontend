import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchOauthLoginParams } from '../actions/fetchOauthLoginParams';

export const useOauthLoginParams = () => {
  const dispatchRequest = useDispatchRequest();

  const handleFetchLoginParams = useCallback(() => {
    dispatchRequest(fetchOauthLoginParams());
  }, [dispatchRequest]);

  const { data, loading, pristine } = useQuery({
    action: fetchOauthLoginParams,
    type: fetchOauthLoginParams.toString(),
  });

  return { handleFetchLoginParams, loading: loading || !pristine, data };
};
