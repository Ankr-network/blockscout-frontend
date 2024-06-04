import { InputProps, TextField } from '@mui/material';

import { ECurrency } from 'modules/payments/types';
import { isStablecoin } from 'modules/payments/utils/isStablecoin';

import { CurrencySelect } from './components/CurrencySelect';
import { RequestsLabel } from './components/RequestsLabel';
import { STABLECOINS_OPTIONS } from './const';
import { useAmountInputStyles } from './useAmountInputStyles';

export interface IAmountInputProps {
  currency: ECurrency;
  error?: string;
  handleCurrencyChange: (currency: ECurrency) => void;
  isFocused: boolean;
  onBlur: InputProps['onBlur'];
  onChange: InputProps['onChange'];
  onFocus: InputProps['onFocus'];
  rawValue: string;
  requests: number;
  value: string;
}

export const AmountInput = ({
  currency,
  error,
  handleCurrencyChange,
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
        startAdornment: isStablecoin(currency) && (
          <CurrencySelect
            activeCurrency={currency}
            options={STABLECOINS_OPTIONS}
            changeCurrency={handleCurrencyChange}
          />
        ),
        endAdornment: <RequestsLabel requests={requests} />,
      }}
      className={classes.amountInputRoot}
      error={Boolean(error)}
      focused={isFocused}
      helperText={error}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      value={error || isFocused ? rawValue : value}
    />
  );
};
