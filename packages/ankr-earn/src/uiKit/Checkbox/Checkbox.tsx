import {
  Checkbox as CheckboxComponent,
  CheckboxProps,
  FormControlLabel,
} from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

import { useStyles } from './useCheckboxStyles';

export interface ICheckboxProps extends CheckboxProps {
  label?: string;
}

export const CheckboxIcon = (): JSX.Element => {
  const classes = useStyles();

  return <span className={classes.icon} />;
};

export const CheckboxCheckedIcon = (): JSX.Element => {
  const classes = useStyles();

  return <span className={classNames(classes.icon, classes.checkedIcon)} />;
};

export const Checkbox = (props: ICheckboxProps): JSX.Element => {
  const classes = useStyles();
  const { label, checked, disabled, defaultChecked, ...rest } = props;

  const isDisabled = checked ? classes.labelActive : disabled;
  const labelClassName = isDisabled
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
