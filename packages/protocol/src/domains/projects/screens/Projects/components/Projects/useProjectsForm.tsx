import { useCallback } from 'react';
import { FormRenderProps } from 'react-final-form';

import { useProjects } from 'domains/projects/hooks/useProjects';
import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { EditProjectDialogType } from '../EditProjectDialog/EditProjectDialogUtils';
import { useSubmit } from './useSubmit';
import { ProjectsFormContent } from '../ProjectsFormContent/ProjectsFormContent';
import { useOnboarding } from '../../hooks/useOnboarding';
import { ProjectsOnboardingDialog } from '../ProjectsOnboarding/ProjectsOnboardingDialog';

export const useProjectsForm = () => {
  const { isFreePremium } = useAuth();

  const { canEditProject } = useProjectConfig();
  const { canAddProject, isLoaded } = useProjects();

  const allProjects = useAppSelector(selectAllProjects);

  const {
    isOpened: isEditDialogOpened,
    onClose: onEditDialogClose,
    onOpen: onEditDialogOpen,
  } = useDialog();

  const {
    isOpened: isUpgradeAccountDialogOpened,
    onClose: onUpgradeAccountDialogClose,
    onOpen: onUpgradeAccountDialogOpen,
  } = useDialog();

  const {
    isOpened: isPlansDialogOpened,
    onClose: onPlansDialogClose,
    onOpen: onPlansDialogOpen,
  } = useDialog();

  const handleClickSeePlans = useCallback(() => {
    onUpgradeAccountDialogClose();
    onPlansDialogOpen();
  }, [onPlansDialogOpen, onUpgradeAccountDialogClose]);

  const { handleFormSubmit } = useSubmit({ onEditDialogClose, allProjects });

  const hasProjectButton = (isLoaded && canAddProject) || canEditProject;

  const {
    isOpened: isOpenedOnboardingDialog,
    onClose: onCloseOnboardingDialog,
  } = useOnboarding();

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<EditProjectDialogType>) => {
      return (
        <>
          <ProjectsFormContent
            allProjects={allProjects}
            isLoaded={isLoaded}
            onEditDialogOpen={onEditDialogOpen}
            canEditProject={canEditProject}
            isFreePremium={isFreePremium}
            onUpgradeAccountDialogOpen={onUpgradeAccountDialogOpen}
            isUpgradeAccountDialogOpened={isUpgradeAccountDialogOpened}
            handleClickSeePlans={handleClickSeePlans}
            onUpgradeAccountDialogClose={onUpgradeAccountDialogClose}
            onPlansDialogClose={onPlansDialogClose}
            isPlansDialogOpened={isPlansDialogOpened}
            isEditDialogOpened={isEditDialogOpened}
            handleSubmit={handleSubmit}
            onEditDialogClose={onEditDialogClose}
            hasProjectButton={hasProjectButton}
          />

          <ProjectsOnboardingDialog
            isOpened={isOpenedOnboardingDialog}
            onClose={onCloseOnboardingDialog}
          />
        </>
      );
    },
    [
      allProjects,
      canEditProject,
      hasProjectButton,
      isEditDialogOpened,
      isUpgradeAccountDialogOpened,
      isPlansDialogOpened,
      isFreePremium,
      onEditDialogClose,
      onEditDialogOpen,
      isLoaded,
      onUpgradeAccountDialogOpen,
      handleClickSeePlans,
      onPlansDialogClose,
      onUpgradeAccountDialogClose,
      isOpenedOnboardingDialog,
      onCloseOnboardingDialog,
    ],
  );

  return {
    handleFormSubmit,
    renderForm,
  };
};
