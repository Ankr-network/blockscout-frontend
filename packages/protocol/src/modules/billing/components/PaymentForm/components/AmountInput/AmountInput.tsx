import { InputProps, TextField } from '@mui/material';

import { RequestsLabel } from './components/RequestsLabel';
import { useAmountInputStyles } from './useAmountInputStyles';

export interface IAmountInputProps {
  error?: string;
  isFocused: boolean;
  onBlur: InputProps['onBlur'];
  onChange: InputProps['onChange'];
  onFocus: InputProps['onFocus'];
  rawValue: string;
  requests: number;
  value: string;
}

export const AmountInput = ({
  error,
  isFocused,
  onBlur,
  onChange,
  onFocus,
  rawValue,
  requests,
  value,
}: IAmountInputProps) => {
  const { classes } = useAmountInputStyles();

  return (
    <TextField
      InputProps={{
        endAdornment: <RequestsLabel requests={requests} />,
      }}
      className={classes.amountInputRoot}
      error={Boolean(error)}
      focused={isFocused}
      helperText={error}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      value={error ? rawValue : value}
    />
  );
};
