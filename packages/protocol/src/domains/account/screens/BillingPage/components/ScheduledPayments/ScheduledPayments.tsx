import { t } from '@ankr.com/common';

import { selectMyRecurringPaymentsWithoutPackage } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { Chip } from './components/Chip';
import { getSubscriptionLabel } from './utils/formatSubscriptionDate';
import { useScheduledPaymentsStyles } from './ScheduledPaymentsStyles';
import { NextBillingDate } from '../NextBillingDate';

export const ScheduledPayments = () => {
  const [subscription, ...otherSubscriptions] = useAppSelector(
    selectMyRecurringPaymentsWithoutPackage,
  );

  const { classes } = useScheduledPaymentsStyles();

  if (!subscription) {
    return (
      <div className={classes.root}>
        <NextBillingDate
          customText={t('account.account-details.no-payments-text')}
        />
      </div>
    );
  }

  const sameDaySubscriptions = otherSubscriptions.filter(
    item =>
      new Date(+item.currentPeriodEnd).getDate() ===
        new Date(+subscription.currentPeriodEnd).getDate() &&
      new Date(+item.currentPeriodEnd).getMonth() ===
        new Date(+subscription.currentPeriodEnd).getMonth(),
  );

  return (
    <div className={classes.root}>
      <NextBillingDate date={subscription?.currentPeriodEnd} />
      <div className={classes.subscriptions}>
        <Chip label={getSubscriptionLabel(subscription)} />
        {sameDaySubscriptions?.map(item => (
          <Chip key={item.id} label={getSubscriptionLabel(item)} />
        ))}
      </div>
    </div>
  );
};
