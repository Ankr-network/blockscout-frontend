import { useCallback, useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/payments/types';
import { emptyFn } from 'modules/common/utils/emptyFn';

export interface IUsePayButtonHandlerProps {
  currency: ECurrency;
  handleCryptoPaymentFlowInit: () => void;
  handleDealPaymentSummaryDialogOpen: () => void;
  handleOneTimeUsdPaymentSummaryDialogOpen: () => void;
  handleOpenEmailDialog: () => void;
  handleRecurrungPaymentSummaryDialogOpen: () => void;
  hasEmailBound: boolean;
  isCryptoPaymentFlowInitializing: boolean;
  paymentType: EPaymentType;
}

type THandlersMap = Record<EPaymentType, [() => void, boolean]>;

export const usePayButtonHandler = ({
  currency,
  handleCryptoPaymentFlowInit,
  handleDealPaymentSummaryDialogOpen,
  handleOneTimeUsdPaymentSummaryDialogOpen,
  handleOpenEmailDialog,
  handleRecurrungPaymentSummaryDialogOpen,
  hasEmailBound,
  isCryptoPaymentFlowInitializing,
  paymentType,
}: IUsePayButtonHandlerProps) => {
  const isUSD = currency === ECurrency.USD;

  const [handlePayButtonClickRaw, isLoading] = useMemo(() => {
    if (isUSD) {
      const handlersMap: THandlersMap = {
        [EPaymentType.Deal]: [handleDealPaymentSummaryDialogOpen, false],
        [EPaymentType.OneTime]: [
          handleOneTimeUsdPaymentSummaryDialogOpen,
          false,
        ],
        [EPaymentType.Recurring]: [
          handleRecurrungPaymentSummaryDialogOpen,
          false,
        ],
      };

      return handlersMap[paymentType];
    }

    const handlersMap: THandlersMap = {
      [EPaymentType.Deal]: [emptyFn, false],
      [EPaymentType.OneTime]: [
        handleCryptoPaymentFlowInit,
        isCryptoPaymentFlowInitializing,
      ],
      [EPaymentType.Recurring]: [emptyFn, false],
    };

    return handlersMap[paymentType];
  }, [
    handleCryptoPaymentFlowInit,
    handleDealPaymentSummaryDialogOpen,
    handleOneTimeUsdPaymentSummaryDialogOpen,
    handleRecurrungPaymentSummaryDialogOpen,
    isCryptoPaymentFlowInitializing,
    isUSD,
    paymentType,
  ]);

  const handlePayButtonClick = useCallback(() => {
    if (!hasEmailBound) {
      return handleOpenEmailDialog();
    }

    return handlePayButtonClickRaw();
  }, [handleOpenEmailDialog, handlePayButtonClickRaw, hasEmailBound]);

  return { handlePayButtonClick, isLoading };
};
