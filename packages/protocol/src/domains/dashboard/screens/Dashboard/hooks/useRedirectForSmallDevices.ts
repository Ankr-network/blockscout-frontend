import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useIsMDDown } from 'uiKit/Theme/useTheme';
import { INDEX_PATH } from 'domains/chains/routes';
import { IS_DASHBOARD_HIDDEN_ON_MOBILE } from 'domains/dashboard/screens/Dashboard/const';

export const useRedirectForSmallDevices = () => {
  const history = useHistory();
  const isDashboardHidden = Boolean(
    useIsMDDown() && IS_DASHBOARD_HIDDEN_ON_MOBILE,
  );

  useEffect(() => {
    if (isDashboardHidden) {
      history.replace(INDEX_PATH);
    }
  }, [isDashboardHidden, history]);
};
