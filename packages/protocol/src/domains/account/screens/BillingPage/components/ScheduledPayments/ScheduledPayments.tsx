import { selectMyRecurringPayments } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { Chip } from './components/Chip';
import { MoreButton } from './components/MoreButton';
import { Title } from './components/Title';
import { getSubscriptionLabel } from './utils/formatSubscriptionDate';
import { useScheduledPaymentsStyles } from './ScheduledPaymentsStyles';

export const ScheduledPayments = () => {
  const subscriptions = useAppSelector(selectMyRecurringPayments);
  const [subscription, ...others] = subscriptions;

  const { classes } = useScheduledPaymentsStyles();

  return (
    <div className={classes.root}>
      <Title paymentsCount={subscriptions.length} />
      <div className={classes.subscriptions}>
        {subscription && <Chip label={getSubscriptionLabel(subscription)} />}
        {others.length > 0 && <MoreButton subscriptionsCount={others.length} />}
      </div>
    </div>
  );
};
