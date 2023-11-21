import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const useDeleteProjectNotification = () => {
  const dispatch = useDispatch();

  const showDeleteProjectNotification = useCallback(() => {
    dispatch(
      NotificationActions.showNotification({
        message: t('project.deleted'),
        severity: 'success',
      }),
    );
  }, [dispatch]);

  return {
    showDeleteProjectNotification,
  };
};
