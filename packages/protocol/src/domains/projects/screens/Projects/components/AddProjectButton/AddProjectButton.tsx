import { Plus, Lock } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { Button } from '@mui/material';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { NavLink } from 'uiKit/NavLink';

import { useAddProjectButtonStyles } from './useAddProjectButtonStyles';

interface AddProjectButtonProps {
  canEditProject: boolean;
  isFreemiumUser: boolean;
  onOpenUpgradeAccountDialog: () => void;
}

export const AddProjectButton = ({
  canEditProject,
  isFreemiumUser,
  onOpenUpgradeAccountDialog,
}: AddProjectButtonProps) => {
  const { classes } = useAddProjectButtonStyles();

  if (isFreemiumUser) {
    return (
      <Button
        fullWidth
        variant="outlined"
        className={classes.root}
        startIcon={<Lock className={classes.icon} />}
        onClick={onOpenUpgradeAccountDialog}
      >
        {t(`projects.list-project.create-project`)}
      </Button>
    );
  }

  return (
    <NavLink
      fullWidth
      variant="outlined"
      className={classes.root}
      href={ProjectsRoutesConfig.newProject.generatePath()}
      startIcon={<Plus className={classes.icon} />}
    >
      {t(
        `projects.list-project.${
          canEditProject ? 'edit-project' : 'create-project'
        }`,
      )}
    </NavLink>
  );
};
