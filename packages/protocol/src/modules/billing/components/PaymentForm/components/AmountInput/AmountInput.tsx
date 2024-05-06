import { InputProps, TextField } from '@mui/material';

import { ECurrency } from 'modules/billing/types';

import { RequestsLabel } from './components/RequestsLabel';
import { useAmountInputStyles } from './useAmountInputStyles';
import { CurrencySelect } from './components/CurrencySelect';
import { STABLECOINS_OPTIONS } from './const';

export interface IAmountInputProps {
  error?: string;
  isFocused: boolean;
  onBlur: InputProps['onBlur'];
  onChange: InputProps['onChange'];
  onFocus: InputProps['onFocus'];
  rawValue: string;
  requests: number;
  value: string;
  currency: ECurrency;
  handleChangeCurrency: (currency: ECurrency) => void;
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
  currency,
  handleChangeCurrency,
}: IAmountInputProps) => {
  const { classes } = useAmountInputStyles();

  const shouldShowCurrencySelect =
    currency === ECurrency.USDC || currency === ECurrency.USDT;

  return (
    <TextField
      InputProps={{
        startAdornment: shouldShowCurrencySelect && (
          <CurrencySelect
            activeCurrency={currency}
            options={STABLECOINS_OPTIONS}
            changeCurrency={handleChangeCurrency}
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
