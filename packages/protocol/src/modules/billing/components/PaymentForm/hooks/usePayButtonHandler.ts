import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import { emptyFn } from 'modules/common/utils/emptyFn';

export interface IUsePayButtonHandlerProps {
  currency: ECurrency;
  handleDealPaymentPayButtonClick: () => void;
  handleOneTimeANKRPaymentPayButtonClick: () => void;
  handleOneTimeUSDPaymentPayButtonClick: () => void;
  handleRecurringPaymentPayButtonClick: () => void;
  isOneTimeCryptoPaymentLoading: boolean;
  paymentType: EPaymentType;
}

type THandlersMap = Record<EPaymentType, [() => void, boolean]>;

export const usePayButtonHandler = ({
  currency,
  handleDealPaymentPayButtonClick,
  handleOneTimeANKRPaymentPayButtonClick,
  handleOneTimeUSDPaymentPayButtonClick,
  handleRecurringPaymentPayButtonClick,
  isOneTimeCryptoPaymentLoading,
  paymentType,
}: IUsePayButtonHandlerProps) => {
  const isANKR = currency === ECurrency.ANKR;

  const [handlePayButtonClick, isLoading] = useMemo(() => {
    if (isANKR) {
      const handlersMap: THandlersMap = {
        [EPaymentType.Deal]: [emptyFn, false],
        [EPaymentType.OneTime]: [
          handleOneTimeANKRPaymentPayButtonClick,
          isOneTimeCryptoPaymentLoading,
        ],
        [EPaymentType.Recurring]: [emptyFn, false],
      };

      return handlersMap[paymentType];
    }

    const handlersMap: THandlersMap = {
      [EPaymentType.Deal]: [handleDealPaymentPayButtonClick, false],
      [EPaymentType.OneTime]: [handleOneTimeUSDPaymentPayButtonClick, false],
      [EPaymentType.Recurring]: [handleRecurringPaymentPayButtonClick, false],
    };

    return handlersMap[paymentType];
  }, [
    handleDealPaymentPayButtonClick,
    handleOneTimeANKRPaymentPayButtonClick,
    handleOneTimeUSDPaymentPayButtonClick,
    handleRecurringPaymentPayButtonClick,
    isANKR,
    isOneTimeCryptoPaymentLoading,
    paymentType,
  ]);

  return { handlePayButtonClick, isLoading };
};
