import { useMySubscriptions } from 'domains/account/hooks/useMySubscriptions';

import { Chip } from './components/Chip';
import { MoreButton } from './components/MoreButton';
import { Title } from './components/Title';
import { getSubscriptionLabel } from './utils/formatSubscriptionDate';
import { useScheduledPaymentsStyles } from './ScheduledPaymentsStyles';

export const ScheduledPayments = () => {
  const { subscriptions } = useMySubscriptions({
    skipFetching: true,
  });

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
