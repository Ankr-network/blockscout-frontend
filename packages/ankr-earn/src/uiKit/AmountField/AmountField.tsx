import { TextField, TextFieldProps } from '@material-ui/core';
import { getErrorText, hasError } from 'modules/common/utils/form';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';

interface IFieldProps extends FieldRenderProps<string> {}

export const AmountField = ({
  input: { name, value, onChange, onBlur, onFocus },
  meta,
  ...rest
}: IFieldProps & TextFieldProps) => {
  return (
    <TextField
      name={name}
      error={hasError(meta)}
      value={value}
      helperText={getErrorText(meta)}
      onChange={event => {
        const value = event.target.value;
        const validated = value.match(/^(\d*\.{0,1}\d{0,18}$)/);
        if (validated) {
          onChange(value);
        }
      }}
      onBlur={onBlur}
      onFocus={onFocus}
      {...rest}
    />
  );
};
