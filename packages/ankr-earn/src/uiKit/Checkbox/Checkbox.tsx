import React from 'react';
import classNames from 'classnames';
import {
  Checkbox as CheckboxComponent,
  CheckboxProps,
  FormControlLabel,
} from '@material-ui/core';

import { useStyles } from './useCheckboxStyles';

export interface ICheckboxProps extends CheckboxProps {
  label?: string;
}

export const CheckboxIcon = () => {
  const classes = useStyles();

  return <span className={classes.icon} />;
};

export const CheckboxCheckedIcon = () => {
  const classes = useStyles();

  return <span className={classNames(classes.icon, classes.checkedIcon)} />;
};

export const Checkbox = (props: ICheckboxProps) => {
  const classes = useStyles();
  const { label, checked, disabled, defaultChecked, ...rest } = props;

  const labelClassName = checked
    ? classes.labelActive
    : disabled
    ? classes.labelDisabled
    : classes.labelStandart;

  return (
    <FormControlLabel
      control={
        <CheckboxComponent
          checked={checked}
          disabled={disabled}
          {...rest}
          className={classes.checkbox}
        />
      }
      label={<span className={labelClassName}>{label}</span>}
    />
  );
};
