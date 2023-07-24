import { t } from '@ankr.com/common';
import { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { INDEX_PATH } from 'domains/chains/routes';

interface IGuardAuthEnterpriseRouteProps {
  isClient: boolean;
  children: ReactNode;
}

export const GuardAuthEnterpriseRoute = ({
  isClient,
  children,
}: IGuardAuthEnterpriseRouteProps): JSX.Element | null => {
  const history = useHistory();
  const dispatch = useDispatch();

  const showNotification = useCallback(() => {
    dispatch(
      NotificationActions.showNotification({
        message: t('enterprise.forbidden'),
        severity: 'error',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (!isClient) {
      history.replace(INDEX_PATH);

      showNotification();
    }
  }, [history, isClient, showNotification]);

  return isClient ? <>{children}</> : null;
};
