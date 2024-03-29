import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';

import { IUSDPaymentSummaryDialogProps } from '../../USDPaymentSummaryDialog';

export interface IUseUSDPaymentSummaryProps {
  currency: ECurrency;
  dealPaymentSummaryProps: IUSDPaymentSummaryDialogProps;
  oneTimeUSDPaymentSummaryProps: IUSDPaymentSummaryDialogProps;
  paymentType: EPaymentType;
  recurringPaymentSummaryProps: IUSDPaymentSummaryDialogProps;
}

type TSummaryPropsMap = Record<EPaymentType, IUSDPaymentSummaryDialogProps>;

export const useUSDPaymentSummary = ({
  currency,
  dealPaymentSummaryProps,
  oneTimeUSDPaymentSummaryProps,
  paymentType,
  recurringPaymentSummaryProps,
}: IUseUSDPaymentSummaryProps) => {
  const usdPaymentSummaryProps = useMemo(() => {
    if (currency === ECurrency.USD) {
      const summaryPropsMap: TSummaryPropsMap = {
        [EPaymentType.Deal]: dealPaymentSummaryProps,
        [EPaymentType.OneTime]: oneTimeUSDPaymentSummaryProps,
        [EPaymentType.Recurring]: recurringPaymentSummaryProps,
      };

      return summaryPropsMap[paymentType];
    }

    return undefined;
  }, [
    currency,
    dealPaymentSummaryProps,
    oneTimeUSDPaymentSummaryProps,
    paymentType,
    recurringPaymentSummaryProps,
  ]);

  return { usdPaymentSummaryProps };
};
