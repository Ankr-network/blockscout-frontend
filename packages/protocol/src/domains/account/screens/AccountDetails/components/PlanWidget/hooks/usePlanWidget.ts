import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { useMyBundlesStatus } from 'domains/account/hooks/useMyBundlesStatus';

export const usePlanWidget = () => {
  const { currentBundle } = useMyBundles({ skipFetching: true });
  const { requestsUsed } = useMyBundlesStatus({ skipFetching: true });

  const {
    amount,
    currentPeriodEnd: endDate,
    recurringInterval: period,
  } = currentBundle!;

  return { amount, endDate, period, requestsUsed };
};
