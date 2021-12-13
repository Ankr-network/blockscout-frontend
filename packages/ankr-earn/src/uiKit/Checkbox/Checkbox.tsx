import React from 'react';
import classNames from 'classnames';

import { useStyles } from './useCheckboxStyles';

export const CheckboxIcon = () => {
  const classes = useStyles();

  return <span className={classes.icon} />;
};

export const CheckboxCheckedIcon = () => {
  const classes = useStyles();

  return <span className={classNames(classes.icon, classes.checkedIcon)} />;
};
