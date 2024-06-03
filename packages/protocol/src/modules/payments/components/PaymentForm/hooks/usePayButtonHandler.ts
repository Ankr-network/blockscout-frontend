import { useCallback, useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/payments/types';
import { emptyFn } from 'modules/common/utils/emptyFn';

export interface IUsePayButtonHandlerProps {
  currency: ECurrency;
  handleCryptoPaymentFlowInit: () => Promise<void>;
  handleDealPaymentSummaryDialogOpen: () => void;
  handleOneTimeUsdPaymentSummaryDialogOpen: () => void;
  handleOpenEmailDialog: () => void;
  handleRecurrungPaymentSummaryDialogOpen: () => void;
  hasEmailBound: boolean;
  isCryptoPaymentFlowInitializing: boolean;
  paymentType: EPaymentType;
}

type THandlersMap = Record<
  EPaymentType,
  [(() => void) | (() => Promise<void>), boolean]
>;

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

  const handlePayButtonClick = useCallback(async () => {
    if (!hasEmailBound) {
      handleOpenEmailDialog();

      return;
    }

    await handlePayButtonClickRaw();
  }, [handleOpenEmailDialog, handlePayButtonClickRaw, hasEmailBound]);

  return { handlePayButtonClick, isLoading };
};
