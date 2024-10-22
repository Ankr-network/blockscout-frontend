import { Button } from '@mui/material';
import { FormRenderProps } from 'react-final-form';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { ProjectBanner } from 'domains/projects/components/ProjectBanner';
import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';
import { selectIsInactiveStatus } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useProjects } from 'domains/projects/hooks/useProjects';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { EditProjectDialogType } from '../EditProjectDialog/EditProjectDialogUtils';
import { ProjectsFormContent } from '../ProjectsFormContent/ProjectsFormContent';
import { useProjectsStyles } from './useProjectsStyles';
import { useSubmit } from './useSubmit';

export const useProjectsForm = () => {
  const { classes } = useProjectsStyles();
  const { isFreePremium } = useAuth();
  const { push } = useHistory();

  const { canEditProject } = useProjectConfig();
  const { canAddProject, isLoaded } = useProjects({
    skipFetchingProjects: false,
  });

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const allProjects = useAppSelector(state =>
    selectAllProjects(state, { group }),
  );

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

  const redirectToBalance = useCallback(() => {
    push(AccountRoutesConfig.accountDetails.generatePath());
  }, [push]);

  const isInactive = useAppSelector(selectIsInactiveStatus);

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<EditProjectDialogType>) => {
      return (
        <>
          {isInactive && (
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
      isInactive,
      classes,
      redirectToBalance,
      onEditDialogClose,
      onEditDialogOpen,
      isLoaded,
      onUpgradeAccountDialogOpen,
      handleClickSeePlans,
      onPlansDialogClose,
      onUpgradeAccountDialogClose,
    ],
  );

  return {
    handleFormSubmit,
    renderForm,
  };
};
