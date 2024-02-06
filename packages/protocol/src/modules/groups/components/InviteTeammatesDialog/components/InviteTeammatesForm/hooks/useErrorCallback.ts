import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isInviteTeamMemberError } from 'modules/groups/utils/isInviteTeamMemberError';

const { showNotification } = NotificationActions;

export interface IUseErrorCallbackProps {
  handleCloseDialog?: () => void;
}

export const useErrorCallback = ({
  handleCloseDialog,
}: IUseErrorCallbackProps) => {
  const dispatch = useDispatch();

  const onError = useCallback(
    (error: unknown) => {
      if (isInviteTeamMemberError(error)) {
        const message = t(error.message, { emails: error.data });

        dispatch(showNotification({ message, severity: 'error' }));

        handleCloseDialog?.();
      }
    },
    [dispatch, handleCloseDialog],
  );

  return { onError };
};
