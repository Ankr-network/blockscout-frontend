import BigNumber from 'bignumber.js';
import { FormRenderProps } from 'react-final-form';
import { TopUp } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';

import {
  DEFAULT_USD_VALUE_STRING,
  MAX_USD_DECIMALS,
  USD_CURRENCY,
  USD_THRESHOLD_VALUE,
} from 'domains/account/actions/usdTopUp/const';
import { LoadingButton } from 'uiKit/LoadingButton';
import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { TrackTopUpSubmit } from 'domains/account/types';
import {
  selectBundlePaymentPlanByPriceId,
  selectBundlePaymentPlans,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useDialog } from 'modules/common/hooks/useDialog';

import { checkBundleByPriceId } from './utils/checkBundleByPriceId';
import { USDSubscriptionPricesTabs } from './USDSubscriptionPricesTabs';
import { BundlePaymentDialog } from '../BundlePaymentDialog';
import { BundlePaymentBanner } from '../BundlePaymentBanner';
import { AmountInputField, TopUpFormValues } from './USDTopUpFormTypes';
import { AmountField } from '../ANKRTopUpForm/AmountField';
import { useStyles } from './USDTopUpFormStyles';

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

interface UseRenderFormArguments {
  isLoading: boolean;
  shouldUseDefaultValue: boolean;
  trackSubmit?: TrackTopUpSubmit;
  usdPriceId?: string;
}

export const useRenderForm = ({
  isLoading,
  shouldUseDefaultValue,
  trackSubmit,
  usdPriceId,
}: UseRenderFormArguments) => {
  const { isOpened, onClose, onOpen } = useDialog();

  const { classes, cx } = useStyles();

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
              initialTabID={usdPriceId}
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
            <div
              className={cx(classes.cancelLabel, {
                [classes.cancelLabelHidden]: canEditAmount,
              })}
            >
              {t('account.account-details.top-up.cancel-label')}
            </div>
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
      cx,
      isLoading,
      isOpened,
      onClose,
      onOpen,
      shouldUseDefaultValue,
      trackSubmit,
      usdPriceId,
    ],
  );
};

export const useInitialValues = (
  usdPriceId?: string,
  shouldUseDefaultValue = false,
) => {
  const bundle = useAppSelector(state =>
    selectBundlePaymentPlanByPriceId(state, usdPriceId),
  );

  const bundleAmount = bundle?.price.amount ?? '';

  return useMemo(() => {
    if (usdPriceId) {
      return {
        [AmountInputField.amount]: bundleAmount,
        [AmountInputField.id]: usdPriceId,
      };
    }

    return {
      [AmountInputField.amount]: shouldUseDefaultValue
        ? DEFAULT_USD_VALUE_STRING
        : '',
      [AmountInputField.id]: ONE_TIME_PAYMENT_ID,
    };
  }, [bundleAmount, shouldUseDefaultValue, usdPriceId]);
};
