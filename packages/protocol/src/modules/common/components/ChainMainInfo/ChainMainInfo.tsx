import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './ChainMainInfoStyles';
import { ChainMainInfoProps } from './ChainMainInfoTypes';

export const ChainMainInfo = ({
  logoSrc,
  name,
  description,
  className = '',
}: ChainMainInfoProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <img className={classes.logo} src={logoSrc} alt={name} />
      <div className={classes.right}>
        <Typography variant="h4" noWrap className={classes.title}>
          {name}
        </Typography>
        {description}
      </div>
    </div>
  );
};
