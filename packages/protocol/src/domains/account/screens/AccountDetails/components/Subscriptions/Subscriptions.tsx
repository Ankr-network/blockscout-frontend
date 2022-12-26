import { useSubscriptions } from './hooks/useSubscriptions';
import { useSubscriptionsStyles } from './useSubscriptionsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Typography } from '@material-ui/core';
import { ReactComponent as RefreshIcon } from 'uiKit/Icons/refresh.svg';
import { CancelSubscriptionDialog } from './CancelSubscriptionDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useCallback, useState } from 'react';
import { ISubscriptionsItem } from 'multirpc-sdk';
import { uid } from 'react-uid';

export function Subscriptions() {
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

  const handleOk = useCallback(() => {
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
          {t('account.account-details.subscriptions.top-up-subscription')}
        </Typography>
        {subscriptions?.items?.map(item => (
          <div key={uid(item)} className={classes.item}>
            <div className={classes.textContainer}>
              {item.type === 'recurring' && <RefreshIcon />}
              <Typography className={classes.text} variant="h4">
                {t('account.account-details.subscriptions.text', {
                  amount: item.amount,
                  recurringInterval: item.recurringInterval,
                })}
              </Typography>
            </div>
            {/* <div className={classes.cancelContainer}> */}
            <Typography
              component="div"
              className={classes.cancel}
              variant="subtitle1"
              onClick={() => handleOpen(item)}
            >
              {t('account.account-details.subscriptions.cancel-subscription')}
            </Typography>
            {/* </div> */}
          </div>
        ))}
      </div>
      <CancelSubscriptionDialog
        open={isOpened}
        onOk={handleOk}
        onClose={onClose}
      />
    </>
  );
}
