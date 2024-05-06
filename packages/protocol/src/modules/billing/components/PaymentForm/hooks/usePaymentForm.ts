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
import { useNetwork } from './useNetwork';
import { useMinAmount } from './useMinAmount';

export interface IUsePaymentFormProps {
  onConnectAccount: (connectedAddress: Web3Address) => void;
  onCryptoPaymentFlowClose: () => void;
}

export const usePaymentForm = ({
  onConnectAccount,
  onCryptoPaymentFlowClose,
}: IUsePaymentFormProps) => {
  const { paymentType, paymentTabsProps } = usePaymentType();

  const { currency, currencyTabsProps, handleChangeCurrency } = useCurrency({
    paymentType,
  });

  const { network, networkOptions, handleNetworkChange } = useNetwork(currency);

  const { amount: recurringAmount, ...recurringAmountProps } =
    useRecurringAmount();

  const minAmount = useMinAmount({ currency, network });

  const { amount: oneTimeAmount, ...oneTimeAmountProps } = useOneTimeAmount({
    currency,
    minAmount,
    handleChangeCurrency,
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
    cryptoPaymentSuccessDialogProps,
    cryptoPaymentSummaryProps: oneTimeCryptoPaymentSummaryProps,
    handlePayButtonClick: handleOneTimeCryptoPaymentPayButtonClick,
    isLoading: isOneTimeCryptoPaymentLoading,
  } = useOneTimeCryptoPayment({
    amount: oneTimeAmount,
    currency,
    network,
    networkOptions,
    oneTimeAmountProps,
    handleNetworkChange,
    onConnectAccount,
    onCryptoPaymentFlowClose,
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
      handleOneTimeCryptoPaymentPayButtonClick,
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
    oneTimeCryptoPaymentSummaryProps,
    paymentType,
  });

  return {
    cryptoPaymentDepositDialogProps,
    cryptoPaymentSuccessDialogProps,
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
