import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { EPaymentType } from 'modules/billing/types';
// TODO: move to the billing module
import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { useEmailDialog } from 'domains/account/screens/BillingPage/hooks/useEmailDialog';
import { TopUpEmailDialog } from 'domains/account/screens/BillingPage/TopUpEmailDialog';
import { IDialogProps } from 'uiKit/Dialog';

import { AmountField } from './components/AmountField';
import {
  CryptoPaymentDepositDialog,
  ICryptoPaymentDepositDialogProps,
} from '../CryptoPaymentDepositDialog';
import {
  CryptoPaymentSuccessDialog,
  ICryptoPaymentSuccessDialogProps,
} from '../CryptoPaymentSuccessDialog';
import {
  CryptoPaymentSummaryDialog,
  ICryptoPaymentSummaryDialogProps,
} from '../CryptoPaymentSummaryDialog';
import { CurrencyTabs, ICurrencyTabsProps } from './components/CurrencyTabs';
import { IDealAmountProps } from './components/DealAmount';
import { IOneTimeAmountProps } from './components/OneTimeAmount';
import { IPaymentTabsProps, PaymentTabs } from './components/PaymentTabs';
import {
  IUSDPaymentSummaryDialogProps,
  USDPaymentSummaryDialog,
} from '../USDPaymentSummaryDialog';
import { IUseRecurringAmountResult } from './components/RecurringAmount';
import { TimeToUpgradeDialog } from '../TimeToUpgradeDialog';
import { usePaymentFormStyles } from './usePaymentFormStyles';

export interface IPaymentFormProps {
  className?: string;
  cryptoPaymentDepositDialogProps?: ICryptoPaymentDepositDialogProps;
  cryptoPaymentSuccessDialogProps: ICryptoPaymentSuccessDialogProps;
  cryptoPaymentSummaryProps?: ICryptoPaymentSummaryDialogProps;
  currencyTabsProps: ICurrencyTabsProps;
  dealAmountProps: IDealAmountProps;
  enterpriseDialogProps: IDialogProps;
  handlePayButtonClick: () => void;
  isPayButtonLoading: boolean;
  oneTimeAmountProps: IOneTimeAmountProps;
  paymentTabsProps: IPaymentTabsProps;
  paymentType: EPaymentType;
  recurringAmountProps: IUseRecurringAmountResult;
  usdPaymentSummaryProps?: IUSDPaymentSummaryDialogProps;
}

export const PaymentForm = ({
  className,
  cryptoPaymentDepositDialogProps,
  cryptoPaymentSuccessDialogProps,
  cryptoPaymentSummaryProps,
  currencyTabsProps,
  dealAmountProps,
  enterpriseDialogProps,
  handlePayButtonClick,
  isPayButtonLoading,
  oneTimeAmountProps,
  paymentTabsProps,
  paymentType,
  recurringAmountProps,
  usdPaymentSummaryProps,
}: IPaymentFormProps) => {
  const { classes, cx } = usePaymentFormStyles();

  const { dialogProps, emailData, handleOpenEmailDialog, hasEmailBound } =
    useEmailDialog();

  const handleCheckBoundedEmailAndPay = useCallback(() => {
    if (!hasEmailBound) {
      return handleOpenEmailDialog();
    }

    return handlePayButtonClick();
  }, [handleOpenEmailDialog, handlePayButtonClick, hasEmailBound]);

  return (
    <>
      <div className={cx(classes.paymentFormRoot, className)}>
        <WidgetTitle className={classes.title}>
          {t('account.payment-form.title')}
        </WidgetTitle>
        <PaymentTabs className={classes.paymentTabs} {...paymentTabsProps} />
        <CurrencyTabs className={classes.currencyTabs} {...currencyTabsProps} />
        <AmountField
          className={classes.amountField}
          dealAmountProps={dealAmountProps}
          oneTimeAmountProps={oneTimeAmountProps}
          paymentType={paymentType}
          recurringAmountProps={recurringAmountProps}
        />
        <LoadingButton
          fullWidth
          loading={isPayButtonLoading}
          onClick={handleCheckBoundedEmailAndPay}
          size="large"
        >
          {t('account.payment-form.pay-button')}
        </LoadingButton>
      </div>

      {usdPaymentSummaryProps && (
        <USDPaymentSummaryDialog {...usdPaymentSummaryProps} />
      )}

      {cryptoPaymentSummaryProps && (
        <CryptoPaymentSummaryDialog {...cryptoPaymentSummaryProps} />
      )}

      {cryptoPaymentDepositDialogProps && (
        <CryptoPaymentDepositDialog {...cryptoPaymentDepositDialogProps} />
      )}

      <CryptoPaymentSuccessDialog {...cryptoPaymentSuccessDialogProps} />

      <TimeToUpgradeDialog {...enterpriseDialogProps} />

      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
