import {
  Box,
  ButtonBase,
  FormHelperText,
  IconButton,
  InputLabel,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Autocomplete,
  AutocompleteCloseReason,
  AutocompleteProps,
} from '@material-ui/lab';
import { ChangeEvent, ReactNode, useCallback, useState } from 'react';
import { FilledTextField } from 'uiKit/FilledTextField';

import { ReactComponent as ArrowDownIcon } from 'uiKit/Icons/arrowDown.svg';
import { ReactComponent as PlainCheckIcon } from 'uiKit/Icons/plainCheck.svg';
import { iconId, useMethodsSelectStyles } from './MethodsSelectStyles';

type ConfiguredAutocomplete<T> = Omit<
  AutocompleteProps<T, false, false, false>,
  | 'renderInput'
  | 'value'
  | 'onChange'
  | 'options'
  | 'noOptionsText'
  | 'placeholder'
  | 'getOptionLabel'
  | 'getOptionSelected'
>;

export type MethodsSelectProps<T> = ConfiguredAutocomplete<T> & {
  label?: React.ReactNode;
  name?: string;
  helperText?: ReactNode;
  error?: boolean;

  value: T | undefined;
  onChange: (option: T | undefined) => void;
  options: T[];
  className?: string;
  noOptionsText?: string;
  placeholder?: string;
  getOptionLabel: (option: T) => string;
  getOptionSelected: (option: T, selectedOption: T | null) => boolean;

  showExtra?: (option?: T) => ReactNode;
};

export function MethodsSelect<T>({
  label,
  name,
  helperText,
  error,

  value,
  onChange,
  options,
  noOptionsText,
  placeholder,
  getOptionLabel,
  getOptionSelected,

  showExtra,

  className,
  ...otherProps
}: MethodsSelectProps<T>) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(
    (event: ChangeEvent<any>, reason: AutocompleteCloseReason) => {
      if (reason === 'toggleInput') return;

      setOpen(false);
    },
    [],
  );

  const handleIconClick = useCallback(() => setOpen(prev => !prev), []);

  const classes = useMethodsSelectStyles({ error, open });

  const renderOption = useCallback(
    (method: T, { selected }: { selected: boolean }) => (
      <Tooltip
        title={getOptionLabel(method)}
        placement="top"
        classes={{
          tooltip: classes.optionTooltip,
        }}
      >
        <ButtonBase>
          <Typography variant="inherit" noWrap>
            {getOptionLabel(method)}
          </Typography>

          {selected && <PlainCheckIcon className={classes.icon} />}
        </ButtonBase>
      </Tooltip>
    ),
    [classes.icon, classes.optionTooltip, getOptionLabel],
  );

  const renderInput = useCallback(
    params => (
      <FilledTextField
        fullWidth
        placeholder={placeholder}
        name={name}
        ref={params.InputProps.ref}
        InputProps={{
          endAdornment: (
            <IconButton
              className={classes.iconButton}
              onClick={handleIconClick}
            >
              <ArrowDownIcon id={iconId} />
            </IconButton>
          ),
          className: classes.textFieldInput,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          ...params.inputProps,
        }}
      />
    ),
    [
      placeholder,
      name,
      classes.iconButton,
      classes.textFieldInput,
      handleIconClick,
    ],
  );

  return (
    <Box className={className}>
      {label && <InputLabel className={classes.label}>{label}</InputLabel>}

      <Autocomplete
        fullWidth
        {...otherProps}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        value={value || null}
        onChange={(event, newValue) => {
          onChange(newValue || undefined);
        }}
        options={options}
        noOptionsText={noOptionsText}
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
        classes={{
          paper: classes.paper,
          listbox: classes.listbox,
          option: classes.listboxOption,
          popper: classes.popper,
        }}
        renderOption={renderOption}
        renderInput={renderInput}
      />

      {helperText && (
        <FormHelperText className={classes.helperText}>
          {helperText}
        </FormHelperText>
      )}

      {showExtra && <div className={classes.extra}>{showExtra(value)}</div>}
    </Box>
  );
}
