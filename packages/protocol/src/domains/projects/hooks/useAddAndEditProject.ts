import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { t } from '@ankr.com/common';

import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';
import { useAppSelector } from 'store/useAppSelector';
import { selectCurrentAddress } from 'domains/auth/store';
import { useUpdateJwtToken } from 'domains/jwtToken/hooks/useUpdateJwtToken';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

import { resetConfig, setStepConfig } from '../store';
import { NewProjectStep } from '../types';

export enum AddProjectState {
  initial = 'initial',
  success = 'success',
  failed = 'failed',
}

export const useAddAndEditProject = (allowedTokenIndex: number) => {
  const dispatch = useDispatch();

  const address = useAppSelector(selectCurrentAddress);

  const [addProjectState, setAddProjectState] = useState(
    AddProjectState.initial,
  );

  const {
    handleCreateJwtToken,
    resetCreateJwtToken,
    isLoading: isCreateLoading,
  } = useCreateJwtToken();

  const {
    handleUpdateJwtToken,
    resetUpdateJwtToken,
    isLoading: isUpdateLoading,
  } = useUpdateJwtToken();

  const handleCreate = useCallback(
    async (name: string, description: string) => {
      const { data, error } = await handleCreateJwtToken({
        tokenIndex: allowedTokenIndex,
        name,
        description,
      });

      if (error) {
        setAddProjectState(AddProjectState.failed);
      } else {
        dispatch(
          setStepConfig({
            address,
            step: NewProjectStep.Chain,
            projectStepConfig: {
              projectName: name,
              tokenIndex: allowedTokenIndex,
              userEndpointToken: data?.userEndpointToken,
              selectedTestnetIds: undefined,
              selectedDevnetIds: undefined,
              selectedMainnetIds: undefined,
              selectedBeaconMainnetIds: undefined,
              selectedBeaconTestnetIds: undefined,
              selectedOpnodeMainnetIds: undefined,
              selectedOpnodeTestnetIds: undefined,
              shouldSkipFormReset: false,
            },
            nextStep: NewProjectStep.Chain,
          }),
        );
        setAddProjectState(AddProjectState.success);
      }

      resetCreateJwtToken();
    },
    [
      address,
      dispatch,
      handleCreateJwtToken,
      resetCreateJwtToken,
      allowedTokenIndex,
    ],
  );

  const handleUpdate = useCallback(
    async (tokenIndex: number, name?: string, description?: string) => {
      const { error } = await handleUpdateJwtToken({
        tokenIndex,
        name,
        description,
      });

      const severity = error ? 'error' : 'success';
      const message = error
        ? t('projects.edit-project.dialog.error-message')
        : t('projects.edit-project.dialog.success-message', {
            value: name,
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
    isLoading: isCreateLoading || isUpdateLoading,
    addProjectState,
    setAddProjectState,
    handleCreate,
    handleUpdate,
    handleResetConfiguringProjectConfig,
  };
};
