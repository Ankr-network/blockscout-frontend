import React from 'react';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';

import { useStyles } from './RequestsPeriodInfoStyles';

interface RequestsPeriodInfoProps {
  className?: string;
  description?: string;
  title: string;
  onClick: () => void;
  isActive: boolean;
}

export const RequestsPeriodInfo = ({
  title,
  description,
  onClick,
  isActive,
  className,
}: RequestsPeriodInfoProps) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(
        classes.root,
        className,
        isActive ? classes.active : '',
      )}
      onClick={onClick}
      role="button"
      tabIndex={-1}
    >
      {description && (
        <Typography variant="subtitle1" noWrap className={classes.description}>
          {description}
        </Typography>
      )}
      <Typography variant="h3" noWrap className={classes.title}>
        {title}
      </Typography>
    </div>
  );
};
