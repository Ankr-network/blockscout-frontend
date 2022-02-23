import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as SelectComponent,
  SelectProps,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import { uid } from 'react-uid';

import { useTooltipStyles } from 'uiKit/Tooltip/useTooltipStyles';

import { ReactComponent as AngleDownIcon } from '../../assets/img/angle-down-icon.svg';

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
  variant?: 'filled' | 'outlined';
}

export const Select = ({
  children,
  options,
  helperText,
  label,
  fullWidth = true,
  classes,
  variant = 'outlined',
  className,
  disabled,
  ...restProps
}: ISelectProps): JSX.Element => {
  const styles = useSelectStyles();
  const tooltiClasses = useTooltipStyles({});

  const items = useMemo(() => {
    return options?.map(option => (
      <MenuItem
        key={uid(option)}
        classes={{
          root: styles.item,
          selected: styles.itemSelected,
        }}
        disabled={option.disabled}
        value={option.value}
      >
        {option.label}
      </MenuItem>
    ));
  }, [options, styles]);

  const selectProps = useMemo(
    (): SelectProps => ({
      variant: 'outlined',
      autoWidth: true,
      classes: {
        select: styles.select,
        ...classes,
      },
      MenuProps: {
        classes: {
          paper: classNames(styles.menuPaper, tooltiClasses.lightTooltip),
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
      IconComponent: props => <AngleDownIcon fontSize="default" {...props} />,
    }),
    [classes, styles.menuPaper, styles.select, tooltiClasses.lightTooltip],
  );

  return (
    <FormControl className={styles.root} fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}

      <SelectComponent
        {...selectProps}
        {...restProps}
        className={classNames(styles.selectRoot, className, {
          [styles.selectRootOutlined]: variant === 'outlined',
          [styles.selectRootFilled]: variant === 'filled',
          [styles.selectDisabled]: disabled,
        })}
        disabled={disabled}
      >
        {children || items}
      </SelectComponent>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
