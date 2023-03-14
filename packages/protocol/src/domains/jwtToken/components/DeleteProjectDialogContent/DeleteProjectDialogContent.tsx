import { DeleteProjectStep } from 'domains/jwtToken/hooks/useDeleteProject';
import { DeleteProjectContent } from '../ProjectDialogContent/DeleteProjectContent';
import { FailedContent } from '../ProjectDialogContent/FailedContent';

interface IDeleteProjectDialogContentProps {
  isLoading: boolean;
  deleteProjectStep: DeleteProjectStep;
  handleDelete: () => void;
  handleCloseInitContent: () => void;
  handleCloseFailedContent: () => void;
}

export const DeleteProjectDialogContent = ({
  isLoading,
  deleteProjectStep,
  handleDelete,
  handleCloseInitContent,
  handleCloseFailedContent,
}: IDeleteProjectDialogContentProps) => {
  return (
    <>
      {deleteProjectStep === DeleteProjectStep.initial && (
        <DeleteProjectContent
          isLoading={isLoading}
          handleDelete={handleDelete}
          onClose={handleCloseInitContent}
        />
      )}
      {deleteProjectStep === DeleteProjectStep.failed && (
        <FailedContent
          isLoading={isLoading}
          onClose={handleCloseFailedContent}
          tryAgain={handleDelete}
        />
      )}
    </>
  );
};
