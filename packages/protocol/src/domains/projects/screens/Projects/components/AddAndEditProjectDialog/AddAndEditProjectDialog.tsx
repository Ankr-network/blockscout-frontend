import { useCallback, useMemo } from 'react';
import { useForm } from 'react-final-form';

import { Dialog } from 'uiKit/Dialog';
import {
  AddProjectState,
  useAddAndEditProject,
} from 'domains/projects/hooks/useAddAndEditProject';

import { AddAndEditProjectContent } from '../AddAndEditProjectContent';
import { SuccessAddProjectContent } from '../SuccessAddProjectContent';
import { FailedAddProjectContent } from '../FailedAddProjectContent';
import { Header } from './Header';
import { AddAndEditProjectDialogFields } from '../AddAndEditProjectForm/AddAndEditProjectFormUtils';
import { initialValues } from '../../hooks/useProjectFormValues';

interface AddAndEditProjectDialogProps {
  isOpened: boolean;
  addProjectState: AddProjectState;
  allowedAddProjectTokenIndex: number;
  handleFormSubmit: () => void;
  onClose: () => void;
}

export const AddAndEditProjectDialog = ({
  isOpened,
  addProjectState,
  allowedAddProjectTokenIndex,
  handleFormSubmit,
  onClose,
}: AddAndEditProjectDialogProps) => {
  const { change } = useForm();
  const { isLoading, setAddProjectState, handleResetConfiguringProjectConfig } =
    useAddAndEditProject(allowedAddProjectTokenIndex);

  const isInitialStep = useMemo(
    () => addProjectState === AddProjectState.initial,
    [addProjectState],
  );
  const isSuccessStep = useMemo(
    () => addProjectState === AddProjectState.success,
    [addProjectState],
  );
  const isFailedStep = useMemo(
    () => addProjectState === AddProjectState.failed,
    [addProjectState],
  );

  const handleCloseDialog = useCallback(() => {
    onClose();
    handleResetConfiguringProjectConfig();
    setAddProjectState(AddProjectState.initial);
    change(AddAndEditProjectDialogFields.name, initialValues.name);
    change(
      AddAndEditProjectDialogFields.description,
      initialValues.description,
    );
  }, [
    change,
    handleResetConfiguringProjectConfig,
    onClose,
    setAddProjectState,
  ]);

  return (
    <Dialog
      maxPxWidth={600}
      open={isOpened}
      onClose={handleCloseDialog}
      title={<Header addProjectState={addProjectState} />}
    >
      {isInitialStep && (
        <AddAndEditProjectContent
          handleFormSubmit={handleFormSubmit}
          onClose={handleCloseDialog}
          isLoading={isLoading}
        />
      )}

      {isSuccessStep && (
        <SuccessAddProjectContent onClose={handleCloseDialog} />
      )}

      {isFailedStep && (
        <FailedAddProjectContent
          handleRetry={handleFormSubmit}
          onClose={handleCloseDialog}
        />
      )}
    </Dialog>
  );
};
