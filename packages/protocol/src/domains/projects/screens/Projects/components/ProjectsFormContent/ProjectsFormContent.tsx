import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { Project } from 'domains/projects/utils/getAllProjects';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { UpgradeAccountDialog } from 'modules/common/components/UpgradeAccountDialog';

import { AddProjectButton } from '../AddProjectButton';
import { EditProjectDialog } from '../EditProjectDialog';
import { ProjectHeader } from '../ProjectHeader';
import { ProjectsTable } from '../ProjectsTable';

interface ProjectsFormContentProps {
  allProjects: Project[];
  canEditProject: boolean;
  handleClickSeePlans: () => void;
  handleSubmit: () => void;
  hasProjectButton: boolean;
  isEditDialogOpened: boolean;
  isFreePremium: boolean;
  isPlansDialogOpened: boolean;
  isUpgradeAccountDialogOpened: boolean;
  loading: boolean;
  onEditDialogClose: () => void;
  onEditDialogOpen: () => void;
  onPlansDialogClose: () => void;
  onUpgradeAccountDialogClose: () => void;
  onUpgradeAccountDialogOpen: () => void;
}

export const ProjectsFormContent = ({
  allProjects,
  canEditProject,
  handleClickSeePlans,
  handleSubmit,
  hasProjectButton,
  isEditDialogOpened,
  isFreePremium,
  isPlansDialogOpened,
  isUpgradeAccountDialogOpened,
  loading,
  onEditDialogClose,
  onEditDialogOpen,
  onPlansDialogClose,
  onUpgradeAccountDialogClose,
  onUpgradeAccountDialogOpen,
}: ProjectsFormContentProps) => {
  return (
    <>
      <ProjectHeader />

      <ProjectsTable
        data={allProjects}
        isLoading={loading}
        onProjectDialogOpen={onEditDialogOpen}
      />

      {(hasProjectButton || isFreePremium) && (
        <GuardUserGroup blockName={BlockWithPermission.JwtManagerWrite}>
          <AddProjectButton
            canEditProject={canEditProject}
            isFreemiumUser={isFreePremium}
            onOpenUpgradeAccountDialog={onUpgradeAccountDialogOpen}
          />
        </GuardUserGroup>
      )}

      <UpgradeAccountDialog
        isOpened={isUpgradeAccountDialogOpened}
        handleClickSeePlans={handleClickSeePlans}
        handleClose={onUpgradeAccountDialogClose}
      />

      <PlansDialog onClose={onPlansDialogClose} open={isPlansDialogOpened} />

      <EditProjectDialog
        isOpened={isEditDialogOpened}
        handleFormSubmit={handleSubmit}
        onClose={onEditDialogClose}
      />
    </>
  );
};
