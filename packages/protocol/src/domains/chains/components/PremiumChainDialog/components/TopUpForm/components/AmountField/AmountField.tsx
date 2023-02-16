import { Box } from '@mui/material';
import { Field } from 'react-final-form';
import { FieldValidator } from 'final-form';

import { AmountParser } from '../../hooks/useAmountParser';
import { CurrencySymbol } from './components/CurrencySymbol';
import { InputField } from 'modules/form/components/InputField';
import { Rate, RateProps } from '../Rate';
import { TopUpCurrency } from '../../types';
import { hasError } from './utils/hasError';
import { useAmountFieldStyles } from './AmountFieldStyles';
import { useAutoWidth } from './hooks/useAutoWidth';

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
      <Rate {...rateProps} />
    </Box>
  );
};
