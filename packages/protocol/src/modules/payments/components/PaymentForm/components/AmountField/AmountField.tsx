import { EPaymentType } from 'modules/payments/types';
import {
  DealAmounts,
  IDealAmountsProps,
} from 'modules/payments/components/PaymentForm/components/DealAmounts';

import { IOneTimeAmountProps, OneTimeAmount } from '../OneTimeAmount';
import { IRecurringAmountProps, RecurringAmount } from '../RecurringAmount';

export interface IAmountFieldProps {
  className?: string;
  dealAmountsProps: IDealAmountsProps;
  oneTimeAmountProps: IOneTimeAmountProps;
  paymentType: EPaymentType;
  recurringAmountProps: IRecurringAmountProps;
}

export const AmountField = ({
  className,
  dealAmountsProps,
  oneTimeAmountProps,
  paymentType,
  recurringAmountProps,
}: IAmountFieldProps) => {
  if (paymentType === EPaymentType.OneTime) {
    return <OneTimeAmount className={className} {...oneTimeAmountProps} />;
  }

  if (paymentType === EPaymentType.Recurring) {
    return <RecurringAmount className={className} {...recurringAmountProps} />;
  }

  return <DealAmounts className={className} {...dealAmountsProps} />;
};
