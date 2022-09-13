import { getErrorText } from 'modules/form/utils/getErrorText';
import { hasError } from 'modules/form/utils/hasError';
import { FieldRenderProps } from 'react-final-form';
import { MethodsSelect, MethodsSelectProps } from '.';

type MethodsSelectFieldProps<T> = Omit<
  MethodsSelectProps<T>,
  'name' | 'value' | 'onChange' | 'error' | 'helperText'
> &
  FieldRenderProps<T>;

export function MethodsSelectField<T>({
  input: { name, value, onChange },
  meta,
  ...otherProps
}: MethodsSelectFieldProps<T>) {
  return (
    <MethodsSelect
      {...otherProps}
      name={name}
      value={value}
      onChange={onChange}
      error={hasError(meta)}
      helperText={getErrorText(meta)}
    />
  );
}
