import { useCallback } from 'react';
import {
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Typography,
} from '@mui/material';
import { Select } from '@ankr.com/ui';

import { SELECT_WIDTH, useProjectSelectStyles } from './ProjectSelectStyles';

export interface SelectOption {
  value: string;
  title: string;
  isDisabled?: boolean;
}

interface ProjectSelectProps {
  options: SelectOption[];
  handleSetOption: (value: string) => void;
  selectedOption: string;
}

export const ProjectSelect = ({
  options,
  handleSetOption,
  selectedOption,
}: ProjectSelectProps) => {
  const { classes } = useProjectSelectStyles();

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>): void => {
      const { value } = event.target;

      handleSetOption(value as string);
    },
    [handleSetOption],
  );

  const renderValue = useCallback(
    (value: unknown) => (
      <Typography
        variant="subtitle2"
        color="textSecondary"
        className={classes.value}
        noWrap
      >
        {options?.find(item => item.value === value)?.title ?? value}
      </Typography>
    ),
    [classes.value, options],
  );

  return (
    <FormControl sx={{ width: SELECT_WIDTH }}>
      <Select
        inputProps={{
          className: classes.inputRoot,
        }}
        value={selectedOption}
        onChange={handleChange}
        renderValue={renderValue}
        classes={{
          select: classes.select,
        }}
      >
        {options.map(({ value, title, isDisabled }) => (
          <MenuItem key={value} value={value} disabled={isDisabled}>
            <Typography variant="body2" className={classes.menuItem} noWrap>
              {title}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
