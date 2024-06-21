import { ReactNode, useMemo } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as SelectComponent,
  SelectProps,
  Typography,
} from '@mui/material';
import { uid } from 'react-uid';
import { ArrowDown } from '@ankr.com/ui';

import { useSelectStyles } from './useSelectStyles';

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

// TODO: the component should be removed and substituted by the Select component
// from @ankr.com/ui library
// https://ankrnetwork.atlassian.net/browse/MRPC-4414
export const Select = ({
  MenuProps: { classes: menuClasses = {} } = {},
  children,
  fullWidth = true,
  helperText,
  iconClassName,
  label,
  options,
  rootClassName,
  ...restProps
}: ISelectProps) => {
  const { classes, cx } = useSelectStyles();

  const items = useMemo(() => {
    return options?.map(option => (
      <MenuItem
        disabled={option.disabled}
        key={uid(option)}
        value={option.value}
      >
        <Typography variant="body2">{option.label}</Typography>
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
