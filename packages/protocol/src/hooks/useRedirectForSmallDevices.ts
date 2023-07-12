import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useIsMDDown } from 'uiKit/Theme/useTheme';
import { INDEX_PATH } from 'domains/chains/routes';

export const useRedirectForSmallDevices = () => {
  const history = useHistory();
  const isHidden = useIsMDDown();

  useEffect(() => {
    if (isHidden) {
      history.replace(INDEX_PATH);
    }
  }, [isHidden, history]);
};
