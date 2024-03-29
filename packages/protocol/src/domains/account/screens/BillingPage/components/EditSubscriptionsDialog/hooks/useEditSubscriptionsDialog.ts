import { useCallback, useState } from 'react';

import { selectMyRecurringPayments } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const useEditSubscriptionsDialog = (onClose: () => void) => {
  const recurringPayments = useAppSelector(selectMyRecurringPayments);
  const isLastSubscription = recurringPayments.length === 1;

  const [expirationDate, setExpirationDate] = useState<string | undefined>(
    undefined,
  );

  const [isDealCancelled, setIsDealCancelled] = useState<boolean>(false);

  const onCancelSubscription = useCallback(
    (expiresAt: string, isDeal: boolean) => {
      setExpirationDate(expiresAt);
      setIsDealCancelled(isDeal);

      if (isLastSubscription) {
        onClose();
      }
    },
    [onClose, isLastSubscription],
  );

  return {
    onCancelSubscription,
    recurringPayments,
    expirationDate,
    isDealCancelled,
  };
};
