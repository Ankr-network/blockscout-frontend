import { useCallback } from 'react';

import { Dialog } from 'uiKit/Dialog';
import {
  DeleteProjectStep,
  useDeleteProject,
} from 'domains/jwtToken/hooks/useDeleteProject';

import { useDeleteProjectDialogStyles } from './useDeleteProjectDialogStyles';
import { DeleteProjectContent } from '../ProjectDialogContent/DeleteProjectContent';
import { FailedContent } from '../ProjectDialogContent/FailedContent';

interface IDeleteProjectDialogProps {
  tokenIndex: number;
  onSuccess?: () => void;
  open: boolean;
  onClose: () => void;
}

export const DeleteProjectDialog = ({
  tokenIndex,
  onSuccess,
  open,
  onClose,
}: IDeleteProjectDialogProps) => {
  const { classes } = useDeleteProjectDialogStyles();

  const handleSuccess = useCallback(() => {
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
    onClose();
  }, [onSuccess, onClose]);

  const {
    isLoading,
    title,
    deleteProjectStep,
    setDeleteProjectStep,
    handleDelete,
  } = useDeleteProject(tokenIndex, handleSuccess);

  const isFailedStep = deleteProjectStep === DeleteProjectStep.failed;

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
