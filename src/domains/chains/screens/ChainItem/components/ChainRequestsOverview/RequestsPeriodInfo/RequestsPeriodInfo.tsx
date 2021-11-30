import React from 'react';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { Timeframe } from '@ankr.com/multirpc';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './RequestsPeriodInfoStyles';

interface RequestsPeriodInfoProps {
  className?: string;
  description?: string;
  title: string;
  onClick: () => void;
  isActive: boolean;
  timeframe: Timeframe;
  isLoading?: boolean;
}

export const RequestsPeriodInfo = ({
  title,
  description,
  onClick,
  isActive,
  className,
  timeframe,
  isLoading,
}: RequestsPeriodInfoProps) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(
        classes.root,
        className,
        isActive ? classes.active : '',
      )}
      onClick={isLoading ? () => null : onClick}
      role="button"
      tabIndex={-1}
    >
      {description && (
        <Typography variant="subtitle1" noWrap className={classes.description}>
          {description}
        </Typography>
      )}
      {isLoading ? (
        <Skeleton width="100%" className={classes.skeleton} />
      ) : (
        <>
          <Typography variant="subtitle2" noWrap className={classes.timeframe}>
            {timeframe}
          </Typography>
          <Typography variant="h3" noWrap className={classes.title}>
            {title}
          </Typography>
        </>
      )}
    </div>
  );
};
