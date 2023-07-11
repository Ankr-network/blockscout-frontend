import { Plus } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { NavLink } from 'uiKit/NavLink';
import { useAddProjectButtonStyles } from './useAddProjectButtonStyles';

export const AddProjectButton = () => {
  const { classes } = useAddProjectButtonStyles();

  return (
    <NavLink
      className={classes.root}
      href={ProjectsRoutesConfig.newProject.generatePath()}
      fullWidth
      startIcon={<Plus />}
    >
      {t('projects.list-project.add-project')}
    </NavLink>
  );
};
