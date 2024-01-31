import { GroupUserRole } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useCallback, useEffect, ReactNode, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import {
  GuardUserGroupParams,
  useGuardUserGroup,
} from 'domains/userGroup/hooks/useGuardUserGroup';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
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

  const { selectedGroupAddress, selectedGroupRole } = useSelectedUserGroup();
  // Note: it's impossible to use BlockWithPermission
  // since we have different behaviours for different user roles
  // for the same block
  const isFinance = selectedGroupRole === GroupUserRole.finance;
  const isDev = selectedGroupRole === GroupUserRole.dev;

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
      if (isFinance) {
        const billingPath = AccountRoutesConfig.accountDetails.generatePath();

        history.replace(billingPath);
      } else if (isDev) {
        const projectsPath = ProjectsRoutesConfig.projects.generatePath();

        history.replace(projectsPath);
      }

      // show notification only if redirect hasn't been forced
      if (!hasAccess && shouldRedirect) {
        showNotification();
      }
    }
  }, [
    hasAccess,
    history,
    isDev,
    isFinance,
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
