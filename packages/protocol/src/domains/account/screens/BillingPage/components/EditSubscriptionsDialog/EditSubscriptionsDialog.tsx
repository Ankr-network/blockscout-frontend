import { t } from '@ankr.com/common';
import Scrollbars from 'react-custom-scrollbars';

import { EditDialog } from '../EditDialog';
import { Subscription } from './components/Subscription';
import { useEditSubscriptionsDialogStyles } from './EditSubscriptionsDialogStyles';
import { useEditSubscriptionsDialog } from './hooks/useEditSubscriptionsDialog';

export interface EditSubscriptionsDialogProps {
  isOpened?: boolean;
  onClose: () => void;
  onOpenSuccessDialog: () => void;
}

const DIALOG_MARGIN = 32;
const DIALOG_PADDING = 40;
const DIALOG_HEADER = 70;
const DIALOG_OFFSET = DIALOG_MARGIN * 2 + DIALOG_PADDING * 2 + DIALOG_HEADER;

const authoHeightMax = `calc(100vh - ${DIALOG_OFFSET}px)`;

export const EditSubscriptionsDialog = ({
  isOpened,
  onClose,
  onOpenSuccessDialog,
}: EditSubscriptionsDialogProps) => {
  const { onCancelSubscription, recurringPayments } =
    useEditSubscriptionsDialog(onClose);

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
            {recurringPayments.map(payment => (
              <Subscription
                key={payment.id}
                onCancel={onCancelSubscription}
                subscription={payment}
                onOpenSuccessDialog={onOpenSuccessDialog}
              />
            ))}
          </div>
        </div>
      </Scrollbars>
    </EditDialog>
  );
};
