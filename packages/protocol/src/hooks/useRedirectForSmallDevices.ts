import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { INDEX_PATH } from 'routes/constants';

import { useIsMDDown } from 'uiKit/Theme/useTheme';

export const useRedirectForSmallDevices = () => {
  const history = useHistory();
  const isHidden = useIsMDDown();

  useEffect(() => {
    if (isHidden) {
      history.replace(INDEX_PATH);
    }
  }, [isHidden, history]);
};
