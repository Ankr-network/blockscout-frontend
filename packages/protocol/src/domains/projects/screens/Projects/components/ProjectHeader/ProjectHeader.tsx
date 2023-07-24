import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { ExternalLink } from '@ankr.com/ui';
import { ReactNode } from 'react';

import { NavLink } from 'uiKit/NavLink';

import { useProjectHeaderStyles } from './useProjectHeaderStyles';

const PROJECTS_DOCS_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/projects/';

interface ProjectHeaderProps {
  search: ReactNode;
}

export const ProjectHeader = ({ search }: ProjectHeaderProps) => {
  const { classes } = useProjectHeaderStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h5" className={classes.title}>
          {t('projects.list-project.title')}
        </Typography>
        <NavLink className={classes.link} href={PROJECTS_DOCS_LINK}>
          {t('projects.list-project.how-to-get-started')}
          <ExternalLink color="primary" />
        </NavLink>
      </div>
      {search}
    </div>
  );
};
