import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form';

import { getErrorText, hasError } from 'modules/common/utils/form';

interface IFieldProps extends FieldRenderProps<string> {}

export const AmountField = ({
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
      onChange={event => {
        const { value: inputValue } = event.target;
        const validated = inputValue.match(/^(\d*\.{0,1}\d{0,18}$)/);
        if (validated) {
          onChange(inputValue);
        }
      }}
      onFocus={onFocus}
      {...rest}
    />
  );
};
