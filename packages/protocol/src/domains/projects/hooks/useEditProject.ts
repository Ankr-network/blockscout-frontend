import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { selectCurrentAddress } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useUpdateJwtToken } from 'domains/jwtToken/hooks/useUpdateJwtToken';

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

  const { handleUpdateJwtToken, isLoading } = useUpdateJwtToken();

  const handleUpdate = useCallback(
    async ({ description, name, oldName, tokenIndex }: IUpdateArgs) => {
      const response = await handleUpdateJwtToken({
        tokenIndex,
        name,
        description,
      });

      const isSuccessful = isMutationSuccessful(response);

      const successMessage = t('projects.edit-dialog.success-message');
      const errorMessage = t('projects.rename-dialog.success-message', {
        oldValue: oldName,
        newValue: name,
      });

      const [severity, message] = isSuccessful
        ? ['success' as const, successMessage]
        : ['error' as const, errorMessage];

      dispatch(
        NotificationActions.showNotification({
          message,
          severity,
        }),
      );
    },
    [dispatch, handleUpdateJwtToken],
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
