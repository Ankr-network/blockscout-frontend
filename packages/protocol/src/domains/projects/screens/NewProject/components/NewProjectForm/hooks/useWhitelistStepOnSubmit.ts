import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useLazyUpdateWhitelistModeQuery } from 'domains/projects/actions/updateWhitelistMode';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useWhitelistStepOnSubmit = () => {
  const dispatch = useDispatch();
  const { handleCreateJwtToken } = useCreateJwtToken();
  const [updateWhitelistMode] = useLazyUpdateWhitelistModeQuery();
  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();

  return useCallback(
    async (tokenIndex: number) => {
      const { data, error } = await handleCreateJwtToken(tokenIndex);

      if (error) {
        dispatch(
          NotificationActions.showNotification({
            message: (error as Error)?.message,
            severity: 'error',
          }),
        );

        return false;
      }

      if (data?.userEndpointToken) {
        await updateWhitelistMode({
          params: {
            userEndpointToken: data.userEndpointToken,
            prohibitByDefault: true,
            groupAddress,
          },
        });

        return data?.userEndpointToken;
      }

      dispatch(
        NotificationActions.showNotification({
          message: t('error.common'),
          severity: 'error',
        }),
      );

      return false;
    },
    [dispatch, updateWhitelistMode, handleCreateJwtToken, groupAddress],
  );
};
