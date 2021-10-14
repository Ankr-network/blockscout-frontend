import React from 'react';
import { Typography } from '@material-ui/core';

import { useStyles } from './useStyles';
import { PageHeaderProps } from './PageHeaderTypes';

export const PageHeader = ({ title, select, button }: PageHeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Typography variant="h5" noWrap className={classes.title}>
          {title}
        </Typography>
        {select}
      </div>
      {button}
    </div>
  );
};
