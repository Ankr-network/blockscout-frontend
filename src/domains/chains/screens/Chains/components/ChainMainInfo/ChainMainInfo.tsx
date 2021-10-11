import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './ChainMainInfoStyles';
import { ChainMainInfoProps } from './ChainMainInfoTypes';

export const ChainMainInfo = ({
  logoSrc,
  name,
  description,
  label,
  descriptionClassName = '',
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
        <div className={classes.info}>
          <Typography
            variant="subtitle2"
            noWrap
            className={descriptionClassName}
          >
            {description}
          </Typography>
          {label && (
            <Typography
              className={classes.label}
              variant="caption"
              color="textSecondary"
            >
              {label}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
