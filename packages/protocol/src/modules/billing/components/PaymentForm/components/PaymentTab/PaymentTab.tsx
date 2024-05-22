import {
  SecondaryTab,
  SecondaryTabProps,
} from 'modules/common/components/SecondaryTab';

import { usePaymentTabStyles } from './usePaymentTabStyles';

export const PaymentTab = ({ isSelected, label }: SecondaryTabProps) => {
  const { classes } = usePaymentTabStyles();

  return (
    <SecondaryTab
      className={classes.paymentTabRoot}
      isSelected={isSelected}
      label={label}
    />
  );
};
