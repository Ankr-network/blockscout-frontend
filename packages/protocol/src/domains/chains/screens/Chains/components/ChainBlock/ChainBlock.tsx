import React from 'react';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import { useChainBlockStyles } from './useChainBlockStyles';

interface IChainBlockProps {
  className?: string;
  isLoading: boolean;
  subtitle: string;
  value: string;
}

export const ChainBlock = ({
  className,
  isLoading,
  subtitle,
  value,
}: IChainBlockProps) => {
  const classes = useChainBlockStyles();

  return (
    <div className={classNames(className, classes.block)}>
      <Typography variant="subtitle1" className={classes.subtitle}>
        {subtitle}
      </Typography>
      <Typography variant="h4" className={classes.text}>
        {isLoading ? <Skeleton className={classes.skeleton} /> : value}
      </Typography>
    </div>
  );
};
