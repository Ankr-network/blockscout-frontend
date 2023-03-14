import { useCallback } from 'react';
import { t } from '@ankr.com/common';
import { Dialog } from 'uiKit/Dialog';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';
import { useAddProjectDialogStyles } from './useAddProjectDialogStyles';
import {
  AddProjectStep,
  useAddProject,
} from 'domains/jwtToken/hooks/useAddProject';
import { AddProjectDialogContent } from '../AddProjectDialogContent/AddProjectDialogContent';

interface IAddProjectDialogProps {
  allowedAddProjectTokenIndex: number;
  isOpen: boolean;
  handleClose: () => void;
}

export const AddProjectDialog = ({
  allowedAddProjectTokenIndex,
  isOpen,
  handleClose,
}: IAddProjectDialogProps) => {
  const { classes, cx } = useAddProjectDialogStyles();

  const {
    isLoading,
    projectName,
    successProjectName,
    userEndpointToken,
    handleCreate,
    addProjectStep,
    setAddProjectStep,
  } = useAddProject(allowedAddProjectTokenIndex);

  const handleCloseDialog = useCallback(() => {
    handleClose();
    setAddProjectStep(AddProjectStep.initial);
  }, [handleClose, setAddProjectStep]);

  return (
    <Dialog
      maxPxWidth={600}
      fullWidth
      open={isOpen}
      onClose={handleCloseDialog}
      title={t(`${jwtTokenIntlRoot}.${addProjectStep}.title`)}
      titleClassName={cx(
        classes.title,
        addProjectStep === AddProjectStep.initial
          ? classes.initial
          : classes.status,
      )}
      shouldHideCloseButton={addProjectStep !== AddProjectStep.initial}
    >
      <AddProjectDialogContent
        isLoading={isLoading}
        projectName={projectName}
        successProjectName={successProjectName}
        userEndpointToken={userEndpointToken}
        addProjectStep={addProjectStep}
        handleCreate={handleCreate}
        handleCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
};
