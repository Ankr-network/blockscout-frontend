import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';
import { useActiveLabelStyles } from './useActiveLabelStyles';

export const ActiveLabel = () => {
  const { classes } = useActiveLabelStyles();

  return (
    <Typography className={classes.root}>
      {t('projects.list-project.active')}
    </Typography>
  );
};
