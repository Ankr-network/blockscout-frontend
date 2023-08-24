import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

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

import { ProjectHeader } from '../ProjectHeader';
import { ProjectTable } from '../ProjectTable';
import { AddAndEditProjectDialog } from '../AddAndEditProjectDialog';
import {
  AddAndEditProjectDialogFields,
  AddAndEditProjectDialogType,
} from '../AddAndEditProjectForm/AddAndEditProjectFormUtils';
import { AddProjectButton } from '../AddProjectButton';

export const Projects = () => {
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
      const { name, description, isEditingProjectDialog, tokenIndex } = values;

      if (isEditingProjectDialog) {
        await handleUpdate(tokenIndex, name ?? '', description ?? '');
        handleCloseAddAndEditDialog();
      } else {
        await handleCreate(name ?? '', description ?? '');
      }

      form.change(AddAndEditProjectDialogFields.isEditingProjectDialog, false);
      form.change(
        AddAndEditProjectDialogFields.tokenIndex,
        allowedAddProjectTokenIndex,
      );
    },
    [
      allowedAddProjectTokenIndex,
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
