import { useCallback } from 'react';
import { t } from '@ankr.com/common';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useEditProject } from 'domains/projects/hooks/useEditProject';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';

import {
  EditProjectDialogFields,
  EditProjectDialogType,
} from '../EditProjectDialog/EditProjectDialogUtils';

interface IUseSubmitProps {
  onEditDialogClose: () => void;
}

export const useSubmit = ({ onEditDialogClose }: IUseSubmitProps) => {
  const dispatch = useDispatch();

  const { jwts } = useJWTsManager();

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
      const hasNameDuplication = jwts.some(jwt => jwt.name === resultName);

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
    [handleUpdate, jwts, onEditDialogClose, dispatch],
  );

  return { handleFormSubmit };
};
