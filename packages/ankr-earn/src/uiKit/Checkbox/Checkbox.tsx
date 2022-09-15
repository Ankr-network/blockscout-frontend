import {
  Checkbox as CheckboxComponent,
  CheckboxProps,
  FormControlLabel,
} from '@material-ui/core';
import classNames from 'classnames';

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

export const Checkbox = ({
  label,
  disabled,
  className,
  ...rest
}: ICheckboxProps): JSX.Element => {
  const classes = useStyles();

  return (
    <FormControlLabel
      classes={{
        label: classNames(classes.label, {
          [classes.labelDisabled]: disabled,
        }),
      }}
      className={className}
      control={
        <CheckboxComponent
          {...rest}
          className={classes.checkbox}
          disabled={disabled}
        />
      }
      disabled={disabled}
      label={label}
    />
  );
};
