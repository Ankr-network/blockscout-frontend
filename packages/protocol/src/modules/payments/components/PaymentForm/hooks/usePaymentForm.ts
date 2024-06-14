import { useEmailDialog } from 'domains/account/screens/BillingPage/hooks/useEmailDialog';

import { useCryptoPayment } from './useCryptoPayment';
import { useCurrency } from './useCurrency';
import { useDealAmount } from '../components/DealAmount';
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

  const dealAmountProps = useDealAmount();

  const { amount: dealAmount } = dealAmountProps;

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
    dealAmountProps,
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
