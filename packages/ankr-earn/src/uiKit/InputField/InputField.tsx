import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { getErrorText, hasError } from 'modules/common/utils/form';

interface IFieldProps extends FieldRenderProps<string> {}

export const InputField = ({
  input: { name, value, onChange, onBlur, onFocus },
  meta,
  ...rest
}: IFieldProps & TextFieldProps): JSX.Element => {
  return (
    <TextField
      error={hasError(meta)}
      helperText={getErrorText(meta)}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      {...rest}
    />
  );
};
