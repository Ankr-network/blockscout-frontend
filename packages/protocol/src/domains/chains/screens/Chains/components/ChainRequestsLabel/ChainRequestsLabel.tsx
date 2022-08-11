import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './useStyles';
import { ChainMainInfoProps } from './ChainRequestsLabelTypes';

export const ChainRequestsLabel = ({
  className = '',
  description,
  descriptionClassName,
  descriptionColor = 'textPrimary',
  label,
}: ChainMainInfoProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Typography
        className={classNames(descriptionClassName, classes.subtitle)}
        color={descriptionColor}
        noWrap
        variant="subtitle2"
      >
        {description?.toUpperCase()}
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
  );
};
