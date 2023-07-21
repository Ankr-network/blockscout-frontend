import { FormHelperText, FormHelperTextProps } from '@mui/material';

import { useStyles } from './FieldErrorStyles';

export const FieldError = ({ className, ...props }: FormHelperTextProps) => {
  const { classes, cx } = useStyles();

  return <FormHelperText className={cx(classes.error, className)} {...props} />;
};
