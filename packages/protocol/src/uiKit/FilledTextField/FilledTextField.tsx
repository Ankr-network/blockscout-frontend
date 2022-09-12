import { TextField, TextFieldProps } from '@material-ui/core';
import classNames from 'classnames';
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
    const classes = useFilledTextfieldStyles({ noPlaceholderFade });

    return (
      <TextField
        {...otherProps}
        ref={ref as any}
        InputProps={{
          ...InputProps,
          className: classNames(InputProps?.className, classes.textFieldInput),
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          ...inputProps,
          className: classNames(
            inputProps?.className,
            classes.textFieldInputBase,
          ),
        }}
      />
    );
  },
);
