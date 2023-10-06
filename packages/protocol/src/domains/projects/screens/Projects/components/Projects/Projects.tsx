/* eslint-disable max-lines-per-function */
import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useProjects } from 'domains/projects/hooks/useProjects';
import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';
import { Search } from 'modules/common/components/Search';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useEditProject } from 'domains/projects/hooks/useEditProject';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import {
  ContentType,
  UpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { ProjectHeader } from '../ProjectHeader';
import { ProjectTable } from '../ProjectTable';
import { AddProjectButton } from '../AddProjectButton';
import { WelcomeDialog } from '../WelcomeDialog';
import { EditProjectDialog } from '../EditProjectDialog';
import {
  EditProjectDialogType,
  EditProjectDialogFields,
} from '../EditProjectDialog/EditProjectDialogUtils';
import { UpgdareAccountDialog } from '../UpgdareAccountDialog';

export const Projects = () => {
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useSearch();

  const { isFreePremium } = useAuth();

  const { canEditProject } = useProjectConfig();
  const { canAddProject, isLoading } = useProjects();

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

  const { handleUpdate } = useEditProject();

  const handleClickSeePlans = useCallback(() => {
    onUpgradeAccountDialogClose();
    onPlansDialogOpen();
  }, [onPlansDialogOpen, onUpgradeAccountDialogClose]);

  const handleFormSubmit = useCallback(
    async (values: EditProjectDialogType, form) => {
      const nameFieldState = form.getFieldState(EditProjectDialogFields.name);

      const isNameEqualWithInitalValue =
        !nameFieldState.dirty || !nameFieldState.modified;

      if (isNameEqualWithInitalValue) {
        onEditDialogClose();

        return;
      }

      const { name, tokenIndex } = values;

      const resultName = name ?? '';
      const hasNameDuplication = allProjects.some(
        project => project.name === resultName,
      );

      if (hasNameDuplication && !isNameEqualWithInitalValue) {
        dispatch(
          NotificationActions.showNotification({
            message: t(
              'projects.rename-dialog.error-message.name-duplication',
              {
                value: name,
              },
            ),
            severity: 'error',
          }),
        );

        return;
      }

      await handleUpdate({
        tokenIndex,
        name: resultName,
        oldName: nameFieldState.initial,
      });

      onEditDialogClose();
    },
    [allProjects, handleUpdate, onEditDialogClose, dispatch],
  );

  const hasProjectButton = (!isLoading && canAddProject) || canEditProject;

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<EditProjectDialogType>) => {
      return (
        <>
          <ProjectHeader
            search={
              <Search
                searchContent={searchContent}
                setSearchContent={setSearchContent}
              />
            }
          />
          <ProjectTable
            searchContent={searchContent}
            data={allProjects}
            isLoading={isLoading}
            onProjectDialogOpen={onEditDialogOpen}
          />
          {hasProjectButton && (
            <AddProjectButton
              canEditProject={canEditProject}
              isFreemiumUser={isFreePremium}
              onOpenUpgradeAccountDialog={onUpgradeAccountDialogOpen}
            />
          )}

          <WelcomeDialog />

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
          <GuardUserGroup blockName={BlockWithPermission.ProjectsWelcomeDialog}>
            <WelcomeDialog />
          </GuardUserGroup>
        </>
      );
    },
    [
      allProjects,
      canEditProject,
      hasProjectButton,
      isEditDialogOpened,
      isLoading,
      isUpgradeAccountDialogOpened,
      isPlansDialogOpened,
      isFreePremium,
      onEditDialogClose,
      onEditDialogOpen,
      searchContent,
      setSearchContent,
      onUpgradeAccountDialogOpen,
      handleClickSeePlans,
      onPlansDialogClose,
      onUpgradeAccountDialogClose,
    ],
  );

  return <Form onSubmit={handleFormSubmit} render={renderForm} />;
};
