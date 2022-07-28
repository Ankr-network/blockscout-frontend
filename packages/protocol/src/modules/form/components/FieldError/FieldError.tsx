import { FormHelperText, FormHelperTextProps } from '@material-ui/core';
import classNames from 'classnames';
import { useStyles } from './FieldErrorStyles';

export const FieldError = ({ className, ...props }: FormHelperTextProps) => {
  const classes = useStyles();

  return (
    <FormHelperText
      className={classNames(classes.error, className)}
      {...props}
    />
  );
};
