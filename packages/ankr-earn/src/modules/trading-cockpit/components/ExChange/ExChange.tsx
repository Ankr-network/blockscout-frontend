import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { useExChangeStyles } from './useExChangeStyles';

interface IExChangeProps {
  title: string;
  iconSlot: ReactNode;
  className?: string;
}

export const ExChange = ({ title, iconSlot, className }: IExChangeProps) => {
  const classes = useExChangeStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <i className={classes.icon}>{iconSlot}</i>
      <Typography variant="body2" className={classes.title}>
        {title}
      </Typography>
    </div>
  );
};
