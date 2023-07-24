import { Box, Typography } from '@mui/material';
import { Field, useForm } from 'react-final-form';
import { FieldValidator } from 'final-form';
import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { InputField } from 'modules/form/components/InputField';

import { AmountParser } from '../../hooks/useAmountParser';
import { CurrencySymbol } from './components/CurrencySymbol';
import { Rate, RateProps } from '../Rate';
import { TopUpCurrency } from '../../types';
import { hasError } from './utils/hasError';
import { useAmountFieldStyles } from './AmountFieldStyles';
import { useAutoWidth } from './hooks/useAutoWidth';
import { useKey } from './hooks/useKey';

export const MILLION_ANKR_TOKENS = 1_000_000;

export interface AmountFieldProps {
  amount?: string;
  className?: string;
  currency: TopUpCurrency;
  isDisabled?: boolean;
  isModified?: boolean;
  maxLength: number;
  parse: AmountParser;
  rateProps: RateProps;
  validate: FieldValidator<string>;
}

export const AmountField = ({
  amount,
  className,
  currency,
  isDisabled,
  isModified,
  maxLength,
  parse,
  rateProps,
  validate,
}: AmountFieldProps) => {
  const [autoWidth, autoWidthRef] = useAutoWidth(amount);

  const { classes, cx } = useAmountFieldStyles({ autoWidth, isModified });

  const key = useKey(validate);
  const amountValue = new BigNumber(amount || 0);

  const form = useForm();

  const isValid = form.getState().valid;

  return (
    <Box className={cx(classes.root, className)}>
      <div className={classes.autoWidth} ref={autoWidthRef}>
        {amount}
      </div>
      <Field
        className={classes.field}
        component={InputField}
        disabled={isDisabled}
        hasError={hasError}
        key={key}
        name="amount"
        parse={parse}
        validate={validate}
        variant="outlined"
        InputProps={{
          classes: {
            root: classes.inputRoot,
            input: classes.input,
          },
          inputProps: { maxLength },
          startAdornment: (
            <CurrencySymbol currency={currency} isDisabled={isDisabled} />
          ),
        }}
      />
      {currency === TopUpCurrency.ANKR &&
        isValid &&
        amountValue.isGreaterThanOrEqualTo(MILLION_ANKR_TOKENS) && (
          <Typography variant="body2" className={classes.info}>
            {t('account.account-details.top-up.info')}
          </Typography>
        )}
      <Rate {...rateProps} />
    </Box>
  );
};
