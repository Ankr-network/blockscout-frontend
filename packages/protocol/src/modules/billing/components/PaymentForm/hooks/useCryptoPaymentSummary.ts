import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';

import { ICryptoPaymentSummaryDialogProps } from '../../CryptoPaymentSummaryDialog';

export interface IUseCryptoPaymentSummaryProps {
  oneTimeANKRPaymentSummaryProps: ICryptoPaymentSummaryDialogProps;
  currency: ECurrency;
  paymentType: EPaymentType;
}

type TSummaryPropsMap = Record<
  EPaymentType,
  ICryptoPaymentSummaryDialogProps | undefined
>;

export const useCryptoPaymentSummary = ({
  currency,
  oneTimeANKRPaymentSummaryProps,
  paymentType,
}: IUseCryptoPaymentSummaryProps) => {
  const isANKR = currency === ECurrency.ANKR;

  const cryptoPaymentSummaryProps = useMemo(() => {
    if (isANKR) {
      const summaryPropsMap: TSummaryPropsMap = {
        [EPaymentType.Deal]: undefined,
        [EPaymentType.OneTime]: oneTimeANKRPaymentSummaryProps,
        [EPaymentType.Recurring]: undefined,
      };

      return summaryPropsMap[paymentType];
    }

    return undefined;
  }, [isANKR, oneTimeANKRPaymentSummaryProps, paymentType]);

  return { cryptoPaymentSummaryProps };
};
