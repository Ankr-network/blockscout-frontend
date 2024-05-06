import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import { emptyFn } from 'modules/common/utils/emptyFn';

export interface IUsePayButtonHandlerProps {
  currency: ECurrency;
  handleDealPaymentPayButtonClick: () => void;
  handleOneTimeCryptoPaymentPayButtonClick: () => void;
  handleOneTimeUSDPaymentPayButtonClick: () => void;
  handleRecurringPaymentPayButtonClick: () => void;
  isOneTimeCryptoPaymentLoading: boolean;
  paymentType: EPaymentType;
}

type THandlersMap = Record<EPaymentType, [() => void, boolean]>;

export const usePayButtonHandler = ({
  currency,
  handleDealPaymentPayButtonClick,
  handleOneTimeCryptoPaymentPayButtonClick,
  handleOneTimeUSDPaymentPayButtonClick,
  handleRecurringPaymentPayButtonClick,
  isOneTimeCryptoPaymentLoading,
  paymentType,
}: IUsePayButtonHandlerProps) => {
  const isUSD = currency === ECurrency.USD;

  const [handlePayButtonClick, isLoading] = useMemo(() => {
    if (isUSD) {
      const handlersMap: THandlersMap = {
        [EPaymentType.Deal]: [handleDealPaymentPayButtonClick, false],
        [EPaymentType.OneTime]: [handleOneTimeUSDPaymentPayButtonClick, false],
        [EPaymentType.Recurring]: [handleRecurringPaymentPayButtonClick, false],
      };

      return handlersMap[paymentType];
    }

    const handlersMap: THandlersMap = {
      [EPaymentType.Deal]: [emptyFn, false],
      [EPaymentType.OneTime]: [
        handleOneTimeCryptoPaymentPayButtonClick,
        isOneTimeCryptoPaymentLoading,
      ],
      [EPaymentType.Recurring]: [emptyFn, false],
    };

    return handlersMap[paymentType];
  }, [
    handleDealPaymentPayButtonClick,
    handleOneTimeCryptoPaymentPayButtonClick,
    handleOneTimeUSDPaymentPayButtonClick,
    handleRecurringPaymentPayButtonClick,
    isUSD,
    isOneTimeCryptoPaymentLoading,
    paymentType,
  ]);

  return { handlePayButtonClick, isLoading };
};
