import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useUpdateJwtTokenMutation } from 'domains/jwtToken/action/updateJwtToken';

interface UpdateJwtTokenParams {
  tokenIndex: number;
  name?: string;
  description?: string;
}

export const useUpdateJwtToken = () => {
  const dispatch = useDispatch();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [updateJwtTokenQuery, { isLoading }] = useUpdateJwtTokenMutation();

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
      const response = await handleUpdateJwtToken({
        tokenIndex,
        name,
        description,
      });

      const isSuccessful = isMutationSuccessful(response);

      const [severity, message] = isSuccessful
        ? ['success' as const, t('projects.edit-dialog.success-message')]
        : ['error' as const, t('projects.edit-dialog.error-message')];

      dispatch(NotificationActions.showNotification({ message, severity }));
    },
    [dispatch, handleUpdateJwtToken],
  );

  return { handleUpdateJwtToken, handleUpdateProjectDetails, isLoading };
};
