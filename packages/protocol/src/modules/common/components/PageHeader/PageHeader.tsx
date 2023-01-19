import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { useStyles } from './useStyles';

export interface PageHeaderProps {
  title?: string;
  select?: ReactNode;
  button?: ReactNode;
}

export const PageHeader = ({ title, select, button }: PageHeaderProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        {title && (
          <Typography variant="h5" noWrap className={classes.title}>
            {title}
          </Typography>
        )}
        {select}
      </div>
      {button}
    </div>
  );
};
