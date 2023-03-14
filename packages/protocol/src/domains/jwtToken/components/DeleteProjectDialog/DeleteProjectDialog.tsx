import { useCallback } from 'react';
import { Dialog } from 'uiKit/Dialog';
import {
  DeleteProjectStep,
  useDeleteProject,
} from 'domains/jwtToken/hooks/useDeleteProject';
import { useDeleteProjectDialogStyles } from './useDeleteProjectDialogStyles';
import { DeleteProjectDialogContent } from '../DeleteProjectDialogContent/DeleteProjectDialogContent';

interface IDeleteProjectDialogProps {
  viewTokenIndex: number;
  selectedTokenIndex: number;
  setSelectedIndex: (index: number) => void;
  open: boolean;
  onClose: () => void;
}

export const DeleteProjectDialog = ({
  viewTokenIndex,
  selectedTokenIndex,
  setSelectedIndex,
  open,
  onClose,
}: IDeleteProjectDialogProps) => {
  const { classes } = useDeleteProjectDialogStyles();

  const {
    isLoading,
    title,
    deleteProjectStep,
    setDeleteProjectStep,
    handleDelete,
  } = useDeleteProject(
    viewTokenIndex,
    selectedTokenIndex,
    onClose,
    setSelectedIndex,
  );

  const handleClose = useCallback(() => {
    setDeleteProjectStep(DeleteProjectStep.initial);
    onClose();
  }, [setDeleteProjectStep, onClose]);

  return (
    <Dialog
      fullWidth
      maxPxWidth={600}
      open={open}
      onClose={onClose}
      title={title}
      titleClassName={classes.title}
      shouldHideCloseButton={deleteProjectStep === DeleteProjectStep.failed}
    >
      <DeleteProjectDialogContent
        isLoading={isLoading}
        deleteProjectStep={deleteProjectStep}
        handleDelete={handleDelete}
        handleCloseInitContent={onClose}
        handleCloseFailedContent={handleClose}
      />
    </Dialog>
  );
};
