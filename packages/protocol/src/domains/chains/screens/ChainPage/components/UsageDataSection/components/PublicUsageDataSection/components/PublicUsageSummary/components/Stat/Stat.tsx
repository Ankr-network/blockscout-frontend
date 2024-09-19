import { ReactNode } from 'react';
import { Skeleton } from '@mui/material';

import { useStatStyles } from './useStatStyles';

export interface StatProps {
  className?: string;
  extra?: ReactNode;
  loading: boolean;
  title?: string;
  value: string;
}

export const Stat = ({
  className,
  extra,
  loading,
  title,
  value,
}: StatProps) => {
  const { classes, cx } = useStatStyles();

  return (
    <div className={cx(className, classes.stat)}>
      <div className={classes.main}>
        <div className={classes.title}>{title}</div>
        <div className={classes.value}>
          {loading ? <Skeleton className={classes.skeleton} /> : value}
        </div>
      </div>
      {extra}
    </div>
  );
};
