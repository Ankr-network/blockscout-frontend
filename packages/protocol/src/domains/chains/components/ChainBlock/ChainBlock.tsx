import { ReactNode } from 'react';
import { Typography, Skeleton } from '@mui/material';

import { useChainBlockStyles } from './useChainBlockStyles';

export interface IChainBlockProps {
  className?: string;
  extra?: ReactNode;
  isLoading: boolean;
  subtitle?: ReactNode;
  value: string;
}

export const ChainBlock = ({
  className,
  extra,
  isLoading,
  subtitle,
  value,
}: IChainBlockProps) => {
  const { classes, cx } = useChainBlockStyles();

  return (
    <div className={cx(className, classes.block)}>
      <div className={classes.main}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {subtitle}
        </Typography>
        <Typography variant="h4" className={classes.text}>
          {isLoading ? <Skeleton className={classes.skeleton} /> : value}
        </Typography>
      </div>
      {extra}
    </div>
  );
};
