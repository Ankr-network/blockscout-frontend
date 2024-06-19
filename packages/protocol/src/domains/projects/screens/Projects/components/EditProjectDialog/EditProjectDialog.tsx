import { useCallback } from 'react';
import { useForm } from 'react-final-form';
import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { useEditProject } from 'domains/projects/hooks/useEditProject';

import { EditProjectContent } from '../EditProjectContent';
import { initialValues } from '../../hooks/useProjectFormValues';
import { EditProjectDialogFields } from './EditProjectDialogUtils';

interface EditProjectDialogProps {
  isOpened: boolean;
  handleFormSubmit: () => void;
  onClose: () => void;
}

export const EditProjectDialog = ({
  handleFormSubmit,
  isOpened,
  onClose,
}: EditProjectDialogProps) => {
  const { change } = useForm();
  const { isLoading } = useEditProject();

  const handleCloseDialog = useCallback(() => {
    onClose();
    change(EditProjectDialogFields.name, initialValues.name);
  }, [change, onClose]);

  return (
    <Dialog
      maxPxWidth={600}
      open={isOpened}
      onClose={handleCloseDialog}
      title={t('projects.rename-dialog.title')}
    >
      <EditProjectContent
        handleFormSubmit={handleFormSubmit}
        onClose={handleCloseDialog}
        isLoading={isLoading}
      />
    </Dialog>
  );
};
