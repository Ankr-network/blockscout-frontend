import { useHistory } from 'react-router';
import { useCallback, useEffect, ReactNode, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { INDEX_PATH } from 'domains/chains/routes';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import {
  GuardUserGroupParams,
  useGuardUserGroup,
} from 'domains/userGroup/hooks/useGuardUserGroup';

import { useSelectedUserGroup } from '../../hooks/useSelectedUserGroup';

interface GuardUserGroupProps extends GuardUserGroupParams {
  children: ReactNode;
  shouldRedirect?: boolean;
  placeholder?: ReactElement | null;
  isDisabled?: boolean;
}

export const GuardUserGroup = ({
  children,
  blockName,
  shouldRedirect,
  placeholder = null,
  isDisabled,
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
    if (!hasAccess && shouldRedirect) {
      history.replace(INDEX_PATH);

      showNotification();
    }
  }, [history, hasAccess, showNotification, shouldRedirect]);

  if (isDisabled && selectedGroupAddress) {
    return placeholder;
  }

  return hasAccess ? <>{children}</> : placeholder;
};
