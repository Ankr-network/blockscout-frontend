import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useRedirectIfUserHasEmail = () => {
  const history = useHistory();

  const { email } = useAuth();

  useEffect(() => {
    if (email) {
      history.replace(ChainsRoutesConfig.chains.path);
    }
  }, [history, email]);
};
