import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useUpdateWhitelistModeMutation } from 'domains/projects/actions/updateWhitelistMode';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { ENABLE_WHITELISTS_CACHE_KEY } from '../../../const';

export const useWhitelistStepOnSubmit = () => {
  const dispatch = useDispatch();
  const [updateWhitelistMode, { isSuccess }] = useUpdateWhitelistModeMutation({
    fixedCacheKey: ENABLE_WHITELISTS_CACHE_KEY,
  });
  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();

  return useCallback(
    async (userEndpointToken?: string) => {
      if (userEndpointToken) {
        if (isSuccess) {
          return userEndpointToken;
        }

        const response = await updateWhitelistMode({
          params: {
            userEndpointToken,
            prohibitByDefault: true,
            groupAddress,
          },
        });

        return isMutationSuccessful(response);
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
