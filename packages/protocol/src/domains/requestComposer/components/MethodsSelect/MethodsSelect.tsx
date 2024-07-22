import { ReactNode, SyntheticEvent, useCallback, useState } from 'react';
import {
  Box,
  ButtonBase,
  FormHelperText,
  IconButton,
  InputLabel,
  Tooltip,
  Typography,
  Autocomplete,
  AutocompleteCloseReason,
  AutocompleteProps,
} from '@mui/material';
import { ArrowDown, Check } from '@ankr.com/ui';

import { FilledTextField } from 'uiKit/FilledTextField';

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

  showExtra?: (option?: T) => ReactNode;
};

export function MethodsSelect<T>({
  className,
  error,
  getOptionLabel,
  helperText,

  label,
  name,
  noOptionsText,
  onChange,
  options,
  placeholder,

  showExtra,

  value,
  ...otherProps
}: MethodsSelectProps<T>) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(
    (
      event: SyntheticEvent<Element, Event>,
      reason: AutocompleteCloseReason,
    ) => {
      if (reason === 'toggleInput') return;

      setOpen(false);
    },
    [],
  );

  const handleIconClick = useCallback(() => setOpen(prev => !prev), []);

  const { classes } = useMethodsSelectStyles({ error, open });

  const renderOption = useCallback(
    (props, method: T, { selected }: { selected: boolean }) => (
      <li {...props}>
        <Tooltip
          title={getOptionLabel(method)}
          placement="top"
          classes={{
            tooltip: classes.optionTooltip,
          }}
        >
          <ButtonBase className={classes.button}>
            <Typography variant="inherit" noWrap>
              {getOptionLabel(method)}
            </Typography>

            {selected && <Check />}
          </ButtonBase>
        </Tooltip>
      </li>
    ),
    [classes.button, classes.optionTooltip, getOptionLabel],
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
              <ArrowDown id={iconId} />
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
      {label && (
        <InputLabel className={classes.label} component="h2">
          {label}
        </InputLabel>
      )}

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
