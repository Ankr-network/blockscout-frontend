import { useCallback } from 'react';
import { FormRenderProps } from 'react-final-form';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import { t } from '@ankr.com/common';
import { PremiumStatus } from 'multirpc-sdk';

import { useProjects } from 'domains/projects/hooks/useProjects';
import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ProjectBanner } from 'domains/projects/components/ProjectBanner';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import { EditProjectDialogType } from '../EditProjectDialog/EditProjectDialogUtils';
import { useSubmit } from './useSubmit';
import { ProjectsFormContent } from '../ProjectsFormContent/ProjectsFormContent';
import { useOnboarding } from '../../hooks/useOnboarding';
import { ProjectsOnboardingDialog } from '../ProjectsOnboarding/ProjectsOnboardingDialog';
import { useProjectsStyles } from './useProjectsStyles';

export const useProjectsForm = () => {
  const { classes } = useProjectsStyles();
  const { isFreePremium, premiumStatus } = useAuth();
  const { push } = useHistory();

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

  const redirectToBalance = useCallback(() => {
    push(AccountRoutesConfig.accountDetails.generatePath());
  }, [push]);

  const isSuspended = premiumStatus === PremiumStatus.INACTIVE;

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<EditProjectDialogType>) => {
      return (
        <>
          {isSuspended && (
            <ProjectBanner
              className={classes.banner}
              message={t('project.banner.suspended')}
              button={
                <GuardUserGroup blockName={BlockWithPermission.Billing}>
                  <Button
                    className={classes.bannerButton}
                    size="small"
                    onClick={redirectToBalance}
                  >
                    {t('project.banner.suspended-button')}
                  </Button>
                </GuardUserGroup>
              }
            />
          )}
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
      isSuspended,
      classes,
      redirectToBalance,
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
