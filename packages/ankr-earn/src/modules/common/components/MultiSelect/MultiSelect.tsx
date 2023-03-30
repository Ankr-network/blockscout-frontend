import { Box, Select as SelectComponent, SelectProps } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import _difference from 'lodash/difference';
import { ChangeEvent, ReactNode, useCallback, useMemo } from 'react';
import { Field } from 'react-final-form';
import { uid } from 'react-uid';

import { ReactComponent as IconArrow } from './assets/icon-arrow.svg';
import { ReactComponent as IconChecked } from './assets/icon-checked.svg';
import { useStyles } from './MultiSelectStyles';
import { getIntersecion } from './utils/getIntersection';

const MAX_SELECT_OPTIONS = 5;

export interface ISelectOption {
  label: string;
  value: string;
  isDefault?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  separate?: boolean;
}

export interface IMultiSelectProps
  extends Omit<SelectProps, 'variant' | 'onChange' | 'helperText' | 'label'> {
  options: ISelectOption[];
  helperText?: ReactNode;
  label?: ReactNode;
  iconClassName?: string;
  renderOption?: (options: ISelectOption) => ReactNode;
  innerLabel?: ReactNode;
  name: string;
  value: string[];
  onChange: (values: string[]) => void;
}

export const MultiSelect = ({
  MenuProps: { classes: menuClasses = {} } = {},
  options,
  iconClassName,
  renderOption,
  innerLabel,
  value,
  onChange,
  ...restProps
}: IMultiSelectProps): JSX.Element => {
  const classes = useStyles();

  const withIcons = useMemo(() => {
    return options.some(option => option.icon);
  }, [options]);

  const items = useMemo(() => {
    return options.map(option => {
      const isSelected = value.some(v => option.value === v);

      return (
        <MenuItem
          key={uid(option)}
          className={classes.option}
          disabled={option.disabled}
          value={option.value}
        >
          <Box alignItems="center" display="flex">
            {option.icon && (
              <Box alignItems="center" display="flex" mr="10px">
                {option.icon}
              </Box>
            )}

            <Box>{option.label}</Box>
          </Box>

          <Box sx={{ visibility: isSelected ? 'visible' : 'hidden' }}>
            <IconChecked />
          </Box>
        </MenuItem>
      );
    });
  }, [classes.option, options, value]);

  const renderValue = useCallback(
    (values: unknown) => {
      const opts = getIntersecion<ISelectOption>(options, values as string[]);
      const separate = opts.find(opt => opt.separate);
      const shouldRenderInnerLabel =
        !withIcons || (innerLabel && opts.length < MAX_SELECT_OPTIONS);

      return (
        <Box alignItems="center" display="flex" flexWrap="nowrap">
          {separate ? (
            separate.label
          ) : (
            <>
              {withIcons &&
                opts.map(opt => (
                  <span key={uid(opt)} className={classes.icon}>
                    {opt.icon}
                  </span>
                ))}

              {shouldRenderInnerLabel && (
                <Box ml={withIcons ? 1.2 : 0}>
                  {opts.length === 1
                    ? opts[0]?.label
                    : `${opts.length} ${innerLabel}`}
                </Box>
              )}
            </>
          )}
        </Box>
      );
    },
    [classes.icon, innerLabel, options, withIcons],
  );

  const selectProps = useMemo(
    (): SelectProps => ({
      variant: 'outlined',
      MenuProps: {
        classes: {
          paper: classNames(menuClasses.paper, classes.menuPaper),
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
      IconComponent: props => <IconArrow {...props} />,
    }),
    [classes, menuClasses],
  );

  const handleChange = (
    event: ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const {
      target: { value: newValue },
    } = event;
    let nextOptions = newValue as string[];
    const selectedOption = _difference(nextOptions, value)?.[0] as
      | string
      | undefined;
    const separate = options.find(option => option.separate);

    if (separate) {
      if (selectedOption === separate?.value || nextOptions.length === 0) {
        nextOptions = [separate.value];
      } else if (
        nextOptions.length > 1 &&
        nextOptions.includes(separate.value)
      ) {
        nextOptions = nextOptions.filter(option => option !== separate.value);
      }
    }

    onChange(nextOptions);
  };

  return (
    <div className={classes.root}>
      <SelectComponent
        multiple
        renderValue={renderValue}
        value={value}
        {...selectProps}
        {...restProps}
        classes={{ outlined: classes.selectOverride }}
        onChange={handleChange}
      >
        {items}
      </SelectComponent>
    </div>
  );
};

export const MultiSelectField = ({
  name,
  ...rest
}: IMultiSelectProps): JSX.Element => (
  <Field
    name={name}
    render={({ input: { onChange, value } }) => (
      <MultiSelect {...rest} name={name} value={value} onChange={onChange} />
    )}
  />
);
