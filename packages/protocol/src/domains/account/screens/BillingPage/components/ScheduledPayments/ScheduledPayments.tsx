import { selectMyRecurringPayments } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { Chip } from './components/Chip';
import { getSubscriptionLabel } from './utils/formatSubscriptionDate';
import { useScheduledPaymentsStyles } from './ScheduledPaymentsStyles';
import { NextBillingDate } from '../NextBillingDate';

export const ScheduledPayments = () => {
  const [subscription] = useAppSelector(selectMyRecurringPayments);

  const { classes } = useScheduledPaymentsStyles();

  return (
    <div className={classes.root}>
      <NextBillingDate date={subscription?.currentPeriodEnd} />
      <div className={classes.subscriptions}>
        {subscription && <Chip label={getSubscriptionLabel(subscription)} />}
      </div>
    </div>
  );
};
