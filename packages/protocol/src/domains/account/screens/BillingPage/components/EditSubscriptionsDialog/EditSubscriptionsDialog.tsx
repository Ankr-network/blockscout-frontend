import { t } from '@ankr.com/common';
import Scrollbars from 'react-custom-scrollbars';
import { ISubscriptionsItem } from 'multirpc-sdk';

import { EditDialog } from '../EditDialog';
import { Subscription } from './components/Subscription';
import { TCancelSubscriptionHandler } from './hooks/useEditSubscriptionsDialog';
import { useEditSubscriptionsDialogStyles } from './EditSubscriptionsDialogStyles';

interface IEditSubscriptionsDialogProps {
  isOpened?: boolean;
  onClose: () => void;
  onOpenSuccessDialog: () => void;
  onCancelSubscription: TCancelSubscriptionHandler;
  recurringPayments: ISubscriptionsItem[];
}

const DIALOG_MARGIN = 32;
const DIALOG_PADDING = 40;
const DIALOG_HEADER = 70;
const DIALOG_OFFSET = DIALOG_MARGIN * 2 + DIALOG_PADDING * 2 + DIALOG_HEADER;

const authoHeightMax = `calc(100vh - ${DIALOG_OFFSET}px)`;

export const EditSubscriptionsDialog = ({
  isOpened,
  onCancelSubscription,
  onClose,
  onOpenSuccessDialog,
  recurringPayments,
}: IEditSubscriptionsDialogProps) => {
  const { classes } = useEditSubscriptionsDialogStyles();

  return (
    <EditDialog
      isOpened={isOpened}
      onClose={onClose}
      title={t('account.account-details.edit-subscriptions-dialog.title')}
    >
      <Scrollbars autoHeight autoHeightMax={authoHeightMax}>
        <div className={classes.root}>
          <div className={classes.subscriptions}>
            {recurringPayments.map(subscription => (
              <Subscription
                key={subscription.id}
                onCancel={onCancelSubscription}
                subscription={subscription}
                onOpenSuccessDialog={onOpenSuccessDialog}
              />
            ))}
          </div>
        </div>
      </Scrollbars>
    </EditDialog>
  );
};
