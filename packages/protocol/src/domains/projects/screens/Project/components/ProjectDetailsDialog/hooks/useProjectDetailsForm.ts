import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { useUpdateJwtToken } from 'domains/jwtToken/hooks/useUpdateJwtToken';

import { ProjectDetailsFormFields, ProjectDetailsFormValues } from '../types';

export interface ProjectDetailsBaseProps {
  onClose: () => void;
  onSuccess?: () => void;
  projectIndex: number;
}

export const useProjectDetailsForm = ({
  onClose,
  onSuccess,
  projectIndex,
}: ProjectDetailsBaseProps) => {
  const { jwts: projects } = useJWTsManager();

  const dispatch = useDispatch();

  const { handleUpdateProjectDetails, isLoading: isUpdateLoading } =
    useUpdateJwtToken();

  const handleFormSubmit = useCallback(
    async (values: ProjectDetailsFormValues, form) => {
      const nameFieldState = form.getFieldState(ProjectDetailsFormFields.name);

      const descriptionFieldState = form.getFieldState(
        ProjectDetailsFormFields.description,
      );

      const isDescriptionChanged = descriptionFieldState.modified;
      const isNothingChanged =
        !nameFieldState.modified && !isDescriptionChanged;
      const isNameEqualWithInitialValue = !nameFieldState.dirty;

      if (
        isNothingChanged ||
        (isNameEqualWithInitialValue && !isDescriptionChanged)
      ) {
        onClose();

        return;
      }

      const isOnlyDescriptionChanged =
        !nameFieldState.modified && descriptionFieldState.modified;

      const { description, name } = values;

      const resultName = name || '';
      const hasNameDuplication = projects.some(
        project => project.name === resultName,
      );

      if (
        hasNameDuplication &&
        !isNameEqualWithInitialValue &&
        !isOnlyDescriptionChanged
      ) {
        dispatch(
          NotificationActions.showNotification({
            message: t('projects.new-project.error-message.name-duplication', {
              value: name,
            }),
            severity: 'error',
          }),
        );

        return;
      }

      await handleUpdateProjectDetails(
        projectIndex,
        resultName,
        description || '',
      );
      if (onSuccess) {
        onSuccess();
      }

      onClose();
    },
    [
      projects,
      dispatch,
      handleUpdateProjectDetails,
      onClose,
      onSuccess,
      projectIndex,
    ],
  );

  return {
    isUpdateLoading,
    handleFormSubmit,
  };
};
