import {
  InputLabel,
  MenuItem,
  OutlinedTextFieldProps,
  Select,
} from '@mui/material';
import { uid } from 'react-uid';
import { t } from '@ankr.com/common';
import { FieldRenderProps } from 'react-final-form';

import { IWhiteListSelectOption } from '../AddAndEditWhitelistItemForm/AddToWhitelistFormUtils';
import { useSelectTypeFieldStyles } from './useSelectTypeFieldStyles';

interface SelectTypeFieldProps
  extends OutlinedTextFieldProps,
    FieldRenderProps<string> {
  options: IWhiteListSelectOption[];
  isTypeSelected?: boolean;
}

export const SelectTypeField = ({
  input: { name, onChange, value },
  meta,
  options,
  isTypeSelected,
  ...rest
}: SelectTypeFieldProps) => {
  const { classes } = useSelectTypeFieldStyles();

  return (
    <>
      {!isTypeSelected && (
        <InputLabel className={classes.selectPlaceholder}>
          {t('projects.add-whitelist-dialog.select')}
        </InputLabel>
      )}
      <Select
        name={name}
        value={value}
        onChange={onChange}
        classes={{ select: classes.select }}
        {...(rest as any)}
      >
        {options.map(option => (
          <MenuItem
            key={uid(option)}
            disabled={option.disabled}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
