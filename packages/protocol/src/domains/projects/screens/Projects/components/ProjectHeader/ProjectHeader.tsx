import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { ExternalLink } from '@ankr.com/ui';
import { ReactNode } from 'react';

import { NavLink } from 'uiKit/NavLink';
import { PROJECTS_DOCS_LINK } from 'domains/projects/const';

import { useProjectHeaderStyles } from './useProjectHeaderStyles';

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
