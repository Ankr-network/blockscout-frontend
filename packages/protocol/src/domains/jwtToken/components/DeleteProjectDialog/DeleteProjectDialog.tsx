import { useCallback, useMemo } from 'react';

import { Dialog } from 'uiKit/Dialog';
import {
  DeleteProjectStep,
  useDeleteProject,
} from 'domains/jwtToken/hooks/useDeleteProject';

import { useDeleteProjectDialogStyles } from './useDeleteProjectDialogStyles';
import { DeleteProjectContent } from '../ProjectDialogContent/DeleteProjectContent';
import { FailedContent } from '../ProjectDialogContent/FailedContent';
import { useDeleteProjectNotification } from './useDeleteProjectNotification';

interface IDeleteProjectDialogProps {
  tokenIndex: number;
  onSuccess?: () => void;
  open: boolean;
  onClose: () => void;
}

export const DeleteProjectDialog = ({
  onClose,
  onSuccess,
  open,
  tokenIndex,
}: IDeleteProjectDialogProps) => {
  const { classes } = useDeleteProjectDialogStyles();

  const { showDeleteProjectNotification } = useDeleteProjectNotification();

  const handleSuccess = useCallback(
    (is2FaError: boolean) => {
      if (typeof onSuccess === 'function') {
        onSuccess();
      }

      if (!is2FaError) {
        showDeleteProjectNotification();
      }

      onClose();
    },
    [onSuccess, onClose, showDeleteProjectNotification],
  );

  const {
    deleteProjectStep,
    handleDelete,
    isLoading,
    setDeleteProjectStep,
    title,
  } = useDeleteProject(tokenIndex, handleSuccess);

  const isFailedStep = useMemo(
    () => deleteProjectStep === DeleteProjectStep.failed,
    [deleteProjectStep],
  );

  const handleClose = useCallback(() => {
    if (isFailedStep) {
      setDeleteProjectStep(DeleteProjectStep.initial);
    }

    onClose();
  }, [setDeleteProjectStep, onClose, isFailedStep]);

  return (
    <Dialog
      fullWidth
      maxPxWidth={600}
      open={open}
      onClose={onClose}
      title={title}
      titleClassName={classes.title}
      shouldHideCloseButton={isFailedStep}
    >
      {deleteProjectStep === DeleteProjectStep.initial && (
        <DeleteProjectContent
          isLoading={isLoading}
          handleDelete={handleDelete}
          onClose={handleClose}
        />
      )}
      {isFailedStep && (
        <FailedContent
          isLoading={isLoading}
          onClose={handleClose}
          onTryAgain={handleDelete}
        />
      )}
    </Dialog>
  );
};
