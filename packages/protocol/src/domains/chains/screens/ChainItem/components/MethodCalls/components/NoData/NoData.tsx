import React from 'react';
import { Typography } from '@material-ui/core';
import { useNoDataStyles } from './useNoDataStyles';

interface INoDataProps {
  title: string;
  content: string;
}

export const NoData = ({ title, content }: INoDataProps) => {
  const classes = useNoDataStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.content}>
        {content}
      </Typography>
    </div>
  );
};
