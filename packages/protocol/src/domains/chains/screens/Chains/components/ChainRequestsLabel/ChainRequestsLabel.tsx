import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './useStyles';
import { ChainMainInfoProps } from './ChainRequestsLabelTypes';

export const ChainRequestsLabel = ({
  description,
  label,
  descriptionColor = 'textPrimary',
  className = '',
}: ChainMainInfoProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Typography
        className={classes.subtitle}
        variant="subtitle2"
        noWrap
        color={descriptionColor}
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
