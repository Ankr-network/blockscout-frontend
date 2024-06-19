import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { useAppSelector } from 'store/useAppSelector';
import { selectCurrentAddress } from 'domains/auth/store';
import { useUpdateJwtToken } from 'domains/jwtToken/hooks/useUpdateJwtToken';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

import { resetConfig } from '../store';

interface IUpdateArgs {
  tokenIndex: number;
  name?: string;
  oldName?: string;
  description?: string;
}

export const useEditProject = () => {
  const dispatch = useDispatch();

  const address = useAppSelector(selectCurrentAddress);

  const { handleUpdateJwtToken, isLoading, resetUpdateJwtToken } =
    useUpdateJwtToken();

  const handleUpdate = useCallback(
    async ({ description, name, oldName, tokenIndex }: IUpdateArgs) => {
      const { error } = await handleUpdateJwtToken({
        tokenIndex,
        name,
        description,
      });

      const severity = error ? 'error' : 'success';
      const message = error
        ? t('projects.rename-dialog.error-message.something-wrong')
        : t('projects.rename-dialog.success-message', {
            oldValue: oldName,
            newValue: name,
          });

      dispatch(
        NotificationActions.showNotification({
          message,
          severity,
        }),
      );

      resetUpdateJwtToken();
    },
    [dispatch, handleUpdateJwtToken, resetUpdateJwtToken],
  );

  const handleResetConfiguringProjectConfig = useCallback(
    () => dispatch(resetConfig(address)),
    [dispatch, address],
  );

  return {
    isLoading,
    handleUpdate,
    handleResetConfiguringProjectConfig,
  };
};
