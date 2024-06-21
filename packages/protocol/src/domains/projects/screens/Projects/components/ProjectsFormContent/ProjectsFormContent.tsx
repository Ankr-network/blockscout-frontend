import {
  ContentType,
  UpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { ECurrency } from 'modules/payments/types';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { Project } from 'domains/projects/utils/getAllProjects';

import { AddProjectButton } from '../AddProjectButton';
import { EditProjectDialog } from '../EditProjectDialog';
import { ProjectHeader } from '../ProjectHeader';
import { ProjectsTable } from '../ProjectsTable';
import { UpgradeAccountDialog } from '../UpgradeAccountDialog';

interface ProjectsFormContentProps {
  allProjects: Project[];
  isLoaded: boolean;
  onEditDialogOpen: () => void;
  canEditProject: boolean;
  isFreePremium: boolean;
  onUpgradeAccountDialogOpen: () => void;
  isUpgradeAccountDialogOpened: boolean;
  handleClickSeePlans: () => void;
  onUpgradeAccountDialogClose: () => void;
  onPlansDialogClose: () => void;
  isPlansDialogOpened: boolean;
  isEditDialogOpened: boolean;
  handleSubmit: () => void;
  onEditDialogClose: () => void;
  hasProjectButton: boolean;
}

export const ProjectsFormContent = ({
  allProjects,
  canEditProject,
  handleClickSeePlans,
  handleSubmit,
  hasProjectButton,
  isEditDialogOpened,
  isFreePremium,
  isLoaded,
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

      <ProjectsTable
        data={allProjects}
        isLoading={!isLoaded}
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

      <UpgradePlanDialog
        currency={ECurrency.USD}
        defaultState={ContentType.DEFAULT}
        onClose={onPlansDialogClose}
        open={isPlansDialogOpened}
      />

      <EditProjectDialog
        isOpened={isEditDialogOpened}
        handleFormSubmit={handleSubmit}
        onClose={onEditDialogClose}
      />
    </>
  );
};
