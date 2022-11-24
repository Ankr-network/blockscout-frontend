import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { autoLogin } from '../actions/autoLogin';
import { signout } from '../actions/signout';
import { loginUser } from '../actions/loginUserByGoogleSecretCode';

export const useOauth = () => {
  const dispatchRequest = useDispatchRequest();

  const handleLogin = useCallback(
    () => dispatchRequest(autoLogin()),
    [dispatchRequest],
  );

  const handleSignout = useCallback(() => {
    dispatchRequest(signout());
  }, [dispatchRequest]);

  const { data, loading } = useQuery({
    action: autoLogin,
    type: autoLogin.toString(),
  });

  const { loading: loginUserLoading } = useQuery({
    action: loginUser,
    type: loginUser.toString(),
  });

  return {
    handleLogin,
    loading: loading || loginUserLoading,
    data,
    handleSignout,
  };
};
