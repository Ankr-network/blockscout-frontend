import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useLazyUpdateWhitelistModeQuery } from 'domains/projects/actions/updateWhitelistMode';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useWhitelistStepOnSubmit = () => {
  const dispatch = useDispatch();
  const [updateWhitelistMode, { isSuccess }] =
    useLazyUpdateWhitelistModeQuery();
  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();

  return useCallback(
    async (userEndpointToken?: string) => {
      if (userEndpointToken) {
        if (isSuccess) {
          return userEndpointToken;
        }

        const { isError } = await updateWhitelistMode({
          params: {
            userEndpointToken,
            prohibitByDefault: true,
            groupAddress,
          },
        });

        if (isError) {
          return false;
        }

        return true;
      }

      dispatch(
        NotificationActions.showNotification({
          message: t('error.common'),
          severity: 'error',
        }),
      );

      return false;
    },
    [dispatch, updateWhitelistMode, groupAddress, isSuccess],
  );
};
