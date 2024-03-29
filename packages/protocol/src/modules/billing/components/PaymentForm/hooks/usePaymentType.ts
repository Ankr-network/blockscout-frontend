import { EPaymentType } from 'modules/billing/types';

import { usePaymentTabs } from '../components/PaymentTabs';

export const usePaymentType = () => {
  const paymentTabsProps = usePaymentTabs();
  const paymentType =
    paymentTabsProps.selectedTab?.id ?? EPaymentType.Recurring;

  return { paymentTabsProps, paymentType };
};
