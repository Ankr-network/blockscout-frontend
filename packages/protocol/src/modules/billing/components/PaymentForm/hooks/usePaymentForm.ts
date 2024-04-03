import { Web3Address } from 'multirpc-sdk';

import { useCryptoPaymentSummary } from './useCryptoPaymentSummary';
import { useCurrency } from './useCurrency';
import { useDealAmount } from '../components/DealAmount';
import { useDealPayment } from './useDealPayment';
import { useOneTimeAmount } from '../components/OneTimeAmount';
import { useOneTimeCryptoPayment } from './useOneTimeCryptoPayment';
import { useOneTimeUSDPayment } from './useOneTimeUSDPayment';
import { usePayButtonHandler } from './usePayButtonHandler';
import { usePaymentType } from './usePaymentType';
import { useRecurringAmount } from '../components/RecurringAmount';
import { useRecurringPayment } from './useRecurringPayment';
import { useUSDPaymentSummary } from './useUSDPaymentSummary';

export interface IUsePaymentFormProps {
  onConnectAccount: (connectedAddress: Web3Address) => void;
  onCryptoPaymentFlowClose: () => void;
  onDepositSuccess: () => void;
}

export const usePaymentForm = ({
  onConnectAccount,
  onCryptoPaymentFlowClose,
  onDepositSuccess,
}: IUsePaymentFormProps) => {
  const { paymentType, paymentTabsProps } = usePaymentType();

  const { currency, currencyTabsProps } = useCurrency({ paymentType });

  const { amount: recurringAmount, ...recurringAmountProps } =
    useRecurringAmount();

  const { amount: oneTimeAmount, ...oneTimeAmountProps } = useOneTimeAmount({
    currency,
  });

  const dealAmountProps = useDealAmount();
  const { amount: dealAmount } = dealAmountProps;

  const {
    handlePayButtonClick: handleRecurringPaymentPayButtonClick,
    usdPaymentSummaryProps: recurringPaymentSummaryProps,
  } = useRecurringPayment({ amount: recurringAmount });

  const {
    handlePayButtonClick: handleOneTimeUSDPaymentPayButtonClick,
    usdPaymentSummaryProps: oneTimeUSDPaymentSummaryProps,
  } = useOneTimeUSDPayment({ amount: oneTimeAmount });

  const {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSummaryProps: oneTimeANKRPaymentSummaryProps,
    handlePayButtonClick: handleOneTimeANKRPaymentPayButtonClick,
    isLoading: isOneTimeCryptoPaymentLoading,
  } = useOneTimeCryptoPayment({
    amount: oneTimeAmount,
    currency,
    onConnectAccount,
    onCryptoPaymentFlowClose,
    onDepositSuccess,
  });

  const {
    handlePayButtonClick: handleDealPaymentPayButtonClick,
    usdPaymentSummaryProps: dealPaymentSummaryProps,
    enterpriseDialogProps,
  } = useDealPayment({ amount: dealAmount });

  const { handlePayButtonClick, isLoading: isPayButtonLoading } =
    usePayButtonHandler({
      currency,
      handleDealPaymentPayButtonClick,
      handleOneTimeANKRPaymentPayButtonClick,
      handleOneTimeUSDPaymentPayButtonClick,
      handleRecurringPaymentPayButtonClick,
      isOneTimeCryptoPaymentLoading,
      paymentType,
    });

  const { usdPaymentSummaryProps } = useUSDPaymentSummary({
    currency,
    dealPaymentSummaryProps,
    oneTimeUSDPaymentSummaryProps,
    paymentType,
    recurringPaymentSummaryProps,
  });

  const { cryptoPaymentSummaryProps } = useCryptoPaymentSummary({
    currency,
    oneTimeANKRPaymentSummaryProps,
    paymentType,
  });

  return {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSummaryProps,
    currency,
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
  };
};
