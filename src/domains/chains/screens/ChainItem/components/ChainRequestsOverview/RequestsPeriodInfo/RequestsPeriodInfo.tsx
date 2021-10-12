import React from 'react';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';

import { useStyles } from './RequestsPeriodInfoStyles';

interface RequestsPeriodInfoProps {
  className?: string;
  description: string;
  title: string;
}

export const RequestsPeriodInfo = ({
  className,
  description,
  title,
}: RequestsPeriodInfoProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Typography variant="body1" noWrap className={classes.description}>
        {description}
      </Typography>
      <Typography variant="h2" noWrap className={classes.title}>
        {title}
      </Typography>
    </div>
  );
};
