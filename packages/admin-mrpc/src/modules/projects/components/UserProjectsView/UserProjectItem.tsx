import { UserProject } from 'multirpc-sdk';
import { Button, Paper, Typography } from '@mui/material';

import { t } from 'modules/i18n/utils/intl';

import { useUserProjectsViewStyles } from './UserProjectsViewStyles';

interface UserProjectItemProps extends UserProject {
  onDeleteUserProject: (index: number) => void;
  isLoadingDeleteUser: boolean;
}

export const UserProjectItem = ({
  index,
  name,
  description,
  config,
  onDeleteUserProject,
  isLoadingDeleteUser,
}: UserProjectItemProps) => {
  const { classes } = useUserProjectsViewStyles();

  return (
    <Paper className={classes.projectItem}>
      <Typography
        className={classes.projectValue}
        component="p"
        variant="body2"
      >
        {t('projects.view.project-index', { index })}
      </Typography>
      {name && (
        <Typography
          className={classes.projectValue}
          component="p"
          variant="body2"
        >
          {name}
        </Typography>
      )}
      {description && (
        <Typography
          className={classes.projectValue}
          component="p"
          variant="body2"
        >
          {description}
        </Typography>
      )}
      {config && (
        <Typography
          className={classes.projectValue}
          component="p"
          variant="body2"
        >
          {config}
        </Typography>
      )}
      {index > 0 && (
        <Button
          fullWidth
          variant="outlined"
          color="error"
          className={classes.deleteProjectButton}
          onClick={() => onDeleteUserProject(index)}
          disabled={isLoadingDeleteUser}
        >
          {t('projects.view.delete-button')}
        </Button>
      )}
    </Paper>
  );
};
