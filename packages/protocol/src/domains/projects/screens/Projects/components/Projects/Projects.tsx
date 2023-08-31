/* eslint-disable max-lines-per-function */
import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { useProjects } from 'domains/projects/hooks/useProjects';
import { selectAllProjects } from 'domains/projects/store';
import { Search } from 'modules/common/components/Search';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';
import { useDialog } from 'modules/common/hooks/useDialog';
import {
  AddProjectState,
  useAddAndEditProject,
} from 'domains/projects/hooks/useAddAndEditProject';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

import { ProjectHeader } from '../ProjectHeader';
import { ProjectTable } from '../ProjectTable';
import { AddAndEditProjectDialog } from '../AddAndEditProjectDialog';
import {
  AddAndEditProjectDialogFields,
  AddAndEditProjectDialogType,
} from '../AddAndEditProjectForm/AddAndEditProjectFormUtils';
import { AddProjectButton } from '../AddProjectButton';
import { initialValues } from '../../hooks/useProjectFormValues';

export const Projects = () => {
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useSearch();

  const { canEditProject } = useProjectConfig();
  const { canAddProject, allowedAddProjectTokenIndex, isLoading } =
    useProjects();

  const allProjects = useAppSelector(selectAllProjects);

  const {
    isOpened: isAddAndEditDialogOpened,
    onClose: onAddAndEditDialogClose,
    onOpen: onAddAndEditDialogOpen,
  } = useDialog();

  const { addProjectState, handleCreate, handleUpdate, setAddProjectState } =
    useAddAndEditProject(allowedAddProjectTokenIndex);

  const handleCloseAddAndEditDialog = useCallback(() => {
    onAddAndEditDialogClose();
    setAddProjectState(AddProjectState.initial);
  }, [onAddAndEditDialogClose, setAddProjectState]);

  const handleFormSubmit = useCallback(
    async (values: AddAndEditProjectDialogType, form) => {
      const nameFieldState = form.getFieldState(
        AddAndEditProjectDialogFields.name,
      );

      const descriptionFieldState = form.getFieldState(
        AddAndEditProjectDialogFields.description,
      );

      const isDescriptionChanged = descriptionFieldState.modified;
      const isNothingChanged =
        !nameFieldState.modified && !isDescriptionChanged;
      const isNameEqualWithInitalValue = !nameFieldState.dirty;

      if (
        isNothingChanged ||
        (isNameEqualWithInitalValue && !isDescriptionChanged)
      ) {
        handleCloseAddAndEditDialog();

        return;
      }

      const isOnlyDescriptionChanged =
        !nameFieldState.modified && descriptionFieldState.modified;

      const { name, description, isEditingProjectDialog, tokenIndex } = values;

      const resultName = name ?? '';
      const hasNameDuplication = allProjects.some(
        project => project.name === resultName,
      );

      if (
        hasNameDuplication &&
        !isNameEqualWithInitalValue &&
        !isOnlyDescriptionChanged
      ) {
        dispatch(
          NotificationActions.showNotification({
            message: t('projects.new-project.error-message.name-duplication', {
              value: name,
            }),
            severity: 'error',
          }),
        );

        return;
      }

      if (isEditingProjectDialog) {
        await handleUpdate(tokenIndex, resultName, description ?? '');
        handleCloseAddAndEditDialog();
      } else {
        await handleCreate(resultName, description ?? '');
      }

      form.change(AddAndEditProjectDialogFields.isEditingProjectDialog, false);
      form.change(
        AddAndEditProjectDialogFields.tokenIndex,
        allowedAddProjectTokenIndex,
      );
    },
    [
      allowedAddProjectTokenIndex,
      allProjects,
      dispatch,
      handleCloseAddAndEditDialog,
      handleCreate,
      handleUpdate,
    ],
  );

  const hasProjectButton = (!isLoading && canAddProject) || canEditProject;

  const renderForm = useCallback(
    ({ form, handleSubmit }: FormRenderProps<AddAndEditProjectDialogType>) => {
      const handleOpenAddProjectDialog = () => {
        const { values } = form.getState();

        // resetting form for adding project after editing another one
        if (values?.isEditingProjectDialog) {
          form.reset();
          form.initialize(initialValues);
        }

        onAddAndEditDialogOpen();
      };

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
            onProjectDialogOpen={onAddAndEditDialogOpen}
          />
          {hasProjectButton && (
            <AddProjectButton
              canEditProject={canEditProject}
              handleOpenAddProjectDialog={handleOpenAddProjectDialog}
            />
          )}

          <AddAndEditProjectDialog
            isOpened={isAddAndEditDialogOpened}
            addProjectState={addProjectState}
            allowedAddProjectTokenIndex={allowedAddProjectTokenIndex}
            handleFormSubmit={handleSubmit}
            onClose={handleCloseAddAndEditDialog}
          />
        </>
      );
    },
    [
      searchContent,
      setSearchContent,
      allProjects,
      isLoading,
      onAddAndEditDialogOpen,
      hasProjectButton,
      canEditProject,
      isAddAndEditDialogOpened,
      addProjectState,
      allowedAddProjectTokenIndex,
      handleCloseAddAndEditDialog,
    ],
  );

  return <Form onSubmit={handleFormSubmit} render={renderForm} />;
};
