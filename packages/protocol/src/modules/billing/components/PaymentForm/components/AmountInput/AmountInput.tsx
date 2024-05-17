import { InputProps, TextField } from '@mui/material';

import { ECurrency } from 'modules/billing/types';
import { isStableCoinCurrency } from 'modules/billing/utils/isStableCoinCurrency';

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

  return (
    <TextField
      InputProps={{
        startAdornment: isStableCoinCurrency(currency) && (
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
