import { AddProjectStep } from 'domains/jwtToken/hooks/useAddProject';
import { renderTokenReview } from 'domains/jwtToken/utils/utils';
import { AddProjectContent } from '../ProjectDialogContent';
import { FailedContent } from '../ProjectDialogContent/FailedContent';
import { SuccessContent } from '../ProjectDialogContent/SuccessContent';

interface IAddProjectDialogContentProps {
  isLoading: boolean;
  projectName: string;
  successProjectName: string;
  userEndpointToken?: string;
  addProjectStep: AddProjectStep;
  handleCreate: () => void;
  handleCloseDialog: () => void;
}

export const AddProjectDialogContent = ({
  isLoading,
  projectName,
  successProjectName,
  userEndpointToken,
  addProjectStep,
  handleCreate,
  handleCloseDialog,
}: IAddProjectDialogContentProps) => {
  return (
    <>
      {addProjectStep === AddProjectStep.initial && (
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
  );
};
