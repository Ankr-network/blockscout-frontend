import React, { ReactNode, useMemo } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as SelectComponent,
  SelectProps,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { uid } from 'react-uid';

import { AngleDownIcon } from '../Icons/AngleDownIcon';
import { useStyles } from './SelectStyles';

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
  iconClassName?: string;
}

export const Select = ({
  children,
  options,
  helperText,
  label,
  fullWidth = true,
  iconClassName,
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
      MenuProps: {
        classes: {
          paper: classes.menuPaper,
        },
        elevation: 0,
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      },
      IconComponent: props => (
        <AngleDownIcon
          fontSize="small"
          {...props}
          classes={iconClassName ? { root: iconClassName } : null}
        />
      ),
    }),
    [classes, iconClassName],
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
