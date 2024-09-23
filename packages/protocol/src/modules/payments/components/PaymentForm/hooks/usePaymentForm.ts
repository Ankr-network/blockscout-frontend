import { useEmailDialog } from 'domains/account/screens/BillingPage/hooks/useEmailDialog';
import { useDealAmounts } from 'modules/payments/components/PaymentForm/components/DealAmounts';

import { useCryptoPayment } from './useCryptoPayment';
import { useCurrency } from './useCurrency';
import { useDealPayment } from './useDealPayment';
import { useMinAmount } from './useMinAmount';
import { useNetwork } from './useNetwork';
import { useOneTimeAmount } from '../components/OneTimeAmount';
import { useOneTimeUsdPayment } from './useOneTimeUsdPayment';
import { usePayButtonHandler } from './usePayButtonHandler';
import { usePaymentType } from './usePaymentType';
import { useRecurringAmount } from '../components/RecurringAmount';
import { useRecurringPayment } from './useRecurringPayment';
import { useUsdPaymentSummaryDialog } from './useUsdPaymentSummaryDialog';

export const usePaymentForm = () => {
  const { paymentTabsProps, paymentType } = usePaymentType();

  const { currency, currencyTabsProps, handleCurrencyChange } = useCurrency({
    paymentType,
  });

  const { handleNetworkChange, handleNetworkReset, network, networks } =
    useNetwork({ currency });

  const { recurringAmount, recurringAmountProps } = useRecurringAmount();

  const minAmount = useMinAmount({ currency, network });

  const { oneTimeAmount, oneTimeAmountProps } = useOneTimeAmount({
    currency,
    handleCurrencyChange,
    minAmount,
  });

  const {
    handleRecurrungPaymentSummaryDialogOpen,
    recurringPaymentSummaryDialogProps,
  } = useRecurringPayment({ amount: recurringAmount });

  const {
    handleOneTimeUsdPaymentSummaryDialogOpen,
    oneTimeUsdPaymentSummaryDialogProps,
  } = useOneTimeUsdPayment({ amount: oneTimeAmount });

  const {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    handleCryptoPaymentFlowInit,
    isCryptoPaymentFlowInitializing,
  } = useCryptoPayment({
    amount: oneTimeAmount,
    currency,
    handleNetworkChange,
    handleNetworkReset,
    network,
    networks,
    oneTimeAmountProps,
  });

  const dealAmountsProps = useDealAmounts();
  const { amount: dealAmount } = dealAmountsProps;

  const {
    dealPaymentSummaryDialogProps,
    enterpriseDialogProps,
    handleDealPaymentSummaryDialogOpen,
  } = useDealPayment({ amount: dealAmount });

  const {
    dialogProps: emailDialogProps,
    emailData,
    handleOpenEmailDialog,
    hasEmailBound,
  } = useEmailDialog();

  const { handlePayButtonClick, isLoading: isPayButtonLoading } =
    usePayButtonHandler({
      currency,
      handleCryptoPaymentFlowInit,
      handleDealPaymentSummaryDialogOpen,
      handleOneTimeUsdPaymentSummaryDialogOpen,
      handleOpenEmailDialog,
      handleRecurrungPaymentSummaryDialogOpen,
      hasEmailBound,
      isCryptoPaymentFlowInitializing,
      paymentType,
    });

  const { usdPaymentSummaryDialogProps } = useUsdPaymentSummaryDialog({
    currency,
    dealPaymentSummaryDialogProps,
    oneTimeUsdPaymentSummaryDialogProps,
    paymentType,
    recurringPaymentSummaryDialogProps,
  });

  return {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryDialogProps,
    currency,
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
  };
};
