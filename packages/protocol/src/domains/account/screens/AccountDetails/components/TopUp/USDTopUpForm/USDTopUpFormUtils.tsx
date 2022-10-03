import { ClassNameMap } from '@material-ui/styles';
import { useCallback } from 'react';
import { FormRenderProps } from 'react-final-form';
import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';
import { AmountInputField, TopUpFormValues } from './USDTopUpFormTypes';
import { USD_CURRENCY } from '../../const';
import { AmountField } from '../TopUpForm/AmountField';
import { LoadingButton } from 'uiKit/LoadingButton';
import { RateBlock } from '../TopUpForm/RateBlock';

const MAX_USD_DECIMALS = 1;

const MIN_USD_AMOUNT = 5;

const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThanOrEqualTo(MIN_USD_AMOUNT)) {
    return t('validation.min', {
      value: MIN_USD_AMOUNT,
    });
  }

  return undefined;
};

export const useRenderForm = (
  classes: ClassNameMap,
  isLoading: boolean,
  isDisabled: boolean,
) => {
  return useCallback(
    ({
      handleSubmit,
      validating,
      values,
      form: { change },
    }: FormRenderProps<TopUpFormValues>) => {
      return (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <AmountField
            name={AmountInputField.amount}
            change={change}
            maxDecimals={MAX_USD_DECIMALS}
            isDisabled={isDisabled}
            currency={USD_CURRENCY}
            validate={validateAmount}
          />
          <RateBlock
            value={values[AmountInputField.amount]}
            currency={USD_CURRENCY}
          />
          <LoadingButton
            color="primary"
            fullWidth
            type="submit"
            disabled={validating || isLoading}
            className={classes.button}
            loading={isLoading}
          >
            {t('account.account-details.top-up.button')}
          </LoadingButton>
        </form>
      );
    },
    [classes.button, classes.form, isLoading, isDisabled],
  );
};
