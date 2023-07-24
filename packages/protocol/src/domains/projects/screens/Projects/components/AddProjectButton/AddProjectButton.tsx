import { Plus } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { NavLink } from 'uiKit/NavLink';

import { useAddProjectButtonStyles } from './useAddProjectButtonStyles';

interface AddProjectButtonProps {
  canEditProject: boolean;
}

export const AddProjectButton = ({ canEditProject }: AddProjectButtonProps) => {
  const { classes } = useAddProjectButtonStyles();

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
};
