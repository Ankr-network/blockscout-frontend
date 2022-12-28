import { ClassNameMap } from '@material-ui/styles';
import { useCallback, useState } from 'react';
import { FormRenderProps } from 'react-final-form';
import BigNumber from 'bignumber.js';
import { Box } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { AmountInputField, TopUpFormValues } from './USDTopUpFormTypes';
import { AmountField } from '../ANKRTopUpForm/AmountField';
import { LoadingButton } from 'uiKit/LoadingButton';
import { RateBlock } from '../ANKRTopUpForm/RateBlock';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { USDSubscriptionPricesTabs } from './USDSubscriptionPricesTabs';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';
import {
  DEFAULT_USD_VALUE,
  DEFAULT_USD_VALUE_STRING,
  USD_CURRENCY,
  MAX_USD_DECIMALS,
} from 'domains/account/actions/usdTopUp/const';

const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThan(DEFAULT_USD_VALUE)) {
    return t('validation.min', {
      value: DEFAULT_USD_VALUE,
    });
  }

  return undefined;
};

export const useRenderForm = (
  classes: ClassNameMap,
  isLoading: boolean,
  shouldUseDefaultValue: boolean,
) => {
  return useCallback(
    ({
      handleSubmit,
      validating,
      values,
      form: { change },
    }: FormRenderProps<TopUpFormValues>) => {
      const handleAmountChange = (id: string, value: string) => {
        change(
          AmountInputField.amount,
          shouldUseDefaultValue && !value ? DEFAULT_USD_VALUE_STRING : value,
        );
        change(AmountInputField.id, id);
      };

      const canEditAmount = values.id === ONE_TIME_PAYMENT_ID;

      return (
        <form
          className={classes.rootForm}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className={classes.pricesTabsContainer}>
            <USDSubscriptionPricesTabs onChange={handleAmountChange} />
          </div>
          <Box className={classes.form}>
            <AmountField<AmountInputField.amount>
              className={classes.amount}
              name={AmountInputField.amount}
              change={change}
              maxDecimals={MAX_USD_DECIMALS}
              isDisabled={!canEditAmount}
              currency={USD_CURRENCY}
              validate={validateAmount}
              maxLength={6}
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
              {t(
                canEditAmount
                  ? 'account.account-details.top-up.top-up'
                  : 'account.account-details.top-up.subscribe',
              )}
            </LoadingButton>
          </Box>
        </form>
      );
    },
    [
      classes.button,
      classes.rootForm,
      classes.form,
      classes.amount,
      classes.pricesTabsContainer,
      isLoading,
      shouldUseDefaultValue,
    ],
  );
};

export const useOnTopUpSubmit = (
  confirmedEmail?: string,
  pendingEmail?: string,
) => {
  const { handleFetchLinkForCardPayment, isFetchLinkForCardPaymentLoading } =
    useCardPayment();

  const [showEmailBanner, setShowEmailBanner] = useState(false);

  const onSuccess = useCallback(
    async (data: TopUpFormValues) => {
      const { id, amount } = data;

      const { data: url } = await handleFetchLinkForCardPayment(amount, id);

      if (url) {
        window.location.href = url;
      }
    },
    [handleFetchLinkForCardPayment],
  );

  const onClose = useCallback(() => {
    setShowEmailBanner(false);
  }, []);

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      if (!confirmedEmail || pendingEmail) {
        setShowEmailBanner(true);
      } else {
        onSuccess(data);
      }
    },
    [confirmedEmail, onSuccess, pendingEmail],
  );

  return {
    onSubmit,
    isOpened: showEmailBanner,
    onClose,
    isLoading: isFetchLinkForCardPaymentLoading,
  };
};
