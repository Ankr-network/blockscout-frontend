import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { useExChangeStyles } from './useExChangeStyles';

interface IExChangeProps {
  title: string;
  iconSlot: ReactNode;
  className?: string;
}

export const ExChange = ({
  title,
  iconSlot,
  className,
}: IExChangeProps): JSX.Element => {
  const classes = useExChangeStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <i className={classes.icon}>{iconSlot}</i>

      <Typography className={classes.title} variant="body2">
        {title}
      </Typography>
    </div>
  );
};
