import MenuItem from '@mui/material/MenuItem';
import { OutlinedTextFieldProps } from '@mui/material/TextField';
import { ISelectOption, Select } from 'uiKit/Select';
import { useMemo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { uid } from 'react-uid';
import { getErrorText } from '../../utils/getErrorText';
import { hasError } from '../../utils/hasError';

interface ISelectComponent
  extends OutlinedTextFieldProps,
    FieldRenderProps<any> {
  options: ISelectOption[];
  rootClassName?: string;
}

export const SelectField = ({
  input: { name, onChange, value },
  meta,
  options,
  rootClassName,
  ...rest
}: ISelectComponent) => {
  const items = useMemo(() => {
    return options.map(option => (
      <MenuItem key={uid(option)} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  }, [options]);

  return (
    <Select
      name={name}
      error={hasError(meta)}
      value={value}
      helperText={getErrorText(meta)}
      onChange={onChange as any}
      rootClassName={rootClassName}
      {...(rest as any)}
    >
      {items}
    </Select>
  );
};
