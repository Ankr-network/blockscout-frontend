import { useCallback } from 'react';

import { selectMyRecurringPayments } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const useEditSubscriptionsDialog = (onClose: () => void) => {
  const recurringPayments = useAppSelector(selectMyRecurringPayments);
  const isLastSubscription = recurringPayments.length === 1;

  const onCancelSubscription = useCallback(() => {
    if (isLastSubscription) {
      onClose();
    }
  }, [onClose, isLastSubscription]);

  return {
    onCancelSubscription,
    recurringPayments,
  };
};
