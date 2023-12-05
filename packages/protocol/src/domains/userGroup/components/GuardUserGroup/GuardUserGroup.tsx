import { useHistory } from 'react-router';
import { useCallback, useEffect, ReactNode, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import {
  GuardUserGroupParams,
  useGuardUserGroup,
} from 'domains/userGroup/hooks/useGuardUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useSelectedUserGroup } from '../../hooks/useSelectedUserGroup';

interface GuardUserGroupProps extends GuardUserGroupParams {
  children: ReactNode;
  isDisabled?: boolean;
  placeholder?: ReactElement | null;
  shouldForceRedirect?: boolean;
  shouldRedirect?: boolean;
}

export const GuardUserGroup = ({
  blockName,
  children,
  isDisabled,
  placeholder = null,
  shouldForceRedirect,
  shouldRedirect,
}: GuardUserGroupProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn } = useAuth();
  const hasAccess = useGuardUserGroup({ blockName });

  const { selectedGroupAddress } = useSelectedUserGroup();

  const showNotification = useCallback(() => {
    dispatch(
      NotificationActions.showNotification({
        message: t('user-group.forbidden'),
        severity: 'error',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if ((!hasAccess && shouldRedirect) || shouldForceRedirect) {
      history.replace(ChainsRoutesConfig.chains.generatePath({ isLoggedIn }));

      // show notification only if redirect hasn't been forced
      if (!hasAccess && shouldRedirect) {
        showNotification();
      }
    }
  }, [
    hasAccess,
    history,
    isLoggedIn,
    shouldForceRedirect,
    shouldRedirect,
    showNotification,
  ]);

  if (isDisabled && selectedGroupAddress) {
    return placeholder;
  }

  return hasAccess ? <>{children}</> : placeholder;
};
