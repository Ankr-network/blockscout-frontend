import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { Tab } from 'uiKit/TabsManager';

import { AmountField } from './components/AmountField';
import {
  CryptoPaymentSummaryDialog,
  ICryptoPaymentSummaryDialogProps,
} from '../CryptoPaymentSummaryDialog';
import { CurrencyTabs } from './components/CurrencyTabs';
import { PaymentTabs } from './components/PaymentTabs';
import {
  IUSDPaymentSummaryDialogProps,
  USDPaymentSummaryDialog,
} from '../USDPaymentSummaryDialog';
import { usePaymentFormStyles } from './usePaymentFormStyles';
import { CryptoPaymentDepositDialog } from '../CryptoPaymentDepositDialog';
import { IDealAmountProps } from './components/DealAmount';
import { IOneTimeAmountProps } from './components/OneTimeAmount';
import { ECurrency, EPaymentType } from '../../types';
import { IUseRecurringAmountResult } from './components/RecurringAmount';
import { ICryptoPaymentDepositDialogProps } from '../CryptoPaymentDepositDialog/types';

export interface IPaymentFormProps {
  className?: string;

  cryptoPaymentSummaryProps?: ICryptoPaymentSummaryDialogProps;
  currencyTabsProps: {
    tabs: Tab<ECurrency>[];
    selectedTab?: Tab<ECurrency>;
  };
  dealAmountProps: IDealAmountProps;
  handlePayButtonClick: () => void;
  oneTimeAmountProps: IOneTimeAmountProps;
  paymentTabsProps: {
    tabs: Tab<EPaymentType>[];
    selectedTab?: Tab<EPaymentType>;
  };
  paymentType: EPaymentType;
  recurringAmountProps: IUseRecurringAmountResult;
  usdPaymentSummaryProps?: IUSDPaymentSummaryDialogProps;
  isPayButtonLoading: boolean;

  cryptoPaymentDepositDialogProps?: ICryptoPaymentDepositDialogProps;
}

export const PaymentForm = ({
  className,
  cryptoPaymentSummaryProps,
  currencyTabsProps,
  dealAmountProps,
  handlePayButtonClick,
  oneTimeAmountProps,
  paymentTabsProps,
  paymentType,
  recurringAmountProps,
  usdPaymentSummaryProps,
  isPayButtonLoading,

  cryptoPaymentDepositDialogProps,
}: IPaymentFormProps) => {
  const { classes, cx } = usePaymentFormStyles();

  return (
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
        onClick={handlePayButtonClick}
        size="large"
      >
        {t('account.payment-form.pay-button')}
      </LoadingButton>

      {usdPaymentSummaryProps && (
        <USDPaymentSummaryDialog {...usdPaymentSummaryProps} />
      )}

      {cryptoPaymentSummaryProps && (
        <CryptoPaymentSummaryDialog {...cryptoPaymentSummaryProps} />
      )}

      {cryptoPaymentDepositDialogProps && (
        <CryptoPaymentDepositDialog {...cryptoPaymentDepositDialogProps} />
      )}
    </div>
  );
};
