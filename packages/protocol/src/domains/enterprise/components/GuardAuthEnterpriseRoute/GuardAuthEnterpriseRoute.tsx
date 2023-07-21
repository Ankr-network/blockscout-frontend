import { t } from '@ankr.com/common';
import { INDEX_PATH } from 'domains/chains/routes';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

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
