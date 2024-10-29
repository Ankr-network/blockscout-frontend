import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { UpgradeAccountDialog } from 'modules/common/components/UpgradeAccountDialog';

import { AddProjectButton } from '../AddProjectButton';
import { EditProjectDialog } from '../EditProjectDialog';
import { ProjectHeader } from '../ProjectHeader';
import { ProjectsTable } from '../ProjectsTable';

interface ProjectsFormContentProps {
  canEditProject: boolean;
  handleClickSeePlans: () => void;
  handleSubmit: () => void;
  hasProjectButton: boolean;
  isEditDialogOpened: boolean;
  isFreePremium: boolean;
  isPlansDialogOpened: boolean;
  isUpgradeAccountDialogOpened: boolean;
  onEditDialogClose: () => void;
  onEditDialogOpen: () => void;
  onPlansDialogClose: () => void;
  onUpgradeAccountDialogClose: () => void;
  onUpgradeAccountDialogOpen: () => void;
}

export const ProjectsFormContent = ({
  canEditProject,
  handleClickSeePlans,
  handleSubmit,
  hasProjectButton,
  isEditDialogOpened,
  isFreePremium,
  isPlansDialogOpened,
  isUpgradeAccountDialogOpened,
  onEditDialogClose,
  onEditDialogOpen,
  onPlansDialogClose,
  onUpgradeAccountDialogClose,
  onUpgradeAccountDialogOpen,
}: ProjectsFormContentProps) => {
  return (
    <>
      <ProjectHeader />
      <ProjectsTable onProjectDialogOpen={onEditDialogOpen} />
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
