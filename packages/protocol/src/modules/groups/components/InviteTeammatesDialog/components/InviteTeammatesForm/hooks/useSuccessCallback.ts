import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useAppDispatch } from 'store/useAppDispatch';

export interface UseSuccessCallbackParams {
  handleCloseDialog?: () => void;
}

export const useSuccessCallback = ({
  handleCloseDialog,
}: UseSuccessCallbackParams) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(() => {
    dispatch(
      NotificationActions.showNotification({
        message: t('teams.invite-teammates-dialog.success-message'),
        severity: 'success',
      }),
    );
    handleCloseDialog?.();
  }, [dispatch, handleCloseDialog]);

  return onSuccess;
};
