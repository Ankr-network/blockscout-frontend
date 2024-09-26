import { ReactNode } from 'react';
import { Skeleton, Tooltip } from '@mui/material';

import { useStatStyles } from './useStatStyles';

export interface StatProps {
  className?: string;
  extra?: ReactNode;
  loading: boolean;
  title: string;
  tooltipText?: string;
  value: string;
}

export const Stat = ({
  className,
  extra,
  loading,
  title,
  tooltipText,
  value,
}: StatProps) => {
  const { classes, cx } = useStatStyles();

  return (
    <div className={cx(className, classes.stat)}>
      <div className={classes.main}>
        <div className={classes.title}>
          {tooltipText ? (
            <Tooltip title={tooltipText} placement="top">
              <span className={classes.tooltipTitle}>{title}</span>
            </Tooltip>
          ) : (
            title
          )}
        </div>
        <div className={classes.value}>
          {loading ? <Skeleton className={classes.skeleton} /> : value}
        </div>
      </div>
      {extra}
    </div>
  );
};
