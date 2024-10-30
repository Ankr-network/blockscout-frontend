import { GroupUserRole } from 'multirpc-sdk';
import { useCallback, useEffect, ReactNode, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import {
  GuardUserGroupParams,
  useGuardUserGroup,
} from 'domains/userGroup/hooks/useGuardUserGroup';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { guardDialogSlice } from 'modules/guardDialog';
import { HIDE_ACCESS_DENIED_DIALOG_FLAG } from 'domains/userGroup/constants/common';

import { useSelectedUserGroup } from '../../hooks/useSelectedUserGroup';

interface GuardUserGroupProps extends GuardUserGroupParams {
  children: ReactNode;
  isDisabled?: boolean;
  placeholder?: ReactElement | null;
  shouldForceRedirect?: boolean;
  shouldRedirect?: boolean;
  shouldHideAlert?: boolean;
}

export const GuardUserGroup = ({
  blockName,
  children,
  isDisabled,
  placeholder = null,
  shouldForceRedirect,
  shouldHideAlert,
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

  const showAlert = useCallback(() => {
    dispatch(guardDialogSlice.actions.showDialog());
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

      const isAlertHidden =
        localStorage.getItem(HIDE_ACCESS_DENIED_DIALOG_FLAG) || shouldHideAlert;

      // show notification only if redirect hasn't been forced
      if (!hasAccess && shouldRedirect && !isAlertHidden) {
        showAlert();
      }
    }
  }, [
    blockName,
    hasAccess,
    history,
    isDev,
    isFinance,
    isLoggedIn,
    shouldForceRedirect,
    shouldHideAlert,
    shouldRedirect,
    showAlert,
  ]);

  if (isDisabled && selectedGroupAddress) {
    return placeholder;
  }

  return <>{hasAccess ? <>{children}</> : placeholder}</>;
};
