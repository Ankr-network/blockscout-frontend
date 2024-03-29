import { SecondaryTab } from 'modules/common/components/SecondaryTab';

import { usePaymentTabStyles } from './usePaymentTabStyles';

export interface IPaymentTabProps {
  isSelected: boolean;
  label: string;
}

export const PaymentTab = ({ isSelected, label }: IPaymentTabProps) => {
  const { classes } = usePaymentTabStyles();

  return (
    <SecondaryTab
      className={classes.paymentTabRoot}
      isSelected={isSelected}
      label={label}
    />
  );
};
