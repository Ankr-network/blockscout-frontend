import { ClassNameMap } from '@material-ui/styles';
import { useCallback, useState } from 'react';
import { FormRenderProps } from 'react-final-form';
import BigNumber from 'bignumber.js';
import { Box } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { AmountInputField, TopUpFormValues } from './USDTopUpFormTypes';
import { DEFAULT_USD_VALUE, USD_CURRENCY } from '../../const';
import { AmountField } from '../TopUpForm/AmountField';
import { LoadingButton } from 'uiKit/LoadingButton';
import { RateBlock } from '../TopUpForm/RateBlock';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { USDSubscriptionPricesTabs } from './USDSubscriptionPricesTabs';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';

const MAX_USD_DECIMALS = 1;

export const defaultAmountValue = new BigNumber(DEFAULT_USD_VALUE).toString(10);

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
  hasRateBlock?: boolean,
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
          shouldUseDefaultValue && !value ? defaultAmountValue : value,
        );
        change(AmountInputField.id, id);
      };

      const canEditAmount = values.id === ONE_TIME_PAYMENT_ID;

      return (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <USDSubscriptionPricesTabs onChange={handleAmountChange} />
          <Box className={classes.form}>
            <AmountField<AmountInputField.amount>
              name={AmountInputField.amount}
              change={change}
              maxDecimals={MAX_USD_DECIMALS}
              isDisabled={shouldUseDefaultValue || !canEditAmount}
              currency={USD_CURRENCY}
              validate={validateAmount}
            />
            {hasRateBlock && (
              <RateBlock
                value={values[AmountInputField.amount]}
                currency={USD_CURRENCY}
              />
            )}
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
          </Box>
        </form>
      );
    },
    [
      classes.button,
      classes.form,
      isLoading,
      shouldUseDefaultValue,
      hasRateBlock,
    ],
  );
};

export const useOnTopUpSubmit = (
  isAccountPage: boolean,
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

  const isPricingPage = !isAccountPage;

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      if (isPricingPage && (!confirmedEmail || pendingEmail)) {
        setShowEmailBanner(true);
      } else {
        onSuccess(data);
      }
    },
    [confirmedEmail, onSuccess, pendingEmail, isPricingPage],
  );

  return {
    onSubmit,
    isOpened: showEmailBanner,
    onClose,
    isLoading: isFetchLinkForCardPaymentLoading,
  };
};
