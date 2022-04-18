import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form';

import { getErrorText, hasError } from 'modules/common/utils/form';

interface IFieldProps extends FieldRenderProps<string> {
  isIntegerOnly?: boolean;
  autoComplete?: string;
  maxDecimalsLen?: number;
}

export const AmountField = ({
  input: { name, value, onChange, onBlur, onFocus },
  isIntegerOnly = false,
  maxDecimalsLen = 18,
  meta,
  autoComplete = 'off',
  ...rest
}: IFieldProps & TextFieldProps): JSX.Element => {
  const regExp = isIntegerOnly
    ? /^(\d*$)/
    : new RegExp(`^(\\d*\\.{0,1}\\d{0,${maxDecimalsLen}}$)`);

  return (
    <TextField
      autoComplete={autoComplete}
      error={hasError(meta)}
      helperText={getErrorText(meta)}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={event => {
        const { value: inputValue } = event.target;
        const validated = inputValue.match(regExp);
        if (validated) {
          onChange(inputValue);
        }
      }}
      onFocus={onFocus}
      {...rest}
    />
  );
};
