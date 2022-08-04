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
}: ITokenSelectProps): JSX.Element => {
  const classes = useTokenSelectStyles();

  const renderValue = useCallback(
    option => {
      const currentOption = options.find(o => o.value === option);
      return (
        <span className={classes.selectBtn}>
          <i className={classes.tokenIcon}>{currentOption?.iconSlot}</i>

          <Typography component="span" variant="body2">
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
      classes={{
        root: classes.selectRoot,
      }}
      className={classNames(classes.select, className)}
      renderValue={renderValue}
      value={value}
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
            disabled={disabled}
            value={itemValue}
          >
            <i className={classes.listItemIcon}>{iconSlot}</i>

            <span>{label}</span>

            {selected && (
              <CompleteIcon className={classes.checkedIcon} size="xs" />
            )}
          </MenuItem>
        );
      })}
    </Select>
  );
};
