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
  totalRequests,
}: ChainMainInfoProps) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.root, className)}>
      <img className={classes.logo} src={logoSrc} alt={name} />
      <div className={classes.right}>
        <Typography variant="h4" noWrap className={classes.title}>
          {name}
        </Typography>
        {totalRequests && (
          <div className={classes.req}>
            {totalRequests} req <span className={classes.day}>30d</span>
          </div>
        )}
        {description}
      </div>
    </div>
  );
};
