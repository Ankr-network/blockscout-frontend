import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import {
  jwtTokenIntlRoot,
  renderTokenReview,
} from 'domains/jwtToken/utils/utils';
import { useAddProjectDialogStyles } from './useAddProjectDialogStyles';
import {
  AddProjectStep,
  useAddProject,
} from 'domains/jwtToken/hooks/useAddProject';
import { AddProjectContent } from '../ProjectDialogContent';
import { SuccessContent } from '../ProjectDialogContent/SuccessContent';
import { FailedContent } from '../ProjectDialogContent/FailedContent';

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

  const isInitialStep = addProjectStep === AddProjectStep.initial;

  return (
    <Dialog
      maxPxWidth={600}
      fullWidth
      open={isOpen}
      onClose={handleCloseDialog}
      title={t(`${jwtTokenIntlRoot}.${addProjectStep}.title`)}
      shouldHideCloseButton={!isInitialStep}
      titleClassName={cx(
        classes.title,
        isInitialStep ? classes.initial : classes.status,
      )}
    >
      <>
        {isInitialStep && (
          <AddProjectContent
            isLoading={isLoading}
            projectName={projectName}
            handleCreate={handleCreate}
          />
        )}
        {addProjectStep === AddProjectStep.success && (
          <SuccessContent
            projectName={successProjectName}
            jwtToken={renderTokenReview(userEndpointToken)}
            onClick={handleCloseDialog}
          />
        )}
        {addProjectStep === AddProjectStep.failed && (
          <FailedContent
            isLoading={isLoading}
            onClose={handleCloseDialog}
            onTryAgain={handleCreate}
          />
        )}
      </>
    </Dialog>
  );
};
