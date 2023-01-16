import { ReactNode } from 'react';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';

import { useStatStyles } from './StatStyles';

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
  const classes = useStatStyles();

  return (
    <div className={classNames(className, classes.stat)}>
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
