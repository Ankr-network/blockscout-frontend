import { TextField, TextFieldProps } from '@mui/material';
import { t } from '@ankr.com/common';
import { FieldMetaState, FieldRenderProps } from 'react-final-form';

import { getErrorText } from '../../utils/getErrorText';
import { hasError as hasErrorDefault } from '../../utils/hasError';
import { useInputFieldStyles } from './InputFieldStyles';

interface IFieldProps extends FieldRenderProps<string> {
  hasError?: (meta: FieldMetaState<any>) => boolean;
  isHelperTextVisible?: boolean;
  showLimitCounter?: boolean;
}

const getHelperString = (
  value: string,
  meta: FieldMetaState<any>,
  maxLength: number | null,
  showLimitCounter: boolean,
  hasError: (meta: FieldMetaState<any>) => boolean,
): string => {
  let helperTextString: string = getErrorText(meta, hasError);

  if (showLimitCounter && maxLength && !hasError(meta)) {
    helperTextString = t('form.limit-counter', {
      value: value.length ?? 0,
      maxLimit: maxLength,
    });
  }

  return helperTextString;
};

export const InputField = ({
  hasError = hasErrorDefault,
  input: { name, onBlur, onChange, value, type, placeholder },
  isHelperTextVisible,
  meta,
  showLimitCounter = false,
  InputProps = {},
  ...rest
}: IFieldProps & TextFieldProps) => {
  const { classes, cx } = useInputFieldStyles();

  const maxLength: number | null = rest.inputProps?.maxLength ?? null;

  const inputClasses = InputProps.classes ?? {};

  return (
    <TextField
      type={type}
      name={name}
      error={hasError(meta)}
      value={value}
      placeholder={placeholder}
      helperText={
        getHelperString(value, meta, maxLength, showLimitCounter, hasError) ||
        (isHelperTextVisible && <>&nbsp;</>)
      }
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
