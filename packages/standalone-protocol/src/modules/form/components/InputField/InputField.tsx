import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldMetaState, FieldRenderProps } from 'react-final-form';

import { t } from 'modules/i18n/utils/intl';

import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';
import { useInputFieldStyles } from './InputFieldStyles';

interface IFieldProps extends FieldRenderProps<string> {
  showLimitCounter: boolean;
}

interface GetHelperStringParams {
  value: string;
  meta: FieldMetaState<any>;
  maxLength: number | null;
  showLimitCounter: boolean;
}

const getHelperString = ({
  value,
  meta,
  maxLength,
  showLimitCounter,
}: GetHelperStringParams): string => {
  let helperTextString: string = getErrorText(meta);

  if (showLimitCounter && maxLength && !hasError(meta)) {
    helperTextString = t('form.limit-counter', {
      value: value.length ?? 0,
      maxLimit: maxLength,
    });
  }

  return helperTextString;
};

export const InputField = ({
  input: { name, onChange, value, type, placeholder },
  meta,
  showLimitCounter = false,
  ...rest
}: IFieldProps & TextFieldProps) => {
  const classes = useInputFieldStyles();

  const maxLength: number | null = rest.inputProps?.maxLength ?? null;

  return (
    <TextField
      type={type}
      name={name}
      error={hasError(meta)}
      value={value}
      placeholder={placeholder}
      helperText={getHelperString({ value, meta, maxLength, showLimitCounter })}
      onChange={onChange}
      className={classes.root}
      onWheel={(event: any) => event.target.blur()}
      {...rest}
    />
  );
};
