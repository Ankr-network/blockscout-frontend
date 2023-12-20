import {
  ContentType,
  UpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { Project } from 'domains/projects/utils/getAllProjects';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

import { ProjectHeader } from '../ProjectHeader';
import { ProjectsTable } from '../ProjectsTable';
import { AddProjectButton } from '../AddProjectButton';
import { UpgdareAccountDialog } from '../UpgdareAccountDialog';
import { EditProjectDialog } from '../EditProjectDialog';

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
  isLoaded,
  onEditDialogOpen,
  canEditProject,
  isFreePremium,
  onUpgradeAccountDialogOpen,
  isUpgradeAccountDialogOpened,
  handleClickSeePlans,
  onUpgradeAccountDialogClose,
  onPlansDialogClose,
  isPlansDialogOpened,
  isEditDialogOpened,
  handleSubmit,
  onEditDialogClose,
  hasProjectButton,
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

      <UpgdareAccountDialog
        isOpened={isUpgradeAccountDialogOpened}
        handleClickSeePlans={handleClickSeePlans}
        handleClose={onUpgradeAccountDialogClose}
      />

      <UpgradePlanDialog
        currency={TopUpCurrency.USD}
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
