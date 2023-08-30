import { t } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

import { updateJwtTokenFreezeStatus } from '../action/updateJwtTokenFreezeStatus';
import { getSuccessFreezeMessage } from '../utils/getSuccessFreezeMessage';

interface FreezeAndUnfreezeProjectProps {
  isFreeze: boolean;
  userEndpointToken: string;
  projectName: string;
  onSuccess: () => void;
}

export const useFreezeAndUnfreezeProject = ({
  isFreeze,
  userEndpointToken,
  projectName,
  onSuccess,
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

  const [updateProjectFreezeStatus, { isLoading }, reset] = useQueryEndpoint(
    updateJwtTokenFreezeStatus,
  );

  const handeUpdateStatus = useCallback(async () => {
    const { error } = await updateProjectFreezeStatus({
      token: userEndpointToken,
      group: selectedGroupAddress,
      freeze: isFreeze,
    });

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
      onSuccess();
    }

    reset();
  }, [
    updateProjectFreezeStatus,
    userEndpointToken,
    selectedGroupAddress,
    isFreeze,
    reset,
    dispatch,
    projectName,
    onSuccess,
  ]);

  return {
    titleText,
    descriptionText,
    submitText,
    isLoading,
    handeUpdateStatus,
  };
};
