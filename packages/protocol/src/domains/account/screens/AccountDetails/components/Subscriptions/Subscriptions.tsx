import { useSubscriptions } from './hooks/useSubscriptions';
import { useSubscriptionsStyles } from './useSubscriptionsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Typography } from '@material-ui/core';
import { ReactComponent as RefreshIcon } from 'uiKit/Icons/refresh.svg';
import { CancelSubscriptionDialog } from './CancelSubscriptionDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useCallback, useState } from 'react';
import { ISubscriptionsItem } from 'multirpc-sdk';

export const Subscriptions = () => {
  const classes = useSubscriptionsStyles();

  const { isOpened, onOpen, onClose } = useDialog();
  const { subscriptions, cancelSubscription } = useSubscriptions();
  const [selectedItem, setSelectedItem] = useState<ISubscriptionsItem>();

  const handleOpen = useCallback(
    (item: ISubscriptionsItem) => {
      setSelectedItem(item);
      onOpen();
    },
    [setSelectedItem, onOpen],
  );

  const handleSuccess = useCallback(() => {
    if (!selectedItem) {
      return;
    }
    cancelSubscription(selectedItem.subscriptionId).then(onClose);
  }, [selectedItem, cancelSubscription, onClose]);

  if (!subscriptions || subscriptions.items.length === 0) {
    return null;
  }

  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.title} variant="h5">
          {t('account.account-details.subscriptions.top-up-subscriptions', {
            value: subscriptions?.items.length,
          })}
        </Typography>
        {subscriptions?.items?.map(item => (
          <div key={item.id} className={classes.item}>
            <div className={classes.textContainer}>
              {item.type === 'recurring' && <RefreshIcon />}
              <Typography className={classes.text} variant="h4">
                {t('account.account-details.subscriptions.text', {
                  amount: Number(item.amount),
                  recurringInterval: item.recurringInterval,
                })}
              </Typography>
            </div>
            <Typography
              component="div"
              className={classes.cancel}
              variant="subtitle1"
              onClick={() => handleOpen(item)}
            >
              {t('account.account-details.subscriptions.cancel-subscription')}
            </Typography>
          </div>
        ))}
      </div>
      <CancelSubscriptionDialog
        open={isOpened}
        onSuccess={handleSuccess}
        onClose={onClose}
      />
    </>
  );
};
