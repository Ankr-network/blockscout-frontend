import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

import {
  useFilledTextfieldStyles,
  UseFilledTextFieldStylesParams,
} from './FilledTextFieldStyles';

type FilledTextFieldProps = TextFieldProps & UseFilledTextFieldStylesParams;

export const FilledTextField = forwardRef(
  (
    {
      noPlaceholderFade,

      InputProps,
      inputProps,
      ...otherProps
    }: FilledTextFieldProps,
    ref,
  ) => {
    const { classes, cx } = useFilledTextfieldStyles({ noPlaceholderFade });

    return (
      <TextField
        {...otherProps}
        ref={ref as any}
        InputProps={{
          ...InputProps,
          className: cx(InputProps?.className, classes.textFieldInput),
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          ...inputProps,
          className: cx(inputProps?.className, classes.textFieldInputBase),
        }}
      />
    );
  },
);

FilledTextField.displayName = 'FilledTextField';
