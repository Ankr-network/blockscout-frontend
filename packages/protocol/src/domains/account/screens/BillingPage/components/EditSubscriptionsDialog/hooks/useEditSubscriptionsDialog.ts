import { useCallback, useState } from 'react';

import { selectMyRecurringPayments } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export interface ISubscriptionOptions {
  isDeal: boolean;
  isPackage: boolean;
}

export type TCancelSubscriptionHandler = (
  expiresAt: string,
  options: ISubscriptionOptions,
) => void;

export const useEditSubscriptionsDialog = (onClose: () => void) => {
  const recurringPayments = useAppSelector(selectMyRecurringPayments);
  const isLastSubscription = recurringPayments.length === 1;

  const [expirationDate, setExpirationDate] = useState<string | undefined>(
    undefined,
  );

  const [isDealCancelled, setIsDealCancelled] = useState(false);
  const [isPackageCancelled, setIsPackageCancelled] = useState(false);

  const onCancelSubscription = useCallback<TCancelSubscriptionHandler>(
    (expiresAt, { isDeal, isPackage }) => {
      setExpirationDate(expiresAt);
      setIsDealCancelled(isDeal);
      setIsPackageCancelled(isPackage);

      if (isLastSubscription) {
        onClose();
      }
    },
    [onClose, isLastSubscription],
  );

  return {
    expirationDate,
    isDealCancelled,
    isPackageCancelled,
    onCancelSubscription,
    recurringPayments,
  };
};
