import classNames from 'classnames';
import { FormGroup, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

import { t } from 'modules/i18n/utils/intl';
import { InputField } from 'modules/form/components/InputField';
import { useStyles } from './AmountFieldStyles';
import {
  MAX_DECIMALS,
  MAX_LENGTH,
  normalizeAmount,
  validateAmount,
} from './AmountFieldUtils';
import { OnChange } from 'modules/form/utils/OnChange';

interface AmountFieldProps<T> {
  name: T;
  isDisabled?: boolean;
  size?: 'm' | 'l';
  validate?: (value: string, allValues?: any) => string | undefined;
  change?: (name: T, value: string) => void;
  maxDecimals?: number;
  currency: string;
  maxLength?: number;
  className?: string;
}

export function AmountField<T extends string>({
  size = 'm',
  name,
  isDisabled,
  change,
  validate = validateAmount,
  maxDecimals = MAX_DECIMALS,
  currency,
  maxLength = MAX_LENGTH,
  className,
}: AmountFieldProps<T>) {
  const classes = useStyles({ size });

  return (
    <FormGroup className={classNames(classes.formGroup, className)}>
      <Field
        component={InputField}
        name={name}
        variant="outlined"
        placeholder={t('account.account-details.top-up.placeholder')}
        validate={validate}
        parse={value => normalizeAmount(value, maxDecimals)}
        isHelperTextVisible
        disabled={isDisabled}
        InputProps={{
          classes: {
            root: classes.inputBase,
            input: classes.input,
          },
          endAdornment: <Typography variant="subtitle1">{currency}</Typography>,
        }}
        // eslint-disable-next-line
        inputProps={{ maxLength }}
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
}
