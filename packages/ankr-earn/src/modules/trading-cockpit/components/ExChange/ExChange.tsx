import { Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useExChangeStyles } from './useExChangeStyles';

interface IExChangeProps {
  title: string;
  iconSlot: ReactNode;
}

export const ExChange = ({ title, iconSlot }: IExChangeProps) => {
  const classes = useExChangeStyles();

  return (
    <div className={classes.root}>
      <i className={classes.icon}>{iconSlot}</i>
      <Typography variant="body2" className={classes.title}>
        {title}
      </Typography>
    </div>
  );
};
