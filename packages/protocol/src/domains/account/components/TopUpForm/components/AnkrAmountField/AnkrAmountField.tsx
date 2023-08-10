import { FormGroup, Typography } from '@mui/material';
import { Field } from 'react-final-form';
import { t } from '@ankr.com/common';

import { ANKR_CURRENCY } from 'domains/account/actions/topUp/const';
import { InputField } from 'modules/form/components/InputField';
import { OnChange } from 'modules/form/utils/OnChange';

import { AmountValidator } from '../AnkrForm/types';
import { MAX_DECIMALS, MAX_LENGTH } from './constants';
import { Size } from './types';
import { normalizeAmount } from './utils/normalizeAmount';
import { useAnkrAmountField } from './hooks/useAnkrAmountField';
import { useAnkrAmountFieldStyles } from './AnkrAmountFieldStyles';
import { validateAmount } from './utils/validateAmount';

export interface AnkrAmountFieldProps<T> {
  amount: string;
  change?: (name: T, value: string) => void;
  className?: string;
  isBundlePayment?: boolean;
  isDisabled?: boolean;
  maxDecimals?: number;
  maxLength?: number;
  name: T;
  size?: Size;
  validate?: AmountValidator;
}

export const AnkrAmountField = <T extends string>({
  amount,
  change,
  className,
  isBundlePayment,
  isDisabled,
  maxDecimals = MAX_DECIMALS,
  maxLength = MAX_LENGTH,
  name,
  size = 'm',
  validate = validateAmount,
}: AnkrAmountFieldProps<T>) => {
  const { credits, parse } = useAnkrAmountField({ amount, maxDecimals });

  const { classes, cx } = useAnkrAmountFieldStyles(size);

  return (
    <FormGroup className={cx(classes.root, className)}>
      <Field
        component={InputField}
        disabled={isDisabled}
        isHelperTextVisible
        name={name}
        parse={parse}
        placeholder={t('account.account-details.top-up.placeholder')}
        validate={validate}
        variant="outlined"
        InputProps={{
          classes: {
            root: classes.inputBase,
            input: classes.input,
          },
          endAdornment: (
            <Typography variant="subtitle1" className={classes.subtitle}>
              {ANKR_CURRENCY}
              {!isBundlePayment && (
                <span className={classes.credits}>{credits}</span>
              )}
            </Typography>
          ),
          inputProps: { maxLength },
        }}
      />
      {change && (
        <OnChange name={name}>
          {(value: string) => {
            change(name, normalizeAmount(value, maxDecimals));
          }}
        </OnChange>
      )}
    </FormGroup>
  );
};
