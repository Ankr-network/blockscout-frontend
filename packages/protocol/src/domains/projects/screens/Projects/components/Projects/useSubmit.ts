import { useCallback } from 'react';
import { t } from '@ankr.com/common';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useEditProject } from 'domains/projects/hooks/useEditProject';
import { Project } from 'domains/projects/utils/getAllProjects';

import {
  EditProjectDialogFields,
  EditProjectDialogType,
} from '../EditProjectDialog/EditProjectDialogUtils';

interface UseSubmitProps {
  onEditDialogClose: () => void;
  allProjects: Project[];
}

export const useSubmit = ({
  allProjects,
  onEditDialogClose,
}: UseSubmitProps) => {
  const dispatch = useDispatch();

  const { handleUpdate } = useEditProject();

  const handleFormSubmit = useCallback(
    async (values: EditProjectDialogType, form) => {
      const nameFieldState = form.getFieldState(EditProjectDialogFields.name);

      const isNameEqualWithInitalValue =
        !nameFieldState.dirty || !nameFieldState.modified;

      if (isNameEqualWithInitalValue) {
        onEditDialogClose();

        return;
      }

      const { name, tokenIndex } = values;

      const resultName = name || '';
      const hasNameDuplication = allProjects.some(
        project => project.name === resultName,
      );

      if (hasNameDuplication && !isNameEqualWithInitalValue) {
        dispatch(
          NotificationActions.showNotification({
            message: t(
              'projects.rename-dialog.error-message.name-duplication',
              {
                value: name,
              },
            ),
            severity: 'error',
          }),
        );

        return;
      }

      await handleUpdate({
        tokenIndex,
        name: resultName,
        oldName: nameFieldState.initial,
      });

      onEditDialogClose();
    },
    [allProjects, handleUpdate, onEditDialogClose, dispatch],
  );

  return { handleFormSubmit };
};
