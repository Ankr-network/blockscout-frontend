import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useChainBlockStyles } from './useChainBlockStyles';

interface IChainBlockProps {
  isLoading: boolean;
  subtitle: string;
  value: string;
}

export const ChainBlock = ({
  isLoading,
  subtitle,
  value,
}: IChainBlockProps) => {
  const classes = useChainBlockStyles();

  return (
    <div className={classes.block}>
      <Typography variant="subtitle1" className={classes.subtitle}>
        {subtitle}
      </Typography>
      <Typography variant="h4" className={classes.text}>
        {isLoading ? <Skeleton className={classes.skeleton} /> : value}
      </Typography>
    </div>
  );
};
