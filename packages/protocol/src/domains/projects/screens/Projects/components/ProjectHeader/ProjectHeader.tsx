import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { ExternalLink } from '@ankr.com/ui';

import { NavLink } from 'uiKit/NavLink';
import { PROJECTS_DOCS_LINK } from 'domains/projects/const';

import { AvailableProjectsCount } from '../AvailableProjectsCount';
import { useProjectHeaderStyles } from './useProjectHeaderStyles';

export const ProjectHeader = () => {
  const { classes } = useProjectHeaderStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h5" className={classes.title}>
          {t('projects.list-project.title')}
        </Typography>

        <AvailableProjectsCount />
      </div>

      <NavLink className={classes.link} href={PROJECTS_DOCS_LINK}>
        {t('projects.list-project.how-to-get-started')}
        <ExternalLink color="primary" />
      </NavLink>
    </div>
  );
};
