import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { EPaymentType } from 'modules/payments/types';
import { EmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { IDialogProps } from 'uiKit/Dialog';
import {
  TopUpEmailDialog,
  TopUpEmailDialogProps,
} from 'domains/account/screens/BillingPage/TopUpEmailDialog';
// TODO: move to the billing module
import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { IDealAmountsProps } from 'modules/payments/components/PaymentForm/components/DealAmounts';
import { useAppSelector } from 'store/useAppSelector';
import { selectIsHighestDealPurchased } from 'domains/account/store/selectors';
import { SALES_TEAM_CONTACT } from 'modules/common/constants/const';

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
import { IOneTimeAmountProps } from './components/OneTimeAmount';
import { IPaymentTabsProps, PaymentTabs } from './components/PaymentTabs';
import {
  IUSDPaymentSummaryDialogProps,
  USDPaymentSummaryDialog,
} from '../USDPaymentSummaryDialog';
import { IRecurringAmountProps } from './components/RecurringAmount';
import { TimeToUpgradeDialog } from '../TimeToUpgradeDialog';
import { usePaymentFormStyles } from './usePaymentFormStyles';

export interface IPaymentFormProps {
  className?: string;
  cryptoPaymentDepositDialogProps: ICryptoPaymentDepositDialogProps;
  cryptoPaymentSuccessDialogProps: ICryptoPaymentSuccessDialogProps;
  cryptoPaymentSummaryDialogProps: ICryptoPaymentSummaryDialogProps;
  currencyTabsProps: ICurrencyTabsProps;
  dealAmountsProps: IDealAmountsProps;
  emailData: EmailData;
  emailDialogProps: TopUpEmailDialogProps['dialogProps'];
  enterpriseDialogProps: IDialogProps;
  handlePayButtonClick: () => void;
  isPayButtonLoading: boolean;
  oneTimeAmountProps: IOneTimeAmountProps;
  paymentTabsProps: IPaymentTabsProps;
  paymentType: EPaymentType;
  recurringAmountProps: IRecurringAmountProps;
  usdPaymentSummaryDialogProps?: IUSDPaymentSummaryDialogProps;
}

export const PaymentForm = ({
  className,
  cryptoPaymentDepositDialogProps,
  cryptoPaymentSuccessDialogProps,
  cryptoPaymentSummaryDialogProps,
  currencyTabsProps,
  dealAmountsProps,
  emailData,
  emailDialogProps,
  enterpriseDialogProps,
  handlePayButtonClick,
  isPayButtonLoading,
  oneTimeAmountProps,
  paymentTabsProps,
  paymentType,
  recurringAmountProps,
  usdPaymentSummaryDialogProps,
}: IPaymentFormProps) => {
  const { classes, cx } = usePaymentFormStyles();

  const isHighestDealPurchased = useAppSelector(selectIsHighestDealPurchased);
  const isContactSalesButton =
    paymentType === EPaymentType.Deal && isHighestDealPurchased;

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
          dealAmountsProps={dealAmountsProps}
          oneTimeAmountProps={oneTimeAmountProps}
          paymentType={paymentType}
          recurringAmountProps={recurringAmountProps}
        />
        <LoadingButton
          fullWidth
          loading={isPayButtonLoading}
          onClick={isContactSalesButton ? undefined : handlePayButtonClick}
          size="large"
          href={isContactSalesButton ? SALES_TEAM_CONTACT : undefined}
        >
          {isContactSalesButton
            ? t('account.payment-form.contact-sales-button')
            : t('account.payment-form.pay-button')}
        </LoadingButton>
      </div>
      {usdPaymentSummaryDialogProps && (
        <USDPaymentSummaryDialog {...usdPaymentSummaryDialogProps} />
      )}
      <CryptoPaymentSummaryDialog {...cryptoPaymentSummaryDialogProps} />
      <CryptoPaymentDepositDialog {...cryptoPaymentDepositDialogProps} />
      <CryptoPaymentSuccessDialog {...cryptoPaymentSuccessDialogProps} />
      <TimeToUpgradeDialog {...enterpriseDialogProps} />
      <TopUpEmailDialog
        dialogProps={emailDialogProps}
        emailDataProps={emailData}
      />
    </>
  );
};
