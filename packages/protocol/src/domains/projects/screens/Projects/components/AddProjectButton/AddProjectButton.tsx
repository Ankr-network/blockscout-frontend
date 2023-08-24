import { Plus } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { Button } from '@mui/material';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { NavLink } from 'uiKit/NavLink';

import { useAddProjectButtonStyles } from './useAddProjectButtonStyles';

interface AddProjectButtonProps {
  canEditProject: boolean;
  handleOpenAddProjectDialog: () => void;
}

export const AddProjectButton = ({
  canEditProject,
  handleOpenAddProjectDialog,
}: AddProjectButtonProps) => {
  const { classes } = useAddProjectButtonStyles();

  if (canEditProject) {
    return (
      <NavLink
        className={classes.root}
        href={ProjectsRoutesConfig.newProject.generatePath()}
        fullWidth
        startIcon={<Plus />}
      >
        {t(
          `projects.list-project.${
            canEditProject ? 'edit-project' : 'add-project'
          }`,
        )}
      </NavLink>
    );
  }

  return (
    <Button fullWidth startIcon={<Plus />} onClick={handleOpenAddProjectDialog}>
      {t('projects.list-project.add-project')}
    </Button>
  );
};
