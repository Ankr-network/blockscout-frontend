import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as SelectComponent,
  SelectProps,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import React, { ReactNode, useMemo } from 'react';
import { uid } from 'react-uid';
import { AngleDownIcon } from '../Icons/AngleDownIcon';
import { useStyles } from './useSelectStyles';

export interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface ISelectProps extends Omit<SelectProps, 'variant'> {
  options?: ISelectOption[];
  children?: ReactNode;
  helperText?: ReactNode;
  label?: ReactNode;
}

export const Select = ({
  children,
  options,
  helperText,
  label,
  fullWidth = true,
  ...restProps
}: ISelectProps) => {
  const classes = useStyles();

  const items = useMemo(() => {
    return options?.map(option => (
      <MenuItem
        key={uid(option)}
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </MenuItem>
    ));
  }, [options]);

  const selectProps = useMemo(
    (): SelectProps => ({
      variant: 'outlined',
      autoWidth: true,
      classes: {
        select: classes.select,
      },
      MenuProps: {
        classes: {
          paper: classes.menuPaper,
        },
        elevation: 0,
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      },
      IconComponent: props => <AngleDownIcon fontSize="medium" {...props} />,
    }),
    [classes],
  );

  return (
    <FormControl fullWidth={fullWidth} className={classes.root}>
      {label && <InputLabel>{label}</InputLabel>}

      <SelectComponent {...selectProps} {...restProps}>
        {children || items}
      </SelectComponent>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
