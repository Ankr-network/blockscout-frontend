import React from 'react';
import { Typography } from '@mui/material';

import { useStyles } from './ChainMainInfoStyles';
import { ChainMainInfoProps } from './ChainMainInfoTypes';

export const ChainMainInfo = ({
  logoSrc,
  name,
  className = '',
}: ChainMainInfoProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <img className={classes.logo} src={logoSrc} alt="" />
      <div className={classes.right}>
        <Typography variant="h3" noWrap className={classes.title}>
          {name}
        </Typography>
      </div>
    </div>
  );
};
