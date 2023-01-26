import React, { ReactNode, useMemo } from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as SelectComponent,
  SelectProps,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { uid } from 'react-uid';

import { ArrowDown } from '@ankr.com/ui';
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
  rootClassName?: string;
}

export const Select = ({
  MenuProps: { classes: menuClasses = {} } = {},
  children,
  options,
  helperText,
  label,
  fullWidth = true,
  iconClassName,
  rootClassName,
  ...restProps
}: ISelectProps) => {
  const { classes, cx } = useStyles();

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
          paper: cx(menuClasses.paper, classes.menuPaper),
        },
        elevation: 0,
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
        <ArrowDown
          fontSize="small"
          {...props}
          classes={iconClassName ? { root: iconClassName } : null}
        />
      ),
    }),
    [cx, classes, menuClasses, iconClassName],
  );

  return (
    <FormControl
      fullWidth={fullWidth}
      className={cx(rootClassName, classes.root)}
    >
      {label && <InputLabel>{label}</InputLabel>}

      <SelectComponent {...selectProps} {...restProps}>
        {children || items}
      </SelectComponent>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
