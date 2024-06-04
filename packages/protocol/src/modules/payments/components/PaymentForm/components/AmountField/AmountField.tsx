import { EPaymentType } from 'modules/payments/types';

import { DealAmount, IDealAmountProps } from '../DealAmount';
import { IOneTimeAmountProps, OneTimeAmount } from '../OneTimeAmount';
import { IRecurringAmountProps, RecurringAmount } from '../RecurringAmount';

export interface IAmountFieldProps {
  className?: string;
  dealAmountProps: IDealAmountProps;
  oneTimeAmountProps: IOneTimeAmountProps;
  paymentType: EPaymentType;
  recurringAmountProps: IRecurringAmountProps;
}

export const AmountField = ({
  className,
  dealAmountProps,
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

  return <DealAmount className={className} {...dealAmountProps} />;
};
