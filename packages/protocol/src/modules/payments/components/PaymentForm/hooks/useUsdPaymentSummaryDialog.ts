import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';

import { IUSDPaymentSummaryDialogProps } from '../../USDPaymentSummaryDialog';

export interface IUseUSDPaymentSummaryProps {
  currency: ECurrency;
  dealPaymentSummaryDialogProps: IUSDPaymentSummaryDialogProps;
  oneTimeUsdPaymentSummaryDialogProps: IUSDPaymentSummaryDialogProps;
  paymentType: EPaymentType;
  recurringPaymentSummaryDialogProps: IUSDPaymentSummaryDialogProps;
}

type TSummaryPropsMap = Record<EPaymentType, IUSDPaymentSummaryDialogProps>;

export const useUsdPaymentSummaryDialog = ({
  currency,
  dealPaymentSummaryDialogProps,
  oneTimeUsdPaymentSummaryDialogProps,
  paymentType,
  recurringPaymentSummaryDialogProps,
}: IUseUSDPaymentSummaryProps) => {
  const isUsd = currency === ECurrency.USD;

  const usdPaymentSummaryDialogProps = useMemo(() => {
    if (isUsd) {
      const summaryPropsMap: TSummaryPropsMap = {
        [EPaymentType.Deal]: dealPaymentSummaryDialogProps,
        [EPaymentType.OneTime]: oneTimeUsdPaymentSummaryDialogProps,
        [EPaymentType.Recurring]: recurringPaymentSummaryDialogProps,
      };

      return summaryPropsMap[paymentType];
    }

    return undefined;
  }, [
    dealPaymentSummaryDialogProps,
    isUsd,
    oneTimeUsdPaymentSummaryDialogProps,
    paymentType,
    recurringPaymentSummaryDialogProps,
  ]);

  return { usdPaymentSummaryDialogProps };
};
