import { useHistory } from 'react-router';
import { useCallback, useEffect, ReactNode, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';
import { INDEX_PATH } from 'routes/constants';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import {
  GuardUserGroupParams,
  useGuardUserGroup,
} from 'domains/userGroup/hooks/useGuardUserGroup';

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
      history.replace(INDEX_PATH);

      // show notification only if redirect hasn't been forced
      if (!hasAccess && shouldRedirect) {
        showNotification();
      }
    }
  }, [
    hasAccess,
    history,
    shouldForceRedirect,
    shouldRedirect,
    showNotification,
  ]);

  if (isDisabled && selectedGroupAddress) {
    return placeholder;
  }

  return hasAccess ? <>{children}</> : placeholder;
};
