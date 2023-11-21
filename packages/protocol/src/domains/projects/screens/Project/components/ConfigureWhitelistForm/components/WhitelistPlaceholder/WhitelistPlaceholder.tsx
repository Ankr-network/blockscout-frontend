import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ProjectsWellcomeImage } from 'domains/projects/components/ProjectsWelcomeImage';

import { useWhitelistPlaceholderStyles } from './useWhitelistPlaceholderStyles';

export const WhitelistPlaceholder = () => {
  const { classes } = useWhitelistPlaceholderStyles();

  return (
    <div className={classes.root}>
      <ProjectsWellcomeImage className={classes.image} />
      <Typography className={classes.text} variant="body2">
        {t('project.configure-whitelist-form.whitelist-placeholder')}
      </Typography>
    </div>
  );
};
