import { useCallback } from 'react';
import {
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Typography,
  MenuProps,
} from '@mui/material';
import { Select } from '@ankr.com/ui';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

import { useProjectSelectStyles } from './ProjectSelectStyles';

export interface SelectOption {
  value: string;
  title: string;
  isDisabled?: boolean;
}

export interface SelectMenuProps {
  menuProps?: Partial<MenuProps>;
  selectProps?: Partial<SelectInputProps>;
  classNameMenuItem?: string;
}

export interface ProjectSelectProps extends SelectMenuProps {
  options: SelectOption[];
  handleSetOption: (value: string) => void;
  selectedOption: string;
  onSelectToken?: (value: string) => void;
}

export const ProjectSelect = ({
  classNameMenuItem,
  handleSetOption,
  menuProps,
  onSelectToken,
  options,
  selectProps,
  selectedOption,
}: ProjectSelectProps) => {
  const { classes } = useProjectSelectStyles();

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>): void => {
      const { value } = event.target;

      handleSetOption(value as string);

      if (onSelectToken) {
        onSelectToken(value as string);
      }
    },
    [handleSetOption, onSelectToken],
  );

  const renderValue = useCallback(
    (value: unknown) => (
      <Typography
        variant="subtitle2"
        color="textSecondary"
        className={classes.value}
        noWrap
      >
        {options?.find(item => item.value === value)?.title || value}
      </Typography>
    ),
    [classes.value, options],
  );

  return (
    <FormControl className={classes.formWrapper}>
      <Select
        inputProps={{
          className: classes.inputRoot,
        }}
        MenuProps={menuProps}
        value={selectedOption}
        onChange={handleChange}
        renderValue={renderValue}
        classes={{
          select: classes.select,
        }}
        size="medium"
        {...selectProps}
      >
        {options.map(({ isDisabled, title, value }) => (
          <MenuItem
            key={value}
            className={classNameMenuItem}
            value={value}
            disabled={isDisabled}
          >
            <Typography variant="body2" className={classes.menuItem} noWrap>
              {title}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
