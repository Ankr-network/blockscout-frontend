import BigNumber from 'bignumber.js';
import { ClassNameMap } from '@mui/material/styles';
import { FormRenderProps } from 'react-final-form';
import { TopUp } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { AmountField } from '../ANKRTopUpForm/AmountField';
import { AmountInputField, TopUpFormValues } from './USDTopUpFormTypes';
import { BundlePaymentBanner } from '../BundlePaymentBanner';
import { BundlePaymentDialog } from '../BundlePaymentDialog';
import {
  DEFAULT_USD_VALUE_STRING,
  MAX_USD_DECIMALS,
  USD_CURRENCY,
  USD_THRESHOLD_VALUE,
} from 'domains/account/actions/usdTopUp/const';
import { LoadingButton } from 'uiKit/LoadingButton';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { USDSubscriptionPricesTabs } from './USDSubscriptionPricesTabs';
import { TrackTopUpSubmit } from 'domains/account/types';
import { checkBundleByPriceId } from './utils/checkBundleByPriceId';
import { selectBundlePaymentPlans } from 'domains/account/store/selectors';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useAppSelector } from 'store/useAppSelector';

export const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThan(USD_THRESHOLD_VALUE)) {
    return t('validation.min', {
      value: USD_THRESHOLD_VALUE,
    });
  }

  return undefined;
};

export const useRenderForm = (
  classes: ClassNameMap,
  isLoading: boolean,
  shouldUseDefaultValue: boolean,
  trackSubmit?: TrackTopUpSubmit,
) => {
  const { isOpened, onClose, onOpen } = useDialog();

  const bundles = useAppSelector(selectBundlePaymentPlans);

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
      const isBundlePayment = checkBundleByPriceId(values.id, bundles);
      const amount = values[AmountInputField.amount];

      return (
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <div>
            <Typography
              className={classes.amountLabel}
              component="div"
              variant="subtitle2"
            >
              {t('account.account-details.top-up.amount-label')}
            </Typography>
            <USDSubscriptionPricesTabs
              className={classes.tabs}
              onChange={handleAmountChange}
              tabClassName={classes.tab}
            />
            <AmountField<AmountInputField.amount>
              amount={amount}
              change={change}
              currency={USD_CURRENCY}
              isBundlePayment={checkBundleByPriceId(values.id, bundles)}
              isDisabled={!canEditAmount}
              isUSD
              maxDecimals={MAX_USD_DECIMALS}
              maxLength={6}
              name={AmountInputField.amount}
              validate={validateAmount}
            />
            <BundlePaymentBanner onClick={onOpen} />
          </div>
          <div className={classes.bottom}>
            <LoadingButton
              className={classes.button}
              color="primary"
              disabled={validating || isLoading}
              fullWidth
              loading={isLoading}
              startIcon={<TopUp />}
              onClick={isBundlePayment ? onOpen : handleSubmit}
            >
              {t('account.account-details.top-up.top-up')}
            </LoadingButton>
            {!canEditAmount && (
              <div className={classes.cancelLabel}>
                {t('account.account-details.top-up.cancel-label')}
              </div>
            )}
          </div>
          <BundlePaymentDialog
            isOpened={isOpened}
            onClose={onClose}
            trackSubmit={trackSubmit}
          />
        </form>
      );
    },
    [
      bundles,
      classes,
      isLoading,
      isOpened,
      onClose,
      onOpen,
      shouldUseDefaultValue,
      trackSubmit,
    ],
  );
};
