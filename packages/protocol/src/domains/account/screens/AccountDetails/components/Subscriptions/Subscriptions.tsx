import { ISubscriptionsItem } from 'multirpc-sdk';
import { Refresh } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback, useEffect, useState } from 'react';

import { CancelSubscriptionDialog } from './CancelSubscriptionDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSubscriptions } from './hooks/useSubscriptions';
import { useSubscriptionsStyles } from './useSubscriptionsStyles';

export interface SubscriptionsProps {
  className?: string;
  setHasSubscriptions: (hasSubscriptions: boolean) => void;
}

export const Subscriptions = ({
  className,
  setHasSubscriptions,
}: SubscriptionsProps) => {
  const { classes, cx } = useSubscriptionsStyles();

  const { isOpened, onOpen, onClose } = useDialog();
  const [selectedItem, setSelectedItem] = useState<ISubscriptionsItem>();
  const { subscriptions, cancelSubscription } = useSubscriptions(selectedItem);
  const hasSubscriptions = subscriptions.length > 0;

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

  useEffect(() => {
    setHasSubscriptions(hasSubscriptions);
  }, [hasSubscriptions, setHasSubscriptions]);

  if (!hasSubscriptions) {
    return null;
  }

  return (
    <>
      <div className={cx(classes.root, className)}>
        <Typography className={classes.title} variant="h5">
          {t('account.account-details.subscriptions.top-up-subscriptions', {
            value: subscriptions.length,
          })}
        </Typography>
        {subscriptions.map(item => (
          <div key={item.id} className={classes.item}>
            <div className={classes.textContainer}>
              {item.type === 'recurring' && <Refresh />}
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
