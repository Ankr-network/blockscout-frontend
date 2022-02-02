import { MenuItem, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode, useCallback } from 'react';
import { uid } from 'react-uid';
import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';
import { ISelectProps, Select } from 'uiKit/Select';
import { useTokenSelectStyles } from './useTokenSelectStyles';

export interface ITokenSelectOption {
  value: string;
  text: string;
  disabled?: boolean;
  iconSlot: ReactNode;
}

export interface ITokenSelectProps extends Omit<ISelectProps, 'options'> {
  options: ITokenSelectOption[];
}

export const TokenSelect = ({
  options,
  value,
  className,
  ...restProps
}: ITokenSelectProps) => {
  const classes = useTokenSelectStyles();

  const renderValue = useCallback(
    (value: any) => {
      const currentOption = options.find(o => o.value === value);
      return (
        <span className={classes.selectBtn}>
          <i className={classes.tokenIcon}>{currentOption?.iconSlot}</i>

          <Typography variant="body2" component="span">
            {currentOption?.text}
          </Typography>
        </span>
      );
    },
    [classes, options],
  );

  return (
    <Select
      {...restProps}
      renderValue={renderValue}
      value={value}
      className={classNames(classes.select, className)}
      classes={{
        root: classes.selectRoot,
      }}
    >
      {options?.map(({ value: itemValue, text: label, disabled, iconSlot }) => {
        const selected = itemValue === value;
        return (
          <MenuItem
            key={uid(itemValue)}
            classes={{
              root: classes.menuItem,
              selected: classes.menuItemSelected,
            }}
            value={itemValue}
            disabled={disabled}
          >
            <i className={classes.listItemIcon}>{iconSlot}</i>
            <span>{label}</span>
            {selected && (
              <CompleteIcon size="xs" className={classes.checkedIcon} />
            )}
          </MenuItem>
        );
      })}
    </Select>
  );
};
