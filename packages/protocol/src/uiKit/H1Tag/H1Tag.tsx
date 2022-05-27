import React from 'react';
import { Typography } from '@material-ui/core';
import { useH1TagStyles } from './useH1TagStyles';

interface IH1TagProps {
  title: string;
}

export const H1Tag = ({ title }: IH1TagProps) => {
  const classes = useH1TagStyles();

  return (
    <Typography variant="h1" className={classes.title}>
      {title}
    </Typography>
  );
};
