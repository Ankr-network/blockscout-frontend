import BigNumber from 'bignumber.js';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import { TextField } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Label } from './components/Label';
import { MaxButton } from './components/MaxButton';
import { amountInputTranslation } from './translation';
import { useAmountInputStyles } from './useAmountInputStyles';

export interface IAmountInputProps {
  amount?: number;
  bonuses: number;
  error?: string;
  isFocused: boolean;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onMaxButtonClick: () => void;
  value?: string;
}

export const AmountInput = ({
  amount,
  bonuses,
  error,
  isFocused,
  onBlur,
  onChange,
  onFocus,
  onMaxButtonClick,
  value,
}: IAmountInputProps) => {
  const { keys, t } = useTranslation(amountInputTranslation);
  const { classes } = useAmountInputStyles();

  const formattedAmount = amount ? new BigNumber(amount).toFormat() : undefined;
  const hasError = Boolean(error);

  return (
    <TextField
      InputLabelProps={{ className: classes.label }}
      InputProps={{
        className: classes.inputRoot,
        endAdornment: <MaxButton onClick={onMaxButtonClick} />,
      }}
      autoFocus
      classes={classes}
      error={hasError}
      focused={isFocused}
      helperText={error}
      label={<Label bonuses={bonuses} />}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={t(keys.placeholder)}
      value={
        isFocused || hasError || !formattedAmount
          ? value
          : t(keys.value, { amount: formattedAmount })
      }
    />
  );
};
