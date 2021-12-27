import React, { useMemo } from 'react';
import { Chip } from '@material-ui/core';
import classNames from 'classnames';

import { ArrowTopRightIcon } from 'uiKit/Icons/ArrowTopRightIcon';
import { ArrowDownRightIcon } from 'uiKit/Icons/ArrowDownRightIcon';

import { useStyles } from './useStyles';
import { DetailsBlockChipProps } from './DetailsBlockChipTypes';

export const DetailsBlockChip = ({
  label,
  type = 'positive',
  className = '',
}: DetailsBlockChipProps) => {
  const classes = useStyles();

  const isPositive = useMemo(() => type === 'positive', [type]);
  const color = useMemo(
    () => (isPositive ? 'primary' : 'secondary'),
    [isPositive],
  );

  return (
    <Chip
      className={className}
      label={label}
      color={color}
      classes={{
        root: classes.root,
        colorPrimary: classes.colorPrimary,
        colorSecondary: classes.colorSecondary,
        label: classes.label,
      }}
      icon={
        isPositive ? (
          <ArrowTopRightIcon
            className={classNames(classes.icon, classes.successIcon)}
          />
        ) : (
          <ArrowDownRightIcon
            className={classNames(classes.icon, classes.errorIcon)}
          />
        )
      }
    />
  );
};
