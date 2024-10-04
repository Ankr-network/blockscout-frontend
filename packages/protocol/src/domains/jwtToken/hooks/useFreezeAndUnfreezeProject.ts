import { MouseEvent, useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { getSuccessFreezeMessage } from '../utils/getSuccessFreezeMessage';
import { useUpdateJwtTokenFreezeStatusMutation } from '../action/updateJwtTokenFreezeStatus';

interface FreezeAndUnfreezeProjectProps {
  isFreeze: boolean;
  userEndpointToken: string;
  projectName: string;
  onSuccess: (event?: MouseEvent<HTMLButtonElement>) => void;
}

export const useFreezeAndUnfreezeProject = ({
  isFreeze,
  onSuccess,
  projectName,
  userEndpointToken,
}: FreezeAndUnfreezeProjectProps) => {
  const dispatch = useDispatch();
  const titleText = useMemo(
    () =>
      isFreeze
        ? t('projects.freeze-dialog.titles.freeze')
        : t('projects.freeze-dialog.titles.unfreeze'),
    [isFreeze],
  );
  const descriptionText = useMemo(
    () =>
      isFreeze
        ? t('projects.freeze-dialog.descriptions.freeze')
        : t('projects.freeze-dialog.descriptions.unfreeze'),
    [isFreeze],
  );
  const submitText = useMemo(
    () =>
      isFreeze
        ? t('projects.freeze-dialog.submit-buttons.freeze')
        : t('projects.freeze-dialog.submit-buttons.unfreeze'),
    [isFreeze],
  );

  const { selectedGroupAddress } = useSelectedUserGroup();

  const [updateProjectFreezeStatus, { isLoading }] =
    useUpdateJwtTokenFreezeStatusMutation();

  const handeUpdateStatus = useCallback(
    async (event?: MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();

      const response = await updateProjectFreezeStatus({
        token: userEndpointToken,
        group: selectedGroupAddress,
        freeze: isFreeze,
      });

      const error = isMutationSuccessful(response) ? undefined : response.error;

      const severity = error ? 'error' : 'success';
      const message = error
        ? t('error.common')
        : getSuccessFreezeMessage(isFreeze, projectName);

      dispatch(
        NotificationActions.showNotification({
          message,
          severity,
        }),
      );

      if (!error) {
        onSuccess(event);
      }
    },
    [
      updateProjectFreezeStatus,
      userEndpointToken,
      selectedGroupAddress,
      isFreeze,
      dispatch,
      projectName,
      onSuccess,
    ],
  );

  return {
    titleText,
    descriptionText,
    submitText,
    isLoading,
    handeUpdateStatus,
  };
};
