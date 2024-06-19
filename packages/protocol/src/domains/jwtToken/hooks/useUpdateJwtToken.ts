import { useCallback } from 'react';
import { t } from '@ankr.com/common';
import { useDispatch } from 'react-redux';

import { updateJwtToken } from 'domains/jwtToken/action/updateJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

interface UpdateJwtTokenParams {
  tokenIndex: number;
  name?: string;
  description?: string;
}

export const useUpdateJwtToken = () => {
  const dispatch = useDispatch();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [updateJwtTokenQuery, { isLoading }, resetUpdateJwtToken] =
    useQueryEndpoint(updateJwtToken);

  const handleUpdateJwtToken = useCallback(
    ({ description, name, tokenIndex }: UpdateJwtTokenParams) =>
      updateJwtTokenQuery({
        tokenIndex,
        name,
        description,
        group,
      }),
    [group, updateJwtTokenQuery],
  );

  const handleUpdateProjectDetails = useCallback(
    async (tokenIndex: number, name?: string, description?: string) => {
      const { error } = await handleUpdateJwtToken({
        tokenIndex,
        name,
        description,
      });

      const severity = error ? 'error' : 'success';
      const message = error
        ? t('projects.edit-dialog.error-message')
        : t('projects.edit-dialog.success-message');

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

  return {
    handleUpdateJwtToken,
    resetUpdateJwtToken,
    isLoading,
    handleUpdateProjectDetails,
  };
};
