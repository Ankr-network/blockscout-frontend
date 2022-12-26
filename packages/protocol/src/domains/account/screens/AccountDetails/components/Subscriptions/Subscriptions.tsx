import { useSubscriptions } from './hooks/useSubscriptions';
import { useSubscriptionsStyles } from './useSubscriptionsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Typography } from '@material-ui/core';
import { ReactComponent as RefreshIcon } from 'uiKit/Icons/refresh.svg';

export function Subscriptions() {
  const classes = useSubscriptionsStyles();

  const { subscriptions, cancelSubscription } = useSubscriptions();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        {t('account.account-details.subscriptions.top-up-subscription')}
      </Typography>
      {subscriptions?.items?.map(item => (
        <div className={classes.item}>
          <div className={classes.textContainer}>
            {item.type === 'recurring' && <RefreshIcon />}
            <Typography className={classes.text} variant="h4">
              {t('account.account-details.subscriptions.text', {
                amount: item.amount,
                recurringInterval: item.recurringInterval,
              })}
            </Typography>
          </div>
          <Typography
            className={classes.cancel}
            variant="subtitle1"
            onClick={() => cancelSubscription(item.subscriptionId)}
          >
            {t('account.account-details.subscriptions.cancel-subscription')}
          </Typography>
        </div>
      ))}
    </div>
  );
}
