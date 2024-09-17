import { TextField } from '@mui/material';
import { useMemo } from 'react';

import { hasError as hasErrorDefault } from '../../utils/hasError';
import { useInputFieldStyles } from './InputFieldStyles';
import { InputFieldProps } from './InputFieldTypes';
import { getHelperText } from './InputFieldUtils';

export const InputField = ({
  InputProps = {},
  autofocus,
  hasError = hasErrorDefault,
  input: { name, onBlur, onChange, placeholder, type, value },
  isHelperTextVisible,
  isLimitCounterVisible = false,
  isRequired,
  meta,
  multiline,
  ...rest
}: InputFieldProps) => {
  const { classes, cx } = useInputFieldStyles();

  const maxLength: number | null = rest.inputProps?.maxLength || null;

  const inputClasses = InputProps.classes || {};

  const helperText = useMemo(() => {
    const text = getHelperText({
      value,
      meta,
      maxLength,
      showLimitCounter: isLimitCounterVisible,
      hasError,
    });

    return text || (isHelperTextVisible && <>&nbsp;</>);
  }, [
    value,
    meta,
    maxLength,
    isLimitCounterVisible,
    hasError,
    isHelperTextVisible,
  ]);

  return (
    <TextField
      autoFocus={autofocus}
      required={isRequired}
      multiline={multiline}
      maxRows={4}
      type={type}
      name={name}
      error={hasError(meta)}
      value={value}
      placeholder={placeholder}
      helperText={helperText}
      onChange={onChange}
      onBlur={onBlur}
      className={cx(classes.root, rest.className)}
      onWheel={(event: any) => event.target.blur()}
      InputProps={{
        ...InputProps,
        classes: {
          ...inputClasses,
          input: cx(classes.input, InputProps.classes?.input),
        },
      }}
      {...rest}
    />
  );
};
