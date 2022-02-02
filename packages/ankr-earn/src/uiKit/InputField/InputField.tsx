import { TextField, TextFieldProps } from '@material-ui/core';
import { getErrorText, hasError } from 'modules/common/utils/form';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';

interface IFieldProps extends FieldRenderProps<string> {}

export const InputField = ({
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
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      {...rest}
    />
  );
};
