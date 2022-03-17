import React from 'react';
import { StyledComponentProps, Typography } from '@material-ui/core';
import { useNoticeStyles } from './useNoticeStyles';

interface INoticeProps extends StyledComponentProps {
  children: string;
}

export const Notice = ({ children }: INoticeProps) => {
  const classes = useNoticeStyles();

  return (
    <Typography variant="subtitle1" className={classes.root}>
      {children}
    </Typography>
  );
};
