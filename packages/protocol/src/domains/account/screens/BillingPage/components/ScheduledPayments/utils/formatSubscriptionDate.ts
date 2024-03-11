import { ISubscriptionsItem } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

const intlKey = 'account.account-details.scheduled-payments.subscription';

export const getSubscriptionLabel = ({ amount }: ISubscriptionsItem) => {
  return t(intlKey, { amount });
};
