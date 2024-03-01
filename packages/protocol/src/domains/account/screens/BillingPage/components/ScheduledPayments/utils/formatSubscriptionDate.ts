import { ISubscriptionsItem } from 'multirpc-sdk';
import { format } from 'date-fns';
import { t } from '@ankr.com/common';

const intlKey = 'account.account-details.scheduled-payments.subscription';

export const getSubscriptionLabel = ({
  amount,
  currentPeriodEnd,
}: ISubscriptionsItem) => {
  const date = format(new Date(Number(currentPeriodEnd)), 'd MMM');

  return t(intlKey, { amount, date });
};
