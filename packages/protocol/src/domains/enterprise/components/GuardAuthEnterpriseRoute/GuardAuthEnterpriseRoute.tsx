import { t } from '@ankr.com/common';
import { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { INDEX_PATH } from 'domains/chains/routes';
import { useEnterprise } from 'domains/auth/hooks/useEnterprise';

interface IGuardAuthEnterpriseRouteProps {
  children: ReactNode;
}

export const GuardAuthEnterpriseRoute = ({
  children,
}: IGuardAuthEnterpriseRouteProps): JSX.Element | null => {
  const { isClient } = useEnterprise();

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
