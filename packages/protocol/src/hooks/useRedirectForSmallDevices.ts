import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useIsMDDown } from 'uiKit/Theme/useTheme';

export const useRedirectForSmallDevices = () => {
  const history = useHistory();
  const isHidden = useIsMDDown();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isHidden) {
      history.replace(ChainsRoutesConfig.chains.generatePath({ isLoggedIn }));
    }
  }, [isHidden, isLoggedIn, history]);
};
