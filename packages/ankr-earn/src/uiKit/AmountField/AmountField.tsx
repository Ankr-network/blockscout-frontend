import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form';

import { getErrorText, hasError } from 'modules/common/utils/form';

interface IFieldProps extends FieldRenderProps<string> {
  isIntegerOnly?: boolean;
}

export const AmountField = ({
  input: { name, value, onChange, onBlur, onFocus },
  isIntegerOnly = false,
  meta,
  ...rest
}: IFieldProps & TextFieldProps): JSX.Element => {
  const regExp = isIntegerOnly ? /^(\d*$)/ : /^(\d*\.{0,1}\d{0,18}$)/;

  return (
    <TextField
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
