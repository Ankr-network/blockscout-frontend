import { useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';

import { ICryptoPaymentSummaryDialogProps } from '../../CryptoPaymentSummaryDialog';

export interface IUseCryptoPaymentSummaryProps {
  currency: ECurrency;
  oneTimeCryptoPaymentSummaryProps: ICryptoPaymentSummaryDialogProps;
  paymentType: EPaymentType;
}

type TSummaryPropsMap = Record<
  EPaymentType,
  ICryptoPaymentSummaryDialogProps | undefined
>;

export const useCryptoPaymentSummary = ({
  currency,
  oneTimeCryptoPaymentSummaryProps,
  paymentType,
}: IUseCryptoPaymentSummaryProps) => {
  const isCrypto = currency !== ECurrency.USD;

  const cryptoPaymentSummaryProps = useMemo(() => {
    if (isCrypto) {
      const summaryPropsMap: TSummaryPropsMap = {
        [EPaymentType.Deal]: undefined,
        [EPaymentType.OneTime]: oneTimeCryptoPaymentSummaryProps,
        [EPaymentType.Recurring]: undefined,
      };

      return summaryPropsMap[paymentType];
    }

    return undefined;
  }, [isCrypto, oneTimeCryptoPaymentSummaryProps, paymentType]);

  return { cryptoPaymentSummaryProps };
};
